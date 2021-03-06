import React from 'react'
import { connect } from 'react-redux'
import Tile from '../Tile/Tile'
import classNames from 'classnames'
import Settings from '../Settings/Settings'

const mapStateToProps = state => {
  return {
    tiles: state.tiles,
    isGameOver: state.isGameOver,
    difficulty: state.difficulty,
    message: state.message,
    detonatedId: state.detonatedId,
    isMobileDevice: state.isMobileDevice,
  }
}

const Grid = (props) => {

  return (
    <div className={
      classNames({
        'field': true,
        'easy': props.difficulty === 'easy',
        'medium': props.difficulty === 'medium',
        'hard': props.difficulty === 'hard' && !props.isMobileDevice,
        'hard__mobile': props.difficulty === 'hard' && props.isMobileDevice,
      })
    }>

      <Settings />
      {props.tiles.map( tile => {
        return (<Tile
          key={tile.index}
          tile={tile}
        />)}
      )}

      {props.isGameOver && 
        <div
          className={
            classNames({
              'messageBox': true,
              'message__win': (props.message === 'Победа!'),
              'message__lose': (props.message === 'Поражение!'),
            })
          }
          onClick={ () => {
            const box = document.querySelector('.messageBox');
            box.style='display: none';
          }}
        >
          <span>{props.message}</span>
        </div>
      }
    </div>
  )
}

export default connect(mapStateToProps, null)(Grid)
