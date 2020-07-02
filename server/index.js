const { Server } = require('http')
const express = require('express')
const app = express()
const server = Server(app)
const io = require('socket.io')(server)

const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

const router = require('./routes/templates')
app.use('/api/templates', router)

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  server.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })

  require('./io')(io)
}
start()
