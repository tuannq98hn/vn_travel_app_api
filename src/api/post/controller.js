import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Post } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Post.create({ ...body, author: user })
    .then(post => post.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Post.count(query)
    .then(count =>
      Post.find(query, select, cursor)
        .populate('author')
        .populate('comment')
        .then(posts => ({
          rows: posts.map(post => post.view(true)),
          count
        }))
    )
    .then(success(res))
    .catch(next)
// Post.find(query, select, cursor)
//   .populate('author')
//   .populate('comment')
//   .then(posts => posts.map(post => post.view()))
//   .then(success(res))
//   .catch(next)

export const searchTitle = ({ querymen: { query, select, cursor } }, res, next) =>
  Post.find(query, select, cursor)
    .populate('author')
    .populate('comment')
    .then(posts => posts.map(post => post.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Post.findById(params.id)
    .populate('author')
    .populate('like')
    .populate('comment')
    .then(notFound(res))
    .then(post => (post ? post.view() : null))
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Post.findById(params.id)
    .populate('author')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'author'))
    .then(post => (post ? Object.assign(post, body).save() : null))
    .then(post => (post ? post.view(true) : null))
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Post.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'author'))
    .then(post => (post ? post.remove() : null))
    .then(success(res, 204))
    .catch(next)

export const likePost = ({ user, bodymen: { body }, params }, res, next) =>
  Post.findById(params.id)
    .populate('author')
    .then(notFound(res))
    .then(post => {
      var result = post.like.filter(f => f == user.id)
      if (result.length > 0) {
        var newLike = post.like.filter(f => f != user.id)
        post.set({ like: newLike }).save()
      } else {
        post.set({ like: [...post.like, user.id] }).save()
      }
      return post
    })
    .then(post => (post ? post.view(true) : null))
    .then(success(res))
    .catch(next)

export const commentPost = ({ user, bodymen: { body }, params }, res, next) =>
  Post.findById(params.id)
    .populate('author')
    .then(notFound(res))
    .then(post => (post ? post.set({ comment: [...post.comment, body.comment] }).save() : null))
    .then(post => (post ? post.view(true) : null))
    .then(success(res))
    .catch(next)
