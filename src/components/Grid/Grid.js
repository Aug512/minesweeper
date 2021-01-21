import React from 'react'
import Tile from '../Tile/Tile'
import classNames from 'classnames'

const Grid = () => {
  return (
    <div className={
      classNames({
        'app': true,
        'field': true,
        'easy': state.difficulty === 'easy',
        'medium': state.difficulty === 'medium',
        'hard': state.difficulty === 'hard',
      })
    }>
      {state.tiles.map( tile => {
        return (<Tile
          key={tile.index}
          data={tile}
          isGameOver={state.isGameOver}
          detonatedId={state.detonatedId}
          setGameOver={setGameOver}
          winGame={winGame}
          openTile={openTile}
          setFlag={setFlag}
        />)}
      )}
      {state.isGameOver && 
        <div
          className={
            classNames({
              'messageBox': true,
              'message__win': (state.message === 'Победа!'),
              'message__lose': (state.message === 'Поражение!'),
            })
          }
          onClick={ () => {
            const box = document.querySelector('.messageBox');
            box.style='display: none';
          }}
        >
          <span>{state.message}</span>
        </div>
      }
    </div>
  )
}

export default Grid
