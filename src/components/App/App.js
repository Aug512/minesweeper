import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import SettingsPanel from '../SettingsPanel/SettingsPanel'
import Grid from '../Grid/Grid'
import setDifficulty from '../../store/ActionCreators/setDifficulty'
import setDevice from '../../store/ActionCreators/setDevice'
import setSettingsPanelView from '../../store/ActionCreators/setSettingsPanelView'

const mapDispatchToProps = dispatch => {
  return {
    setDifficulty: diff => dispatch(setDifficulty(diff)),
    setDevice: type => dispatch(setDevice(type)),
    setSettingsPanelView: state => dispatch(setSettingsPanelView(state)),
  }
}

const mapStateToProps = state => {
  return {
    isMobileDevice: state.isMobileDevice,
    isSettingsOpen: state.isSettingsOpen,
  }
}

const detectDevice = props => {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    props.setDevice('mobile')
  } else {
    props.setDevice('desktop')
  }
}

function App(props) {

  useEffect( () => {
    props.setDifficulty('easy')
    detectDevice(props)
  }, []);

  const checkParents = (target, element) => {

    if (target === element) return false
    else if (target !== element && target !== document) return checkParents(target.parentNode, element)
    else return true
  }

  return (
    <div
      className='app__wrapper'
      onClick={ () => {
        if (props.isSettingsOpen) {
          const settingsPanel = document.getElementById('settingsPanel')
          document.addEventListener('click', e => {
            if (checkParents(e.target, settingsPanel, 4)) props.setSettingsPanelView(false)
          }, {once: true})
        }
      }}
    >
      <SettingsPanel />
      <Grid />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
