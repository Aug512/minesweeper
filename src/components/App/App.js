import React, { useEffect, useState} from 'react'
import classNames from 'classnames'
import Tile from '../Tile/Tile'

function App() {

  const initailState = {
    bombs: [],
    numbers: [],
    tiles: [],
    width: 5,
    height: 5,
    difficulty: 'hard',
    bombsCounter: 4,
    flagCounter: 0,
    isGameOver: false,
    timer: 0,
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
        isGameOver: false,
        difficulty,
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
        isGameOver: false,
        difficulty,
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
        isGameOver: false,
        difficulty,
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

    console.log(newState)
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

  const openTilesAround = (coords, state) => {       // form - `${x},${y}`

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
      console.log('while Statement starts...')
      console.log(emptyTiles)
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

  const setGameOver = (bool) => {
    setState({
      ...state,
      isGameOver: bool,
    })
  }

  useEffect( () => {
    initGame('easy')
  }, []);

  return (
    <div>
      <div className='settings'>
        <div className='flags'><span>{state.bombsCounter - state.flagCounter}</span></div>
        <div className='newGame'>
          <button 
            onClick={ () => {
              initGame(state.difficulty)
            }}
          >
            New Game
          </button>
        </div>
        <div>
        <p style={{marginBottom: '0.3em'}}>Выберите сложность:</p>
          <select onChange={ evt => initGame(evt.target.value)}>
            <option value='easy'>Новичок</option>
            <option value='medium'>Любитель</option>
            <option value='hard'>Профессионал</option>
          </select>
        </div>
      </div>
      <div className={
        classNames({
          'app': true,
          'field': true,
          'easy': state.difficulty == 'easy',
          'medium': state.difficulty == 'medium',
          'hard': state.difficulty == 'hard',
          // [state.difficulty]: true,
        })
      }>
      {/* <div className={`app field ${state.difficulty}`}> */}
        {state.tiles.map( tile => {
          return (<Tile
            key={tile.index}
            data={tile}
            isGameOver={state.isGameOver}
            setGameOver={setGameOver}
            openTile={openTile}
            setFlag={setFlag}
          />)}
        )}
      </div>
      {state.isGameOver && <span>Game Over!</span>}
    </div>
  )
}

export default App;
