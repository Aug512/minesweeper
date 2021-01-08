import React from 'react'
// import flagIcon from '...'

const Tile = ( { data, setGameOver, openTile, setFlag } ) => {

  return(
    <div
      className='tile'
      onClick={ () => {
        if (!data.isFlag) {
          openTile(data.index)
        }
        if(data.isBomb) {
          setGameOver(true)
        }
       }
      }
      onContextMenu={ evt => {
        evt.preventDefault();
        if (!data.isOpen || data.isFlag) {
          setFlag(data.index)
        }
      }}
    >
      {data.isFlag && 'F'}
      {data.isOpen && !data.isBomb && data.number}
      {data.isOpen && data.isBomb && 'B'}
    </div>
  )
}

export default Tile;
