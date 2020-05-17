import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy, likePost, commentPost, searchTitle } from './controller'
import { schema } from './model'
export Post, { schema } from './model'

const router = new Router()
const { client, description, full_url, tag, thumb_url, title } = schema.tree
const author = { type: [String], operator: '$in', paths: ['author'] }
const arrid = { type: [String], operator: '$in', paths: ['_id'] }
const comment = { type: [String] }

/**
 * @api {post} / Create post
 * @apiName CreatePost
 * @apiGroup Post
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam client Post's client.
 * @apiParam description Post's description.
 * @apiParam full_storage_uri Post's full_storage_uri.
 * @apiParam full_url Post's full_url.
 * @apiParam tag Post's tag.
 * @apiParam thumb_storage_uri Post's thumb_storage_uri.
 * @apiParam thumb_url Post's thumb_url.
 * @apiParam timestamp Post's timestamp.
 * @apiParam title Post's title.
 * @apiSuccess {Object} post Post's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Post not found.
 * @apiError 401 user access only.
 */
router.post('/', token({ required: true }), body({ client, description, full_url, tag, thumb_url, title }), create)

/**
 * @api {get} / Retrieve posts
 * @apiName RetrievePosts
 * @apiGroup Post
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} posts List of posts.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/', token({ required: true }), query({ author, arrid }), index)

/**
 * @api {get} / Retrieve posts
 * @apiName RetrievePosts
 * @apiGroup Post
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} posts List of posts.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/search', token({ required: true }), query(), searchTitle)

/**
 * @api {get} //:id Retrieve post
 * @apiName RetrievePost
 * @apiGroup Post
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} post Post's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Post not found.
 * @apiError 401 user access only.
 */
router.get('/:id', token({ required: true }), show)

/**
 * @api {put} //:id Update post
 * @apiName UpdatePost
 * @apiGroup Post
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam client Post's client.
 * @apiParam description Post's description.
 * @apiParam full_storage_uri Post's full_storage_uri.
 * @apiParam full_url Post's full_url.
 * @apiParam tag Post's tag.
 * @apiParam thumb_storage_uri Post's thumb_storage_uri.
 * @apiParam thumb_url Post's thumb_url.
 * @apiParam timestamp Post's timestamp.
 * @apiParam title Post's title.
 * @apiSuccess {Object} post Post's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Post not found.
 * @apiError 401 user access only.
 */
router.put(
  '/:id',
  token({ required: true }),
  body({ client, description, full_url, tag, thumb_url, title, comment }),
  update
)

/**
 * @api {put} //:id Like post
 * @apiName LikePost
 * @apiGroup Post
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam client Post's client.
 * @apiSuccess {Object} post Post's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Post not found.
 * @apiError 401 user access only.
 */
router.put('/:id/like', token({ required: true }), body(), likePost)

/**
 * @api {put} //:id Comment post
 * @apiName CommentPost
 * @apiGroup Post
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam client Post's client.
 * @apiSuccess {Object} post Post's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Post not found.
 * @apiError 401 user access only.
 */
router.put('/:id/comments', token({ required: true }), body({ comment }), commentPost)

/**
 * @api {delete} //:id Delete post
 * @apiName DeletePost
 * @apiGroup Post
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Post not found.
 * @apiError 401 user access only.
 */
router.delete('/:id', token({ required: true }), destroy)

export default router
