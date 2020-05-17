import http from 'http'
import { env, mongo, port, ip, apiRoot, socketPort } from './config'
import mongoose from './services/mongoose'
import express from './services/express'
import api from './api'

const app = express(apiRoot, api)
const server = http.createServer(app)

mongoose.connect(mongo.uri)
mongoose.Promise = Promise

setImmediate(() => {
  global.io = require('socket.io')(server)
  global.io.on('connection', require('./services/socket/index'))
  // io.on('connection', client => {
  //   console.log('Have new user')

  //   client.on('disconnect', () => {
  //     console.log('client disconnect...', client.id)
  //   })

  //   client.on('error', err => {
  //     console.log('received error from client:', client.id)
  //     console.log(err)
  //   })
  // })

  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
  })

  // server.listen(socketPort, ip, () => {
  //   global.io.on('connection', require('./services/socket/index'))
  //   console.log('Server socket io listen socketio on http://%s:%d, in %s mode', ip, socketPort, env)
  // })
})

export default app
