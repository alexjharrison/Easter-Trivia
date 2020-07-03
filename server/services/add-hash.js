const crypto = require('crypto')

const addHash = (req, res, next) => {
  req.hash = crypto
    .createHash('md5')
    .update(String(Math.random()))
    .digest('hex')

  next()
}

module.exports = addHash
