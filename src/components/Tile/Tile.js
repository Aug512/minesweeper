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
    bombsCounter: state.bombsCounter,
    tile: ownProps.tile,
    tiles: state.tiles,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleFlag: (id, currentState) => dispatch(toggleFlag(id, currentState)),
    openTile: (id) => dispatch(openTile(id)),
    endGame: (statement, detonatedId = null) => dispatch(endGame(statement, detonatedId)) // statement - 'win'/'lose'
  }
}

const Tile = (props) => {

  const checkWin = () => {
    let openTilesCounter = 1;

    props.tiles.forEach( tile => {
      if (tile.isOpen && !tile.isBomb) {
        openTilesCounter += 1;
      }
    })
    if (openTilesCounter === (props.tiles.length - props.bombsCounter)) {
      props.endGame('win')
    }
  }

  const openTilesAround = (coords, state) => {

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

      coordsAround.forEach( coord => {
        state.tiles.find( tile => {
          if (tile.coords === coord && tile.overlay !== 'flag') {
            tile.isOpen = true;
            tile.overlay = 'none'
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
      initialLength = emptyTiles.size;
      emptyTiles.forEach( coord => {
        openEightTiles(coord) 
      })
    }
  }

  return(
    <div
      onClick={ () => {
        if (props.tile.overlay !== 'flag' && !props.isGameOver) {
          props.openTile(props.tile.index)
          checkWin()
          if (props.tile.number === 0 && !props.tile.isBomb) {
            openTilesAround(props.tile.coords, props)
          }
        }
        if (props.tile.overlay !== 'flag' && props.tile.isBomb && !props.isGameOver) {
          props.endGame('lose', props.tile.index) 
        }
      }}
      onContextMenu={ evt => {
        evt.preventDefault();
        if (!props.tile.isOpen && !props.isGameOver) {
          props.toggleFlag(props.tile.index, props.tile.overlay)
        }
      }}
      className='tile'
    >
      <div className={
        classNames({
          'tile__open': props.tile.isOpen,
          'tile__closed': !props.tile.isOpen || props.tile.overlay !== 'none',
          'color__one': props.tile.overlay === 'none' && !props.tile.isBomb && props.tile.number === 1,
          'color__two': props.tile.overlay === 'none' && !props.tile.isBomb && props.tile.number === 2,
          'color__three': props.tile.overlay === 'none' && !props.tile.isBomb && props.tile.number === 3,
          'color__four': props.tile.overlay === 'none' && !props.tile.isBomb && props.tile.number === 4,
          'color__five': props.tile.overlay === 'none' && !props.tile.isBomb && props.tile.number === 5,
          'color__six': props.tile.overlay === 'none' && !props.tile.isBomb && props.tile.number === 6,
          'color__seven': props.tile.overlay === 'none' && !props.tile.isBomb && props.tile.number === 7,
          'color__eight': props.tile.overlay === 'none' && !props.tile.isBomb && props.tile.number === 8,
          'bomb': props.tile.isOpen && props.tile.isBomb,
          'flag': props.tile.overlay === 'flag',
          'detonated': (props.detonatedId === props.tile.index)
        })
      }>
        {props.tile.overlay === 'flag' && <img src={flagIcon} alt='F' title='Флаг'/>}
        {props.tile.overlay === 'question' && '?'}
        {props.tile.isOpen && !props.tile.isBomb && props.tile.number !== 0 && props.tile.number}
        {props.tile.isOpen && props.tile.isBomb && <img src={bombIcon} alt='B' title='Мина'/>}
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Tile);
