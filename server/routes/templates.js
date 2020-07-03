const path = require('path')
const fs = require('fs-extra')
const router = require('express').Router()
const upload = require('../config/multer')
const addHash = require('../services/add-hash.js')
const processImage = require('../services/process-image')

const gamesFolder = path.join(__dirname, '../../assets/games/')
const imagesFolder = path.join(__dirname, '../../static/games/')

let gamesData = null

const resetGames = async () => {
  const files = await fs.readdir(gamesFolder)
  const games = files.map(file => fs.readJSON(gamesFolder + file))
  Promise.all(games).then(games => {
    gamesData = games
  })
}

resetGames()

router.get('/', (req, res) => {
  res.send(gamesData.map(({ questions, ...rest }) => ({ ...rest })))
})

router.get('/:gameHash', (req, res) => {
  const { gameHash } = req.params
  const game = gamesData.find(game => game.hash === gameHash)
  if (!game) res.sendStatus(404)
  res.json(game)
})

router.delete('/:gameHash', (req, res) => {
  const { gameHash } = req.params
  const game = gamesData.find(game => game.hash === gameHash)
  if (!game) {
    res.sendStatus(404)
    return
  }
  gamesData = gamesData.filter(game => game.hash !== gameHash)
  fs.remove(gamesFolder + gameHash + '.json')
  fs.remove(imagesFolder + gameHash)
  res.send(gamesData.map(({ questions, ...rest }) => ({ ...rest })))
})

router.use('/', addHash)
router.use('/', upload.any(), processImage)
router.post('/', (req, res) => {
  const { author, name, questions } = req.body
  const data = { hash: req.hash, author, name, questions }
  for (let i = 1; i <= 21; i++) {
    const qfile = req.files.find(file => file.fieldname === 'qpic' + i)
    const afile = req.files.find(file => file.fieldname === 'apic' + i)
    data.questions[i - 1].qpic = qfile?.newFilepath || null
    data.questions[i - 1].apic = afile?.newFilepath || null
    if (!data.questions[i - 1].answers) data.questions[i - 1].answers = []
  }
  fs.writeFile(
    gamesFolder + req.hash + '.json',
    JSON.stringify(data),
    'utf8',
    () => {
      res.json(data)
      resetGames()
    }
  )
})

module.exports = router
