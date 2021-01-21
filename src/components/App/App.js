import React, { useEffect, useState} from 'react'
import Settings from '../Settings/Settings'
import Grid from '../Grid/Grid'

function App() {

  const initailState = {
    bombs: [],
    numbers: [],
    tiles: [],
    width: 16,
    height: 16,
    difficulty: 'medium',
    bombsCounter: 40,
    flagCounter: 0,
    isGameOver: false,
  }

  const [state, setState] = useState(initailState);

  const selectDifficulty = difficulty => {

    if (difficulty === 'easy') {
      return {
        ...state,
        bombs: [],
        numbers: [],
        tiles: [],
        width: 8,
        height: 8,
        bombsCounter: 10,
        flagCounter: 0,
        message: '',
        isGameOver: false,
        difficulty,
        detonatedId: null,
      }
    }
    if (difficulty === 'medium') {
      return {
        ...state,
        bombs: [],
        numbers: [],
        tiles: [],
        width: 16,
        height: 16,
        bombsCounter: 40,
        flagCounter: 0,
        message: '',
        isGameOver: false,
        difficulty,
        detonatedId: null,
      }
    }
    if (difficulty === 'hard') {
      return {
        ...state,
        bombs: [],
        numbers: [],
        tiles: [],
        width: 30,
        height: 16,
        bombsCounter: 99,
        flagCounter: 0,
        message: '',
        isGameOver: false,
        difficulty,
        detonatedId: null,
      }
    }
  }

  const initGame = difficulty => {

    const newState = selectDifficulty(difficulty)

    const boardSize = newState.width * newState.height;

    for (let i = 0; i < boardSize; i++) {
      newState.tiles.push({
        index: i,
        isBomb: false,
        number: 0,
        isOpen: false,
        isFlag: false,
      })
    }
  
    let x = 0;
    let y = 0;

    const generateBombs = (bombsCounter, maxTiles) => {
      const bombsIndexes = new Set();

      do {
        bombsIndexes.add(Math.trunc(Math.random() * maxTiles))
      } while (bombsIndexes.size < bombsCounter)
  
      bombsIndexes.forEach( index => {
        newState.tiles.find( tile => {
          if (tile.index === index) {
            tile.isBomb = true;
          }
        })
      })
    }

    generateBombs(newState.bombsCounter, boardSize)
    
    newState.tiles.forEach((tile) => {
      tile.coords = `${x},${y}`;
      
      if (tile.isBomb) {
        newState.bombs.push(`${x},${y}`);

        if (x > 0 && y > 0) newState.numbers.push(`${x-1},${y-1}`);
        if (y > 0) newState.numbers.push(`${x},${y-1}`);
        if (y > 0 && x < newState.width - 1) newState.numbers.push(`${x+1},${y-1}`);

        if (x > 0) newState.numbers.push(`${x-1},${y}`);
        if (x < newState.width - 1) newState.numbers.push(`${x+1},${y}`);

        if (x > 0 && y < newState.height - 1) newState.numbers.push(`${x-1},${y+1}`);
        if (y < newState.height - 1) newState.numbers.push(`${x},${y+1}`);
        if (x < newState.width - 1 && y < newState.height - 1) newState.numbers.push(`${x+1},${y+1}`);

      }
      
      x++;
      if (x >= newState.width) {
        x = 0;
        y++;
      }
    });
    
    newState.numbers.forEach(num => {
      newState.tiles.find( tile => {
        if (tile.coords === num) {
          tile.number++;
        }
      })
    });

    setState(newState);
  }

  const openTile = (index) => {
    const newState = {...state}
    newState.tiles.find( tile => {
      if (index === tile.index && tile.number === 0 && !tile.isBomb) {
        openTilesAround(tile.coords, newState)
      }
      if (index === tile.index) {
        tile.isOpen = true;
      }
    })
    setState(newState);
  }

  const openTilesAround = (coords, state) => {

    const emptyTiles = new Set();

    const openEightTiles = coords => {
      
      const [x, y] = coords.split(',')
    
      const coordsAround = [
        `${+x-1},${+y-1}`,
        `${+x},${+y-1}`,
        `${+x+1},${+y-1}`,
        `${+x-1},${+y}`,
        `${+x+1},${+y}`,
        `${+x-1},${+y+1}`,
        `${+x},${+y+1}`,
        `${+x+1},${+y+1}`,    
      ]

      const newState = {...state}

      coordsAround.forEach( coord => {
        newState.tiles.find( tile => {
          if (tile.coords === coord && !tile.isFlag) {
            tile.isOpen = true;
            if (tile.number === 0) {
              emptyTiles.add(tile.coords)
            }
          }
        })
      })
    }

    openEightTiles(coords);

    let initialLength = 0;

    while (emptyTiles.size !== initialLength) {
      initialLength = emptyTiles.size;
      emptyTiles.forEach( coord => {
        openEightTiles(coord) 
      })
    }
  }

  const setFlag = (index) => {
    const newState = {...state}
    newState.tiles.find( tile => {
      if (index === tile.index) {
        tile.isFlag = !tile.isFlag;
        if (tile.isFlag) {
          newState.flagCounter += 1
        } else {
          newState.flagCounter -= 1
        }
      }
    })
    setState(newState);
  }

  const setGameOver = (bool, message, index) => {
    showBombs();
    setState({
      ...state,
      isGameOver: bool,
      message: message,
      detonatedId: index || null,
    })
  }

  const showBombs = () => {
    const newState = {...state};
    newState.tiles.forEach( tile => {
      if (tile.isBomb) {
        tile.isFlag = false;
        tile.isOpen = true;
      }
    })
    setState(newState)
  }

  const winGame = () => {
    const newState = {...state}
    let openTilesCounter = 0;
    newState.tiles.forEach( tile => {
      if (tile.isOpen && !tile.isBomb) {
        openTilesCounter +=1;
      }
      if (openTilesCounter === (newState.tiles.length - newState.bombsCounter)) {
        setGameOver(true, 'Победа!')
      }
    })
  }

  useEffect( () => {
    initGame('easy')
  }, []);

  return (
    <div>
      <Settings />
      <Grid />
    </div>
  )
}

export default App;
