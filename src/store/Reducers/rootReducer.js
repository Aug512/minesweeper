import SET_DIFFICULTY_EASY from '../Actions/SET_DIFFICULTY_EASY'
import SET_DIFFICULTY_MEDIUM from '../Actions/SET_DIFFICULTY_MEDIUM'
import SET_DIFFICULTY_HARD from '../Actions/SET_DIFFICULTY_HARD'

const rootReducer = (state, action) => {
  switch (action.type) {
    case 'action1':
      //do something
      break;
    case 'action2':
      //do something else
      break;
    default:
      return state;
  }
}

const settingsReducer = () => {
  switch (action.type) {
    case SET_DIFFICULTY_EASY:
      return {
        bombs: [],
        numbers: [],
        tiles: [],
        width: 8,
        height: 8,
        difficulty: 'easy',
        bombsCounter: 10,
        flagCounter: 0,
        isGameOver: false,
        detonatedId: null,
      }
    case SET_DIFFICULTY_MEDIUM:
      return {
        bombs: [],
        numbers: [],
        tiles: [],
        width: 16,
        height: 16,
        difficulty: 'medium',
        bombsCounter: 40,
        flagCounter: 0,
        isGameOver: false,
        detonatedId: null,
      }
    case SET_DIFFICULTY_HARD:
      return {
        bombs: [],
        numbers: [],
        tiles: [],
        width: 30,
        height: 16,
        difficulty: 'hard',
        bombsCounter: 99,
        flagCounter: 0,
        isGameOver: false,
        detonatedId: null,
      }
    default:
      return state;
  }
}

export default rootReducer
