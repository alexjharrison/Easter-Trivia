const jimp = require('jimp')
const fs = require('fs-extra')

const processImage = (req, res, next) => {
  req.files.map(async file => {
    const newFilepath = file.destination + '/' + file.fieldname + '.png'
    file.newFilepath = '/games/' + req.hash + '/' + file.fieldname + '.png'
    const image = await jimp.read(file.path)
    await image.scaleToFit(500, 500).writeAsync(newFilepath)
    fs.remove(file.path)
  })

  next()
}

module.exports = processImage
