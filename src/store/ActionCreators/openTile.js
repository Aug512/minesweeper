import OPEN_TILE from '../Actions/OPEN_TILE'

const openTile = (id) => {
  return {
    type: OPEN_TILE,
    id: id,
  }
}

export default openTile
