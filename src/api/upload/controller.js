import { upload } from "../../services/upload";
import path from "path";
import mkdirp from "mkdirp";

const dir = path.join(__dirname, "../../../data/upload/posts");
const dirAvatar = path.join(__dirname, "../../../data/upload/avatar");

export const create = (req, res, next) => {
  req.folder = `${dirAvatar}`;
  upload(req, res, err => {
    if (err) {
      return res.status(400).json({ err: err });
    }
    let ret = [];
    if (req.files && req.files.length > 0) {
      ret = req.files.map(f => {
        return `${f.filename}`;
      });
    }
    res.status(200).json({ data: "oke" });
  });
};

export const createThumb = (req, res, next) => {
  mkdirp(`${dir}/${req.user.id}/thumb`, err => {
    if (err) {
      console.error(err);
      res.status(400).json({ data: err });
    } else {
      req.folder = `${dir}/${req.user.id}/thumb`;
      upload(req, res, err => {
        if (err) {
          return res.status(400).json({ err: err });
        }
        let ret = [];
        if (req.files && req.files.length > 0) {
          ret = req.files.map(f => {
            return `photo/${req.user.id}/thumb/${f.filename}`;
          });
        }
        res.status(200).json({ data: ret });
      });
    }
  });
};

export const createFull = (req, res, next) => {
  mkdirp(`${dir}/${req.user.id}/full`, err => {
    if (err) {
      console.error(err);
      res.status(400).json({ data: err });
    } else {
      req.folder = `${dir}/${req.user.id}/full`;
      upload(req, res, err => {
        if (err) {
          return res.status(400).json({});
        }
        let ret = [];
        if (req.files && req.files.length > 0) {
          ret = req.files.map(f => {
            return `photo/${req.user.id}/full/${f.filename}`;
          });
        }
        res.status(200).json({ data: ret });
      });
    }
  });
};

export const createAvatar = (req, res, next) => {
  mkdirp(`${dirAvatar}/${req.user.id}`, err => {
    if (err) {
      console.error(err);
      res.status(400).json({ data: err });
    } else {
      req.folder = `${dirAvatar}/${req.user.id}`;
      upload(req, res, err => {
        if (err) {
          return res.status(400).json({});
        }
        let ret = [];
        if (req.files && req.files.length > 0) {
          ret = req.files.map(f => {
            return `avatar/${req.user.id}/${f.filename}`;
          });
        }
        res.status(200).json({ data: ret });
      });
    }
  });
};

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  res.status(200).json([]);

export const show = ({ params }, res, next) => res.status(200).json({});

export const update = ({ body, params }, res, next) =>
  res.status(200).json(body);

export const destroy = ({ params }, res, next) => res.status(204).end();
