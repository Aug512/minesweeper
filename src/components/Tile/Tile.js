import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import flagIcon from '../../images/mine.png'
import bombIcon from '../../images/bomb.png'
import toggleFlag from '../../store/ActionCreators/toggleFlag'
import openTile from '../../store/ActionCreators/openTile'
import endGame from '../../store/ActionCreators/endGame'

const mapStateToProps = (state, ownProps) => {
  return {
    isGameOver: state.isGameOver,
    detonatedId: state.detonatedId,
    tile: ownProps.tile,
    tiles: state.tiles,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleFlag: (id, isFlag) => dispatch(toggleFlag(id, isFlag)),
    openTile: (id) => dispatch(openTile(id)),
    endGame: (statement, detonatedId) => dispatch(endGame(statement, detonatedId)) // statement - 'win'/'lose'
  }
}

const Tile = (props) => {

  return(
    <div
      onClick={ () => {
        if (!props.tile.isFlag && !props.isGameOver) {
          props.openTile(props.tile.index)
        }
        if (!props.tile.isFlag && props.tile.isBomb && !props.isGameOver) {
          props.endGame('lose', props.tile.index) 
        }
      }}
      onContextMenu={ evt => {
        evt.preventDefault();
        if ((!props.tile.isOpen || props.tile.isFlag) && !props.tile.isGameOver) {
          props.toggleFlag(props.tile.index, props.tile.isFlag)
        }
      }}
      className='tile'
    >
      <div className={
        classNames({
          'tile__open': props.tile.isOpen,
          'tile__closed': !props.tile.isOpen || props.tile.isFlag,
          'color__one': !props.tile.isFlag && !props.tile.isBomb && props.tile.number === 1,
          'color__two': !props.tile.isFlag && !props.tile.isBomb && props.tile.number === 2,
          'color__three': !props.tile.isFlag && !props.tile.isBomb && props.tile.number === 3,
          'color__four': !props.tile.isFlag && !props.tile.isBomb && props.tile.number === 4,
          'color__five': !props.tile.isFlag && !props.tile.isBomb && props.tile.number === 5,
          'color__six': !props.tile.isFlag && !props.tile.isBomb && props.tile.number === 6,
          'color__seven': !props.tile.isFlag && !props.tile.isBomb && props.tile.number === 7,
          'color__eight': !props.tile.isFlag && !props.tile.isBomb && props.tile.number === 8,
          'bomb': props.tile.isOpen && props.tile.isBomb,
          'flag': props.tile.isFlag,
          'detonated': (props.detonatedId === props.tile.index)
        })
      }>
        {props.tile.isFlag && <img src={flagIcon} alt='F' title='Флаг'/>}
        {props.tile.isOpen && !props.tile.isBomb && props.tile.number !== 0 && props.tile.number}
        {props.tile.isOpen && props.tile.isBomb && <img src={bombIcon} alt='B' title='Мина'/>}
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Tile);
