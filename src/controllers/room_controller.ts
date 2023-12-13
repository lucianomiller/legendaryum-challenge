import { Data, redis } from '../config'
import { Room } from '../models/room'
import { generateCoins } from '../services/coin_service'

export const createRoom = async (roomName: string): Promise<Room> => {
  const roomConfig = Data.rooms[roomName]
  if (roomConfig === undefined) {
    throw new Error(`Room ${roomName} not found.`)
  }
  const room: Room = {
    name: roomName,
    coins: await generateCoins(roomName)
  }
  await redis.set(`room:${roomName}`, JSON.stringify({ name: roomName }))
  return room
}

export const getRoom = async (roomName: string): Promise<Room | undefined> => {
  const roomStr = await redis.get(`room:${roomName}`)
  if (roomStr !== null) {
    const room: Room = JSON.parse(roomStr)
    const coins = await redis.get(`room:${roomName}:coins`)
    room.coins = coins === null ? [] : JSON.parse(coins)
    return room
  }
  return undefined
}
