import TILE_FLAG_TOGGLE from '../actions/Tile/tileToggleFlag'

const toggleFlag = (tileId) => {
  return {
    type: TILE_FLAG_TOGGLE,
    tileId,
  }
}

export default toggleFlag
