import SET_DIFFICULTY_EASY from '../Actions/SET_DIFFICULTY_EASY'
import SET_DIFFICULTY_MEDIUM from '../Actions/SET_DIFFICULTY_MEDIUM'
import SET_DIFFICULTY_HARD from '../Actions/SET_DIFFICULTY_HARD'
import SET_FLAG from '../Actions/SET_FLAG'
import REMOVE_FLAG from '../Actions/REMOVE_FLAG'

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
        isFlag: false,
      })
    }

    const bombsIndexes = new Set();

    do {
      bombsIndexes.add(Math.trunc(Math.random() * boardSize))
    } while (bombsIndexes.size < bombsCounter)

    bombsIndexes.forEach( index => {
      tiles[index].isBomb = true;
    })

    //editing starts

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

    //editing end

    return tiles;
  }

  switch (action.type) {
    case SET_DIFFICULTY_EASY:
      return {
        width: 8,
        height: 8,
        bombsCounter: 10,
        tiles: initTiles(this.width, this.height, this.bombsCounter),
        difficulty: 'easy',
        flagCounter: 0,
        isGameOver: false,
        detonatedId: null,
      }
    case SET_DIFFICULTY_MEDIUM:
      return {
        width: 16,
        height: 16,
        bombsCounter: 40,
        tiles: initTiles(this.width, this.height, this.bombsCounter),
        difficulty: 'medium',
        flagCounter: 0,
        isGameOver: false,
        detonatedId: null,
      }
    case SET_DIFFICULTY_HARD:
      return {
        width: 30,
        height: 16,
        bombsCounter: 99,
        tiles: initTiles(this.width, this.height, this.bombsCounter),
        difficulty: 'hard',
        flagCounter: 0,
        isGameOver: false,
        detonatedId: null,
      }
    case SET_FLAG:
      return {
        ...state,
        flagCounter: flagCounter + 1,
      }
    case REMOVE_FLAG:
      return {
        ...state,
        flagCounter: flagCounter - 1,
      }
    default:
      return state;
  }
}

export default settingsReducer
