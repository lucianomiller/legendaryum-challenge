import express from 'express'
import { Data } from '../config'
import { getRoom } from '../controllers/room_controller'
import { getTtl } from '../services/coin_service'

const apiRoutes = express.Router()

apiRoutes.get('/rooms', (_req, res) => {
  const roomsArray = Object.entries(Data.rooms).map(([key, value]) => ({ ...value, id: key }))
  res.send(roomsArray)
})

/* eslint-disable */
apiRoutes.get('/rooms/:id', async (req, res) => {
  const { id } = req.params

  try {
    const rooms = await getRoom(id)

    if (rooms === undefined) {
      res.status(404).send(`Room ${id} is not open.`)
    } else {
      const timeLeft = await getTtl(id)
      const date = new Date(timeLeft * 1000)
      const minutes = date.getUTCMinutes()
      const sec = date.getUTCSeconds()
      const timeString = `${minutes.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
      res.send({ room: rooms.name, coins_left: rooms.coins.length, minutes_left: timeString })
    }
  } catch (error) {
    console.error('Error:', error)
    res.status(500).send('Internal Server Error')
  }
})
/* eslint-enable */

export default apiRoutes
