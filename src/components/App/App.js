import React from 'react'
import Tile from '../Tile/Tile'
import store from '../../store/store'

function App() {

  //const tiles = document.querySelectorAll('.tile');
  const bombs = [];
  const numbers = [];
  const tiles = [];
  const boardSize = 5;

  for (let i = 0; i < boardSize ** 2; i++ ) {
    tiles.push({
      index: i,
      isBomb: false,
      number: 0,
    })
  }

  let x = 0;
  let y = 0;
  
	tiles.forEach((tile, i) => {
		tile.coords = `${x},${y}`;
		
		let random_boolean = Math.random() < 0.2; //true if rand < freq (0.2)
		if (random_boolean) {
			bombs.push(`${x},${y}`);
			if (x > 0) numbers.push(`${x-1},${y}`);
			if (x < boardSize - 1) numbers.push(`${x+1},${y}`);
			if (y > 0) numbers.push(`${x},${y-1}`);
			if (y < boardSize - 1) numbers.push(`${x},${y+1}`);
			
			if (x > 0 && y > 0) numbers.push(`${x-1},${y-1}`);
			if (x < boardSize - 1 && y < boardSize - 1) numbers.push(`${x+1},${y+1}`);
			
			if (y > 0 && x < boardSize - 1) numbers.push(`${x+1},${y-1}`);
			if (x > 0 && y < boardSize - 1) numbers.push(`${x-1},${y+1}`);
		}
		
		x++;
		if (x >= boardSize) {
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
  
  console.log(bombs);
  console.log(numbers);
  console.log(tiles);
	
	numbers.forEach(num => {
    tiles.find( tile => {
      if (num === tile.coords) {
        tile.number++;
      }
    })
  });

  bombs.forEach(bomb => {
    tiles.find( tile => {
      if (bomb === tile.coords) {
        tile.isBomb = true;
      }
    }) 
  });
  
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
      {tiles.map( tile => <Tile key={tile.index} data={tile}/>)}
    </div>
  );
}

export default App;
