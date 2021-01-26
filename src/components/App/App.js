import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Settings from '../Settings/Settings'
import Grid from '../Grid/Grid'
import setDifficulty from '../../store/ActionCreators/setDifficulty'

const mapDispatchToProps = dispatch => {
  return {
    setDifficulty: (diff) => dispatch(setDifficulty(diff)),
  }
}

const mapStateToProps = state => {
  return { state }
}

function App(props) {

  useEffect( () => {
    props.setDifficulty('easy')
  }, []);

  return (
    <div>
      <Settings />
      <Grid />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
