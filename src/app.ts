import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { configureSockets } from './sockets/index'
import apiRoutes from './routes/api_routes'
import cors from 'cors'
const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

configureSockets(io)

app.use(cors()) // Add CORS middleware

app.use('/', apiRoutes)

const SOCKET_PORT = process.env.PORT ?? 3000
const API_PORT = process.env.API_PORT ?? 3001

server.listen(SOCKET_PORT, () => {
  console.log(`Socket server is running on port ${SOCKET_PORT}`)
})

app.listen(API_PORT, () => {
  console.log(`API Server is running on port ${API_PORT}`)
})
