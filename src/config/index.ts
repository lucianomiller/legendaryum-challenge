import config from '../../config.json'
import { RoomsData } from '../models/room_config'
import RedisClient from 'ioredis'

const redisHost = process.env.REDIS_HOST ?? 'localhost'
const redisPort = process.env.REDIS_PORT ?? '6379'
const redisPassword = process.env.REDIS_PASSWORD ?? 'password'

const redis = new RedisClient({
  host: redisHost,
  port: Number(redisPort),
  password: redisPassword
})

const Data: RoomsData = config

export { Data, redis }
