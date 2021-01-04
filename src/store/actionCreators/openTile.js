import TILE_OPEN from "../actions/Tile/tileOpen"

const toggleFlag = (tileId) => {
  return {
    type: TILE_OPEN,
    tileId,
  }
}

export default toggleFlag
