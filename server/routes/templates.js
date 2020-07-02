const crypto = require('crypto')
const path = require('path')
const fs = require('fs-extra')
const router = require('express').Router()
const multer = require('multer')

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      req.hash = generateHash()
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
// const jimp = require('jimp')

const gamesFolder = path.join(__dirname, '../../assets/games')

router.get('/', (req, res) => {
  fs.readdir(gamesFolder, (err, files) => {
    if (err) res.send(err)
    res.send(files.map(name => Number(name.split('.json')[0])))
  })
})

const fields = new Array(21).fill(null).map((val, i) => ({
  name: 'q' + (i + 1),
  maxCount: 1
}))

router.post('/', upload.fields(fields), (req, res) => {
  //   const { title } = req.body
  console.log(req.files.q1)
  res.send('yo')
})

function generateHash() {
  return crypto
    .createHash('md5')
    .update(String(Math.random()))
    .digest('hex')
}

module.exports = router
