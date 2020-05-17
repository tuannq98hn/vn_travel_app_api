import express, { Router } from "express";
import path from "path";
import user from "./user";
import auth from "./auth";
import passwordReset from "./password-reset";
import post from "./post";
import upload from "./upload";
import comment from "./comment";
import news from "./news";
import room from "./room";
import message from "./message";

const router = new Router();

/**
 * @apiDefine master Master access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine admin Admin access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine user User access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine listParams
 * @apiParam {String} [q] Query to search.
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt] Order of returned items.
 * @apiParam {String[]} [fields] Fields to be returned.
 */
router.use(
  "/photo",
  express.static(path.join(__dirname, "../../data/upload/posts"))
);
router.use(
  "/avatar",
  express.static(path.join(__dirname, "../../data/upload/avatar"))
);
router.use("/users", user);
router.use("/auth", auth);
router.use("/password-resets", passwordReset);
router.use("/posts", post);
router.use("/upload", upload);
router.use("/comments", comment);
router.use("/news", news);
router.use("/room", room);
router.use("/message", message);
router.use("/message", message);

export default router;
