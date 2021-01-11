import React from 'react'
import classNames from 'classnames'
import flagIcon from '../../images/mine.png'
import bombIcon from '../../images/bomb.png'

const Tile = ( { data, isGameOver, detonatedId, setGameOver, winGame, openTile, setFlag } ) => {

  return(
    <div
      onClick={ () => {
        if (!data.isFlag && !isGameOver) {
          openTile(data.index)
        }
        if (!data.isFlag && data.isBomb && !isGameOver) {
          setGameOver(true, 'Поражение!', data.index)
        }
        winGame()
       }
      }
      onContextMenu={ evt => {
        evt.preventDefault();
        if ((!data.isOpen || data.isFlag) && !isGameOver) {
          setFlag(data.index)
        }
      }}
      className='tile'
    >
      <div className={
        classNames({
          'tile__open': data.isOpen,
          'tile__closed': !data.isOpen || data.isFlag,
          'color__one': !data.isFlag && !data.isBomb && data.number === 1,
          'color__two': !data.isFlag && !data.isBomb && data.number === 2,
          'color__three': !data.isFlag && !data.isBomb && data.number === 3,
          'color__four': !data.isFlag && !data.isBomb && data.number === 4,
          'color__five': !data.isFlag && !data.isBomb && data.number === 5,
          'color__six': !data.isFlag && !data.isBomb && data.number === 6,
          'color__seven': !data.isFlag && !data.isBomb && data.number === 7,
          'color__eight': !data.isFlag && !data.isBomb && data.number === 8,
          'bomb': data.isOpen && data.isBomb,
          'flag': data.isFlag,
          'detonated': (detonatedId === data.index)
        })
      }>
        {data.isFlag && <img src={flagIcon} alt='F' title='Флаг'/>}
        {data.isOpen && !data.isBomb && data.number !== 0 && data.number}
        {data.isOpen && data.isBomb && <img src={bombIcon} alt='B' title='Мина'/>}
      </div>
    </div>
  )
}

export default Tile;
