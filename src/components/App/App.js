import React, { useEffect, useState} from 'react'
import Tile from '../Tile/Tile'

function App() {

  const initailState = {
    bombs: [],
    numbers: [],
    tiles: [],
    width: 5,
    height: 5,
    difficulty: 'test',
    bombsCounter: 4,
    isGameOver: false,
    timer: 0,
  }

  const [state, setState] = useState(initailState);

  const selectDifficulty = difficulty => {

    if (difficulty === 'easy') {
      return {
        ...state,
        width: 8,
        height: 8,
        bombsCounter: 10,
        difficulty: difficulty,
      }
    }
    if (difficulty === 'medium') {
      return {
        ...state,
        width: 16,
        height: 16,
        bombsCounter: 40,
        difficulty: difficulty,
      }
    }
    if (difficulty === 'hard') {
      return {
        ...state,
        width: 30,
        height: 16,
        bombsCounter: 99,
        difficulty: difficulty,
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
      } while (bombsIndexes.size <= bombsCounter)
  
      bombsIndexes.forEach( index => {
        console.log(index)
        newState.tiles.find( tile => {
          if (tile.index === index) {
            tile.isBomb = true;
          }
        })
      })
      console.log(bombsIndexes)
      console.log(newState)
    }

    generateBombs(newState.bombsCounter, boardSize)
    
    newState.tiles.forEach((tile) => {
      tile.coords = `${x},${y}`;
      
      // let random_boolean = Math.random() < 0.2; //true if rand < freq (0.2)
      // if (random_boolean) {
      //   newState.bombs.push(`${x},${y}`);      // origin
      if (tile.isBomb) {
        newState.bombs.push(`${x},${y}`);
        if (x > 0) newState.numbers.push(`${x-1},${y}`);
        if (x < state.width - 1) newState.numbers.push(`${x+1},${y}`);
        if (y > 0) newState.numbers.push(`${x},${y-1}`);
        if (y < state.height - 1) newState.numbers.push(`${x},${y+1}`);
        
        if (x > 0 && y > 0) newState.numbers.push(`${x-1},${y-1}`);
        if (x < state.width - 1 && y < state.height - 1) newState.numbers.push(`${x+1},${y+1}`);
        
        if (y > 0 && x < state.width - 1) newState.numbers.push(`${x+1},${y-1}`);
        if (x > 0 && y < state.height - 1) newState.numbers.push(`${x-1},${y+1}`);
      }
      
      x++;
      if (x >= newState.width) {
        x = 0;
        y++;
      }
    });
    
    newState.numbers.forEach(num => {
      newState.tiles.find( tile => {
        if (num === tile.coords) {
          tile.number++;
        }
      })
    });
  
    // newState.bombs.forEach(bomb => {
    //   newState.tiles.find( tile => {
    //     if (bomb === tile.coords) {
    //       tile.isBomb = true;
    //     }
    //   }) 
    // });

    setState(newState);
  }

  const openTile = (index) => {
    const newState = {...state}
    newState.tiles.find( tile => {
      if (index === tile.index && tile.number === 0 && !tile.isBomb) {
        openTilesAround(tile.coords)
      }
      if (index === tile.index) {
        tile.isOpen = true;
      }
    })
    setState(newState);
  }

  const openTilesAround = (coords) => {       // form - `${x},${y}`

    const emptyTiles = new Set();

    const openEightTiles = coords => {
      
      const [x, y] = [coords[0], coords[2]]
    
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

      setState(newState);
    }

    openEightTiles(coords);

    let initialLength = emptyTiles.length;

    emptyTiles.forEach( coord => {
      openEightTiles(coord)
    })

    while (emptyTiles.length !== initialLength) {
      console.log('while Statement starts...')
      console.log(emptyTiles)
      emptyTiles.forEach( coord => {
        openEightTiles(coord) 
      })
      initialLength = emptyTiles.length;
    }

  }

  const setFlag = (index) => {
    const newState = {...state}
    newState.tiles.find( tile => {
      if (index === tile.index) {
        tile.isFlag = !tile.isFlag;
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
      <div className='buttons'>
        <div className='bombs'>{/*state.bombsCounter*/}</div>
        <div className='newGame' />
        <div className='timer'>{state.timer}</div>
      </div>
      <div className="App field">
        {state.tiles.map( tile => {
          return (<Tile
            key={tile.index}
            data={tile}
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
