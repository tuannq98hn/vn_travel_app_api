import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Room } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Room.create({ ...body, creator: user })
    .then((room) => room.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Room.count(query)
    .then(count => Room.find(query, select, cursor)
      .populate('creator')
      .then((rooms) => ({
        count,
        rows: rooms.map((room) => room.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Room.findById(params.id)
    .populate('creator')
    .then(notFound(res))
    .then((room) => room ? room.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Room.findById(params.id)
    .populate('creator')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'creator'))
    .then((room) => room ? Object.assign(room, body).save() : null)
    .then((room) => room ? room.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Room.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'creator'))
    .then((room) => room ? room.remove() : null)
    .then(success(res, 204))
    .catch(next)
