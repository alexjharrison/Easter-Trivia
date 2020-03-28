const { Server } = require('http')
const app = require('express')()
const server = Server(app)
const io = require('socket.io')(server)

const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

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

  io.on('connection', socket => {
    socket.emit('news', { news: ['newsss'] })
    console.log('server connected')
  })
}
start()
