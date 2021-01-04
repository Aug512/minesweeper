import React from 'react'
import store from '../../store/store'
import toggleFlag from '../../store/actionCreators/toggleFlag'
import openTile from '../../store/actionCreators/openTile'
// import flagIcon from '...'

const Tile = ( { data } ) => {

  return(
    <div
      className='tile'
      // onClick={ () => {
      //   data.isBomb && showTile('B');
      //   !data.isBomb && showTile(data.number);
      // }}
      // onContextMenu={ (e) => {
      //   e.preventDefault();
      //   showTile('F');
      // }}
      onClick={ () => {
        store.dispatch(openTile(data.id))
      }}
      onContextMenu={ evt => {
        evt.preventDefault();
        if (!data.isOpen) {
          store.dispatch(toggleFlag(data.id));
        }
      }}
    >
      {data.isFlag && flagIcon}
      {data.isOpen && data.number}
    </div>
  )
}

export default Tile;
