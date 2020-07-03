const path = require('path')
const fs = require('fs-extra')
const router = require('express').Router()
const upload = require('../config/multer')
const addHash = require('../services/add-hash.js')
const processImage = require('../services/process-image')

const gamesFolder = path.join(__dirname, '../../assets/games/')

router.get('/', (req, res) => {
  fs.readdir(gamesFolder, (err, files) => {
    if (err) res.send(err)
    res.send(files.map(name => name.split('.json')[0]))
  })
})

router.get('/:gameHash', async (req, res) => {
  try {
    const dataPath = path.join(
      __dirname,
      '../../assets/games/' + req.params.gameHash + '.json'
    )
    const game = await fs.readJSON(dataPath)
    res.json(game)
  } catch (err) {
    res.sendStatus(404)
  }
})

router.use('/', addHash)
router.use('/', upload.any(), processImage)
router.post('/', (req, res) => {
  const data = { hash: req.hash, questions: [] }
  for (let i = 1; i <= 21; i++) {
    const qfile = req.files.find(file => file.fieldname === 'qpic' + i)
    const afile = req.files.find(file => file.fieldname === 'apic' + i)
    data.questions.push({
      ...req.body['q' + i],
      qpic: qfile?.newFilepath,
      apic: afile?.newFilepath
    })
    console.log(qfile, afile)
  }
  fs.writeFile(
    gamesFolder + req.hash + '.json',
    JSON.stringify(data),
    'utf8',
    () => res.json(data)
  )
})

module.exports = router
