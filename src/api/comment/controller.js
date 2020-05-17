import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Comment } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Comment.create({ ...body, author: user })
    .then(comment => comment.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Comment.find(query, select, cursor)
    .populate('author')
    .then(comments => comments.map(comment => comment.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Comment.findById(params.id)
    .populate('author')
    .then(notFound(res))
    .then(comment => (comment ? comment.view() : null))
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Comment.findById(params.id)
    .populate('author')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'author'))
    .then(comment => (comment ? comment.set({ text: body.text }).save() : null))
    .then(comment => (comment ? comment.view(true) : null))
    .then(success(res))
    .catch(next)

export const updateSub = ({ user, bodymen: { body }, params }, res, next) =>
  Comment.findById(params.id)
    .populate('author')
    .then(notFound(res))
    .then(comment => (comment ? comment.set({ subComment: [...comment.subComment, body.subComment] }).save() : null))
    .then(comment => (comment ? comment.view(true) : null))
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Comment.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'author'))
    .then(comment => (comment ? comment.remove() : null))
    .then(success(res, 204))
    .catch(next)
