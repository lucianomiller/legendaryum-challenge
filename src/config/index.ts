import config from '../../config.json'
import { RoomsData } from '../models/room_config'
import RedisClient from 'ioredis'

const redisHost = process.env.REDIS_HOST ?? 'localhost'
const redisPort = process.env.REDIS_PORT ?? '6379'

const redis = new RedisClient({
  host: redisHost,
  port: Number(redisPort)
})

const Data: RoomsData = config

export { Data, redis }
