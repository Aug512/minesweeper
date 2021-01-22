import REMOVE_FLAG from "../Actions/REMOVE_FLAG";
import SET_FLAG from "../Actions/SET_FLAG";

const tilesReducer = (state, action) => {
  switch (action.type) {
    case SET_FLAG:
      const newState = {...state}

      newState.tiles[action.id].isFlag = true;
      newState.flagCounter = state.flagCounter + 1;

      return newState;
    
    case REMOVE_FLAG:
      const newState = {...state}

      newState.tiles[action.id].isFlag = false;
      newState.flagCounter = state.flagCounter - 1;
      
      return newState;
  
    default:
      return state;
  }
}

export default tilesReducer
