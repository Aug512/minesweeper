import GAME_INIT_EASY from "../actions/Game/initGameEasy";
import GAME_INIT_MEDIUM from "../actions/Game/initGameMedium";
import GAME_INIT_HARD from "../actions/Game/initGameHard";
import initialState from "../initialState";

const generateTilesArr = (w, h) => {
  const arr = [];
  for (let i = 0; i < w * h; i++) {
    arr.tiles.push({
      index: i,
      isBomb: false,
      isFlag: false,
      isOpen: false,
      number: 0,
    })
  }
  return arr;
}

const GameInitReducer = (state = initialState, action) => {
  switch(action.type) {
    case GAME_INIT_EASY:
      return {
        gameOver: false,
        difficulty: 'easy',
        tiles: generateTilesArr(this.width, this.height),
        width: 9,
        height: 9,
        mines: 10,
        message: '',
      };
    case GAME_INIT_MEDIUM:
      return {
        gameOver: false,
        difficulty: 'medium',
        tiles: generateTilesArr(this.width, this.height),
        width: 16,
        height: 16,
        mines: 40,
        message: '',
      };
    case GAME_INIT_HARD:
      return {
        gameOver: false,
        difficulty: 'hard',
        tiles: generateTilesArr(this.width, this.height),
        width: 80,
        height: 60,
        mines: 99,
        message: '',
      };
    default: 
      return state;
  }
}

export default GameInitReducer;
