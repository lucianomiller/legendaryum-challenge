import { Coin } from '../models/coin'
import { getRoom } from './room_controller'
import { deleteCoin } from '../services/coin_service'

export const grabCoin = async (roomId: string, coinId: string): Promise<Coin | null> => {
  const room = getRoom(roomId)
  if (room === undefined) {
    throw new Error(`Room ${roomId} not found.`)
  }
  return await deleteCoin(roomId, coinId)
}
