import { Data, redis } from '../config'
import { Room } from '../models/room'
import { generateCoins } from '../services/coin_service'

const rooms: Room[] = []

export const createRoom = async (roomName: string): Promise<Room> => {
  const roomConfig = Data.rooms[roomName]
  if (roomConfig === undefined) {
    throw new Error(`Room ${roomName} not found.`)
  }
  const room: Room = {
    name: roomName,
    coins: await generateCoins(roomName)
  }
  rooms.push(room)
  return room
}

export const getRoom = async (roomName: string): Promise<Room | undefined> => {
  const room = rooms.find((r) => r.name === roomName)
  if (room !== undefined) {
    const coins = await redis.get(`room:${roomName}:coins`)
    room.coins = coins === null ? [] : JSON.parse(coins)
  }
  return room
}
