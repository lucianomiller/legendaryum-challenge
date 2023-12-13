interface Room {
  coins: number
  area: {
    xmin: number
    xmax: number
    ymin: number
    ymax: number
    zmin: number
    zmax: number
  }
}

export interface RoomsData {
  rooms: Record<string, Room>
}
