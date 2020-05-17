import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Room, { schema } from './model'

const router = new Router()
const { name, description, cover, background, member, invited } = schema.tree

/**
 * @api {post} /room Create room
 * @apiName CreateRoom
 * @apiGroup Room
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Room's name.
 * @apiParam description Room's description.
 * @apiParam cover Room's cover.
 * @apiParam background Room's background.
 * @apiParam member Room's member.
 * @apiParam invited Room's invited.
 * @apiSuccess {Object} room Room's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Room not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ name, description, cover, background, member, invited }),
  create)

/**
 * @api {get} /room Retrieve rooms
 * @apiName RetrieveRooms
 * @apiGroup Room
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of rooms.
 * @apiSuccess {Object[]} rows List of rooms.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /room/:id Retrieve room
 * @apiName RetrieveRoom
 * @apiGroup Room
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} room Room's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Room not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /room/:id Update room
 * @apiName UpdateRoom
 * @apiGroup Room
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Room's name.
 * @apiParam description Room's description.
 * @apiParam cover Room's cover.
 * @apiParam background Room's background.
 * @apiParam member Room's member.
 * @apiParam invited Room's invited.
 * @apiSuccess {Object} room Room's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Room not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, description, cover, background, member, invited }),
  update)

/**
 * @api {delete} /room/:id Delete room
 * @apiName DeleteRoom
 * @apiGroup Room
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Room not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
