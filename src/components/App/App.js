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
    bombsCounter: 0,
  }

  const [state, setState] = useState(initailState);

  const selectDifficulty = difficulty => {
    
    switch (difficulty) {
      case 'easy':
        setState(
          {
            ...state,
            width: 8,
            height: 8,
            bombsCounter: 10,
            difficulty: difficulty,
          }
        );
        break;
      case 'medium':
        setState(
          {
            ...state,
            width: 16,
            height: 16,
            bombsCounter: 40,
            difficulty: difficulty,
          }
        );
        break;
      case 'hard':
        setState(
          {
            ...state,
            width: 30,
            height: 16,
            bombsCounter: 99,
            difficulty: difficulty,
          }
        );
        break;
    }
  }

  const initGame = difficulty => {

    selectDifficulty(difficulty);

    const boardSize = state.width * state.height;

    const newState = {...state}

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
    
    newState.tiles.forEach((tile, i) => {
      tile.coords = `${x},${y}`;
      
      let random_boolean = Math.random() < 0.2; //true if rand < freq (0.2)
      if (random_boolean) {
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
      
      // tile.oncontextmenu = function(e) {
      // 	e.preventDefault();
      // 	flag(tile);
      // }
      
      // tile.addEventListener('click', function(e) {
      // 	clickTile(tile);
      // });
    });
    
    newState.numbers.forEach(num => {
      newState.tiles.find( tile => {
        if (num === tile.coords) {
          tile.number++;
        }
      })
    });
  
    newState.bombs.forEach(bomb => {
      newState.tiles.find( tile => {
        if (bomb === tile.coords) {
          tile.isBomb = true;
        }
      }) 
    });

    setState(newState)
  }

  const openTile = (index) => {
    const newState = {...state}
    newState.tiles.find( tile => {
      if (index === tile.index) {
        tile.isOpen = true;
      }
    })
    setState(newState);
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

  useEffect( () => {
    initGame('test')
  }, []);
  
  // const flag = (tile) => {
  //   if (gameOver) return;
  //   if (!tile.classList.contains('tile--checked')) {
  //     if (!tile.classList.contains('tile--flagged')) {
  //       tile.innerHTML = 'flag';
  //       tile.classList.add('tile--flagged');
  //       } else {
  //       tile.innerHTML = 'noflag';
  //       tile.classList.remove('tile--flagged');
  //     }
  //   }
  // }

  return (
    <div className="App field">
      {state.tiles.map( tile => <Tile key={tile.index} data={tile} openTile={openTile} setFlag={setFlag}/>)}
    </div>
  );
}

export default App;
