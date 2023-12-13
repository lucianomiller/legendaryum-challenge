import { Server } from 'socket.io'
import { createRoom, getRoom } from '../controllers/room_controller'
import { grabCoin } from '../controllers/coin_controller'

export const configureSockets = (io: Server): void => {
  io.on('connection', (socket) => {
    socket.on('joinRoom', async (roomName: string): Promise<void> => {
      try {
        let room = await getRoom(roomName)
        if (room !== undefined) {
          await socket.join(roomName)
        } else {
          room = await createRoom(roomName)
          await socket.join(roomName)
        }
        socket.emit('roomJoined', room)
      } catch (error: any) {
        socket.emit('error', error.message)
      }
    })

    socket.on('grabCoin', async (data: { roomId: string, coinId: string }): Promise<void> => {
      try {
        const { roomId, coinId } = data
        const grabbedCoin = await grabCoin(roomId, coinId)
        if (grabbedCoin !== null) {
          io.to(roomId).emit('coinGrabbed', grabbedCoin)
        } else {
          socket.emit('error', 'Coin or room not found')
        }
      } catch (error) {
        socket.emit('error', error)
      }
    })
  })
}
