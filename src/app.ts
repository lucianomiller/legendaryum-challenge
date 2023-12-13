import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { configureSockets } from './sockets/index'
import apiRoutes from './routes/api_routes'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

configureSockets(io)

app.use('/', apiRoutes)

const PORT_SOCKET = 3000
const PORT_API = 3001

server.listen(PORT_SOCKET, () => {
  console.log(`Server is running on port ${PORT_SOCKET}`)
})

app.listen(PORT_API, () => {
  console.log(`API Server is running on port ${PORT_API}`)
})
