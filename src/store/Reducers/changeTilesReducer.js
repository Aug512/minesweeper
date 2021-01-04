import TILE_OPEN from "../actions/Tile/tileOpen";
import TILE_FLAG_TOGGLE from "../actions/Tile/tileToggleFlag";

const findTile = (arr, id, prop) => {
  return arr.map( tile => {
    if (tile.index === id) {
      tile[prop] = !tile[prop]
    }
  })
}

bombs.forEach(bomb => {
  tiles.find( tile => {
    if (bomb === tile.coords) {
      tile.isBomb = true;
    }
  }) 
});

const changeTilesReducer = (state = initialState, action) => {
  switch(action.type) {
    case TILE_OPEN:
      return {
        ...state,
        tiles : findTile(state.tiles, action.id, 'isOpen'),
      };
    case TILE_FLAG_TOGGLE:
      return {
        ...state,
        tiles: findTile(state.tiles, action.id, 'isFlag')
      };
    default: 
      return state;
  }
}

export default GameInitReducer;
