import React from 'react'
import { connect } from 'react-redux'
import startNewGame from '../../store/ActionCreators/startNewGame'

const mapDispatchToProps = dispatch => {
  return {
    startNewGame: () => dispatch(startNewGame()),
  }
}
const NewGameButton = (props) => {
  return (
    <div
      className='newGameButton'
      onClick={ () => {
        props.startNewGame()
        console.log(this)
      }}
    >
      New Game
    </div>
  )
}

export default connect(null, mapDispatchToProps)(NewGameButton)