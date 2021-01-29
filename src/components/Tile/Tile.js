import React, {useEffect} from 'react'
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
    width: state.width,
    height: state.height,
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

  useEffect( () => checkWin(props.tiles), [props.tiles])

  let timerStart = 0;

  const initTouchTimer = () => {
    const timerStart = Date.now()
    return timerStart
  }

  const checkTouchTimer = (delay) => {
    const touchEnd = Date.now()
    return (touchEnd - timerStart > delay) ? true : false
  }

  const checkWin = tiles => {
    let openTilesCounter = 0;

    tiles.forEach( tile => {
      if (tile.isOpen && !tile.isBomb) {
        openTilesCounter += 1;
      }
    })
    if (openTilesCounter === (props.tiles.length - props.bombsCounter)) {
      props.endGame('win')
    }
  }

  const getCoordsAround = coords => {

    const x = coords[0]
    const y = coords[1]

    const coordsAround = []

    if (+x - 1 >= 0 && +y - 1 >= 0) coordsAround.push([+x - 1, +y - 1])
    if (+y - 1 >= 0) coordsAround.push([+x, +y - 1])
    if (+x + 1 < props.width && +y - 1 >= 0) coordsAround.push([+x + 1, +y - 1])
    if (+x - 1 >= 0) coordsAround.push([+x - 1, +y])
    if (+x + 1 < props.width) coordsAround.push([+x + 1, +y])
    if (+x - 1 >= 0 && +y + 1 < props.height) coordsAround.push([+x - 1, +y + 1])
    if (+y + 1 < props.height) coordsAround.push([+x, +y + 1])
    if (+x + 1 < props.width && +y + 1 < props.height) coordsAround.push([+x + 1, +y + 1])

    return coordsAround
  }

  const getIndex = (coords) => {
    return (((coords[1] <= 0) ? 0 : coords[1] * props.width) + coords[0])
  }

  const openCheckedTiles = (tile, coords) => {

    let flagsCounter = 0
    
    const coordsAround = getCoordsAround(coords)

    coordsAround.forEach( coord => {
      const index = getIndex(coord)

      if (props.tiles[index].overlay === 'flag') {
        flagsCounter++
      }
    })

    if (flagsCounter === tile.number) {
      openTilesAround(coords)
    }
  }

  const openTilesAround = (coords) => {

    const emptyTiles = new Set();

    const openEightTiles = coords => {

      const coordsAround = getCoordsAround(coords)

      coordsAround.forEach( coord => {

        const index = getIndex(coord)

        if (props.tiles[index].overlay !== 'flag' && !props.tiles[index].isOpen) {
          props.openTile(index)
        
          if (props.tiles[index].number === 0){
            emptyTiles.add(`${coord[0]},${coord[1]}`)
          }
          if (props.tiles[index].isBomb) {
            props.endGame('lose', index)
          }
        }
      })
    }

    openEightTiles(coords);

    let initialLength = 0;

    while (emptyTiles.size !== initialLength) {
      initialLength = emptyTiles.size;
      emptyTiles.forEach( coord => {
        const coords = coord.split(',')
        openEightTiles(coords) 
      })
    }
  }

  return(
    <div
      onClick={ () => {
        if (props.tile.overlay !== 'flag' && !props.isGameOver) {
          props.openTile(props.tile.index)
          if (props.tile.number === 0 && !props.tile.isBomb) {
            openTilesAround(props.tile.coords)
          }
        }
        if (props.tile.overlay !== 'flag' && props.tile.isBomb && !props.isGameOver) {
          props.endGame('lose', props.tile.index) 
        }
      }}
      onDoubleClick={ () => {
        if (props.tile.isOpen) {
          openCheckedTiles(props.tile, props.tile.coords)
        }
      }}
      onContextMenu={ evt => {
        evt.preventDefault();
        if (!props.tile.isOpen && !props.isGameOver) {
          props.toggleFlag(props.tile.index, props.tile.overlay)
        }
      }}
      onTouchStart={ e => {
        e.preventDefault()
        timerStart = initTouchTimer()
      }}
      onTouchEnd={ () => {
        const response = checkTouchTimer(500)
        if (response && !props.tile.isOpen && !props.isGameOver) {
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
        {props.tile.overlay === 'flag' && <img src={flagIcon} alt='F' title='Флаг' className='flagIcon' />}
        {!props.tile.isOpen && props.tile.overlay === 'question' && '?'}
        {props.tile.isOpen && !props.tile.isBomb && props.tile.number !== 0 && props.tile.number}
        {props.tile.isOpen && props.tile.isBomb && <img src={bombIcon} alt='B' title='Мина' className='bombIcon' />}
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Tile);
