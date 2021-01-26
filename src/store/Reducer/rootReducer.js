import SET_DIFFICULTY_EASY from '../Actions/SET_DIFFICULTY_EASY'
import SET_DIFFICULTY_MEDIUM from '../Actions/SET_DIFFICULTY_MEDIUM'
import SET_DIFFICULTY_HARD from '../Actions/SET_DIFFICULTY_HARD'
import SET_QUESTION from '../Actions/SET_QUESTION'
import SET_FLAG from '../Actions/SET_FLAG'
import SET_NOTHING from '../Actions/SET_NOTHING'
import START_NEW_GAME from '../Actions/START_NEW_GAME'
import OPEN_TILE from '../Actions/OPEN_TILE'
import WIN_GAME from '../Actions/WIN_GAME'
import LOSE_GAME from '../Actions/LOSE_GAME'

const settingsReducer = (state, action) => {

  const initTiles = (width, height, bombsCounter) => {

    const boardSize = width * height;
    const tiles = []

    for (let i = 0; i < boardSize; i++) {
      tiles.push({
        index: i,
        isBomb: false,
        number: 0,
        isOpen: false,
        overlay: 'none',
      })
    }

    const bombsIndexes = new Set();

    do {
      bombsIndexes.add(Math.trunc(Math.random() * boardSize))
    } while (bombsIndexes.size < bombsCounter)

    bombsIndexes.forEach( index => {
      tiles[index].isBomb = true;
    })

    const numbers = [];

    let x = 0;
    let y = 0;

    tiles.forEach((tile) => {
      tile.coords = `${x},${y}`;
      
      if (tile.isBomb) {

        if (x > 0 && y > 0) numbers.push(`${x-1},${y-1}`);
        if (y > 0) numbers.push(`${x},${y-1}`);
        if (y > 0 && x < width - 1) numbers.push(`${x+1},${y-1}`);

        if (x > 0) numbers.push(`${x-1},${y}`);
        if (x < width - 1) numbers.push(`${x+1},${y}`);

        if (x > 0 && y < height - 1) numbers.push(`${x-1},${y+1}`);
        if (y < height - 1) numbers.push(`${x},${y+1}`);
        if (x < width - 1 && y < height - 1) numbers.push(`${x+1},${y+1}`);

      }
      
      x++;
      if (x >= width) {
        x = 0;
        y++;
      }
    });
    
    numbers.forEach(num => {
      tiles.find( tile => {
        if (tile.coords === num) {
          tile.number++;
        }
      })
    });

    return tiles;
  }

  const openSelectedTile = (id) => {
    const newTiles = [...state.tiles]
    newTiles[id] = {...state.tiles[id]}
    newTiles[id].isOpen = true;
    return newTiles
  }

  const toggleFlagState = (id) => {
    const newTiles = [...state.tiles]
    newTiles[id] = {...state.tiles[id]}
    if (newTiles[id].overlay === 'none') {
      newTiles[id].overlay = 'flag'
    } else if (newTiles[id].overlay === 'flag') {
      newTiles[id].overlay = 'question'
    } else {
      newTiles[id].overlay = 'none'
    }
    
    return newTiles
  }

  const getFlagsCounter = (tileState) => {
    switch (tileState) {
      case 'flag':
        return 1
      case 'question':
        return -1
      default:
        break;
    }
  }

  const showBombs = () => {
    const newTiles = state.tiles.map( tile => {
      if (!tile.isBomb) {
        return tile
      } else return {
        ...tile,
        overlay: 'none',
        isOpen: true,
      }
    })
    return newTiles
  }

  switch (action.type) {
    case SET_DIFFICULTY_EASY:
      return {
        ...state,
        width: 8,
        height: 8,
        bombsCounter: 10,
        tiles: initTiles(8, 8, 10),
        difficulty: 'easy',
        flagCounter: 0,
        isGameOver: false,
        detonatedId: null,
      }

    case SET_DIFFICULTY_MEDIUM:
      return {
        ...state,
        width: 16,
        height: 16,
        bombsCounter: 40,
        tiles: initTiles(16, 16, 40),
        difficulty: 'medium',
        flagCounter: 0,
        isGameOver: false,
        detonatedId: null,
      }

    case SET_DIFFICULTY_HARD:
      return {
        ...state,
        width: 30,
        height: 16,
        bombsCounter: 99,
        tiles: initTiles(30, 16, 99),
        difficulty: 'hard',
        flagCounter: 0,
        isGameOver: false,
        detonatedId: null,
      }

    case START_NEW_GAME:
      return {
        ...state,
        tiles: initTiles(state.width, state.height, state.bombsCounter),
        flagCounter: 0,
        isGameOver: false,
        detonatedId: null,
      }

    case SET_FLAG:
      return {
        ...state,
        tiles: toggleFlagState(action.id),
        flagCounter: state.flagCounter + 1,
      };
    
    case SET_QUESTION:
      return {
        ...state,
        tiles: toggleFlagState(action.id),
        flagCounter: state.flagCounter - 1,
      };

    case SET_NOTHING:
      return {
        ...state,
        tiles: toggleFlagState(action.id)
      };

    // case TOGGLE_FLAG:
    //   return {
    //     ...state,
    //     tiles: toggleFlagState(action.id),
    //     flagCounter: state.flagCounter + getFlagsCounter(this.tiles[action.id].overlay)
    //   }

    case OPEN_TILE:
      return {
        ...state,
        tiles: openSelectedTile(action.id),
      }

    case LOSE_GAME:
      return {
        ...state,
        tiles: showBombs(),
        isGameOver: true,
        message: 'Поражение!',
        detonatedId: action.detonatedId,
      }

    case WIN_GAME:
      return {
        ...state,
        isGameOver: true,
        message: 'Победа!',
      }

    default:
      return state;
  }
}

export default settingsReducer