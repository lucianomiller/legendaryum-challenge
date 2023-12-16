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
        socket.emit('roomData', room)
        const usersInRoom: undefined | number = io.sockets.adapter.rooms.get(roomName)?.size
        io.to(roomName).emit('playersChange', { id: socket.id, usersInRoom, joined: true })
      } catch (error: any) {
        socket.emit('error', error.message)
      }
    })

    socket.on('leaveRoom', async (): Promise<void> => {
      let roomName: string | undefined
      const allRooms = io.sockets.adapter.rooms
      for (const [roomN, room] of allRooms.entries()) {
        if (room.has(socket.id)) {
          roomName = roomN
          break
        }
      }
      if (roomName !== undefined) {
        await socket.leave(roomName)
        const usersInRoom: undefined | number = io.sockets.adapter.rooms.get(roomName)?.size
        io.to(roomName).emit('playersChange', { id: socket.id, usersInRoom, joined: false })
      }
    })

    socket.on('grabCoin', async (data: { roomId: string, coinId: string }): Promise<void> => {
      try {
        const { roomId, coinId } = data
        const grabbedCoin = await grabCoin(roomId, coinId)
        if (grabbedCoin !== null) {
          const room = await getRoom(roomId)
          io.to(roomId).emit('roomData', room)
          socket.to(roomId).emit('coinGrabbed', grabbedCoin)
        } else {
          socket.emit('error', 'Coin or room not found')
        }
      } catch (error) {
        socket.emit('error', error)
      }
    })

    socket.on('timeout', async (roomId: string): Promise<void> => {
      const room = await getRoom(roomId)
      io.to(roomId).emit('roomData', room)
    })
  })
}
