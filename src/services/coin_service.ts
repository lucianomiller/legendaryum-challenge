import { Data, redis } from '../config'
import { Coin } from '../models/coin'

export const generateCoins = async (roomName: string): Promise<Coin[]> => {
  const coins: Coin[] = []
  const coinsAmount = Data.rooms[roomName]?.coins
  const area = Data.rooms[roomName]?.area

  if (coinsAmount === undefined || area === undefined) {
    throw new Error('Invalid room name')
  }

  for (let i = 0; i < coinsAmount; i++) {
    const coin: Coin = {
      id: `coin_${i}`,
      room: roomName,
      position: {
        x: Number((Math.random() * (area.xmax - area.xmin) + area.xmin).toFixed(2)),
        y: Number((Math.random() * (area.ymax - area.ymin) + area.ymin).toFixed(2)),
        z: Number((Math.random() * (area.zmax - area.zmin) + area.zmin).toFixed(2))
      }
    }
    coins.push(coin)
  }

  try {
    await redis.setex(`room:${roomName}:coins`, 60 * 60, JSON.stringify(coins))
    setTimeout(() => {
      generateCoins(roomName).catch((err) => console.error(err))
    }, 60 * 60 * 1000)
  } catch (err) {
    console.error(err)
    throw new Error('Error storing coins in Redis')
  }
  return coins
}

export const deleteCoin = async (roomName: string, coinId: string): Promise<Coin | null> => {
  const coins = await redis.get(`room:${roomName}:coins`)
  const coinsArray = coins === null ? [] : JSON.parse(coins)
  const indexToRemove = coinsArray.findIndex((coin: Coin) => coin.id === coinId)
  let coin: Coin | null = null
  if (indexToRemove !== -1) {
    const ttl = await redis.ttl(`room:${roomName}:coins`)
    coin = coinsArray.splice(indexToRemove, 1)[0]
    await redis.set(`room:${roomName}:coins`, JSON.stringify(coinsArray))
    await redis.expire(`room:${roomName}:coins`, ttl)
  }
  return coin ?? null
}

export const getTtl = async (roomName: string): Promise<number> => {
  return await redis.ttl(`room:${roomName}:coins`)
}
