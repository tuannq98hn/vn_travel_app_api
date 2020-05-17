import multer from 'multer'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, req.folder)
  },
  filename: (req, file, cb) => {
    cb(null, ((Date.now() / 1000) | 0) + '_' + file.originalname)
  }
})
export const upload = multer({
  storage: storage
}).array('file[]')
