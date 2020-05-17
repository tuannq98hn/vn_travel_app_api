import { success, notFound } from '../../services/response/'
import { User } from '.'
import { sign } from '../../services/jwt'

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  User.count(query)
    .then(count =>
      User.find(query, select, cursor).then(users => ({
        rows: users.map(user => user.view(true)),
        count
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  User.findById(params.id)
    .then(notFound(res))
    .then(user => (user ? user.view(true) : null))
    .then(success(res))
    .catch(next)

export const showMe = ({ user }, res) => res.json(user.view(true))

export const create = ({ bodymen: { body } }, res, next) =>
  User.create(body)
    .then(user => {
      sign(user.id)
        .then(token => ({ token, user: user.view(true) }))
        .then(success(res, 201))
    })
    .catch(err => {
      /* istanbul ignore else */
      if (err.name === 'MongoError' && err.code === 11000) {
        res.status(409).json({
          valid: false,
          param: 'email',
          message: 'email already registered'
        })
      } else {
        next(err)
      }
    })

export const update = ({ bodymen: { body }, params, user }, res, next) =>
  User.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then(result => {
      if (!result) return null
      const isAdmin = user.role === 'admin'
      const isSelfUpdate = user.id === result.id
      if (!isSelfUpdate && !isAdmin) {
        res.status(401).json({
          valid: false,
          message: "You can't change other user's data"
        })
        return null
      }
      return result
    })
    .then(user => {
      user.set({ name: body.name, picture: body.picture, aboutMe: body.aboutMe }).save()
      return user
    })
    .then(user => (user ? user.view(true) : null))
    .then(success(res))
    .catch(next)

export const updatePassword = ({ bodymen: { body }, params, user }, res, next) =>
  User.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then(result => {
      if (!result) return null
      const isSelfUpdate = user.id === result.id
      if (!isSelfUpdate) {
        res.status(401).json({
          valid: false,
          param: 'password',
          message: "You can't change other user's password"
        })
        return null
      }
      return result
    })
    .then(user => (user ? user.set({ password: body.password }).save() : null))
    .then(user => (user ? user.view(true) : null))
    .then(success(res))
    .catch(next)

export const updateFollowing = ({ bodymen: { body }, params, user }, res, next) => {
  User.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then(result => {
      if (!result) return null
      const isSelfUpdate = user.id === result.id
      if (!isSelfUpdate) {
        res.status(401).json({
          valid: false,
          param: 'following',
          message: "You can't change other user's following"
        })
        return null
      }
      return result
    })
    .then(user => {
      var result = user.following.filter(f => f == body.following)
      if (result.length > 0) {
        var newFollow = user.following.filter(f => f != body.following)
        user.set({ following: newFollow }).save()
      } else {
        user.set({ following: [...user.following, body.following] }).save()
      }
      return user
    })
    .then(user => (user ? user.view(true) : null))
    .then(success(res))
    .catch(next)
}

export const updateFollower = ({ bodymen: { body }, params, user }, res, next) => {
  User.findById(params.id)
    .then(notFound(res))
    .then(user => {
      var result = user.follower.filter(f => f == body.follower)
      if (result.length > 0) {
        var newFollow = user.follower.filter(f => f != body.follower)
        user.set({ follower: newFollow }).save()
      } else {
        console.log('---------- follower: ' + body.follower)
        user.set({ follower: [...user.follower, body.follower] }).save()
      }
      return user
    })
    .then(user => (user ? user.view(true) : null))
    .then(success(res))
    .catch(next)
}

export const updateSaved = ({ bodymen: { body }, params, user }, res, next) => {
  User.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then(result => {
      if (!result) return null
      const isSelfUpdate = user.id === result.id
      if (!isSelfUpdate) {
        res.status(401).json({
          valid: false,
          param: 'saved',
          message: "You can't change other user's saved"
        })
        return null
      }
      return result
    })
    .then(user => {
      var result = user.saved.filter(f => f == body.saved)
      if (result.length > 0) {
        var newSaved = user.saved.filter(f => f != body.saved)
        user.set({ saved: newSaved }).save()
      } else {
        user.set({ saved: [...user.saved, body.saved] }).save()
      }
      return user
    })
    .then(user => (user ? user.view(true) : null))
    .then(success(res))
    .catch(next)
}

export const destroy = ({ params }, res, next) =>
  User.findById(params.id)
    .then(notFound(res))
    .then(user => (user ? user.remove() : null))
    .then(success(res, 204))
    .catch(next)
