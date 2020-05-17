import { Router } from "express";
import { middleware as query } from "querymen";
import { token } from "../../services/passport";
import {
  createThumb,
  createFull,
  createAvatar,
  index,
  show,
  update,
  destroy,
  create
} from "./controller";

const router = new Router();

router.post("/", create);

/**
 * @api {post} /upload Create upload
 * @apiName CreateUpload
 * @apiGroup Upload
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} upload Upload's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Upload not found.
 * @apiError 401 user access only.
 */
router.post("/thumb", token({ required: true }), createThumb);

/**
 * @api {post} /upload Create upload
 * @apiName CreateUpload
 * @apiGroup Upload
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} upload Upload's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Upload not found.
 * @apiError 401 user access only.
 */
router.post("/full", token({ required: true }), createFull);

/**
 * @api {post} /upload Create upload
 * @apiName CreateUpload
 * @apiGroup Upload
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} upload Upload's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Upload not found.
 * @apiError 401 user access only.
 */
router.post("/avatar", token({ required: true }), createAvatar);

/**
 * @api {get} /upload Retrieve uploads
 * @apiName RetrieveUploads
 * @apiGroup Upload
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} uploads List of uploads.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get("/", token({ required: true }), query(), index);

/**
 * @api {get} /upload/:id Retrieve upload
 * @apiName RetrieveUpload
 * @apiGroup Upload
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} upload Upload's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Upload not found.
 * @apiError 401 user access only.
 */
router.get("/:id", token({ required: true }), show);

/**
 * @api {put} /upload/:id Update upload
 * @apiName UpdateUpload
 * @apiGroup Upload
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} upload Upload's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Upload not found.
 * @apiError 401 user access only.
 */
router.put("/:id", token({ required: true }), update);

/**
 * @api {delete} /upload/:id Delete upload
 * @apiName DeleteUpload
 * @apiGroup Upload
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Upload not found.
 * @apiError 401 user access only.
 */
router.delete("/:id", token({ required: true }), destroy);

export default router;
