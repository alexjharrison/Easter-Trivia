const path = require('path')
const multer = require('multer')
const fs = require('fs-extra')

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      const folderName = path.resolve(
        __dirname,
        '../../static/games/' + req.hash
      )
      fs.ensureDir(folderName, () => cb(null, folderName))
    },
    filename(req, file, cb) {
      cb(null, file.originalname)
    }
  })
})

module.exports = upload
