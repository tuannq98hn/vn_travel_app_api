import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy, updateSub } from './controller'
import { schema } from './model'
export Comment, { schema } from './model'

const router = new Router()
const { subComment, text, refer } = schema.tree
const referent = { type: [String], operator: '$in', paths: ['refer'] }

/**
 * @api {post} /comments Create comment
 * @apiName CreateComment
 * @apiGroup Comment
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam subComment Comment's subComment.
 * @apiParam text Comment's text.
 * @apiParam post Comment's post.
 * @apiSuccess {Object} comment Comment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Comment not found.
 * @apiError 401 user access only.
 */
router.post('/', token({ required: true }), body({ text, refer }), create)

/**
 * @api {get} /comments Retrieve comments
 * @apiName RetrieveComments
 * @apiGroup Comment
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} comments List of comments.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/', token({ required: true }), query({ referent }), index)

/**
 * @api {get} /comments/:id Retrieve comment
 * @apiName RetrieveComment
 * @apiGroup Comment
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} comment Comment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Comment not found.
 * @apiError 401 user access only.
 */
router.get('/:id', token({ required: true }), show)

/**
 * @api {put} /comments/:id Update comment
 * @apiName UpdateComment
 * @apiGroup Comment
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam subComment Comment's subComment.
 * @apiParam text Comment's text.
 * @apiParam post Comment's post.
 * @apiSuccess {Object} comment Comment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Comment not found.
 * @apiError 401 user access only.
 */
router.put('/:id', token({ required: true }), body({ text }), update)

/**
 * @api {put} /comments/:id/sub Update comment
 * @apiName UpdateComment
 * @apiGroup Comment
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam text Comment's text.
 * @apiParam post Comment's post.
 * @apiSuccess {Object} comment Comment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Comment not found.
 * @apiError 401 user access only.
 */
router.put('/:id/sub', token({ required: true }), body({ subComment }), updateSub)

/**
 * @api {delete} /comments/:id Delete comment
 * @apiName DeleteComment
 * @apiGroup Comment
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Comment not found.
 * @apiError 401 user access only.
 */
router.delete('/:id', token({ required: true }), destroy)

export default router
