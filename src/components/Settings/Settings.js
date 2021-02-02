import React from 'react'
import { connect } from 'react-redux'
import NewGameButton from '../NewGameButton/NewGameButton'
import setDifficulty from '../../store/ActionCreators/setDifficulty'
import toggleTheme from '../../store/ActionCreators/toggleTheme'
import setSettingsPanelView from '../../store/ActionCreators/setSettingsPanelView'
import settingsIcon from '../../images/settings.png'
import settingsIconDark from '../../images/settings-dark.png'

const mapStateToProps = state => {
  return {
    bombsCounter: state.bombsCounter,
    flagCounter: state.flagCounter,
    difficulty: state.difficulty,
    state: state,
    lightTheme: state.lightTheme,
    isSettingsOpen: state.isSettingsOpen,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDifficulty: (diff) => dispatch(setDifficulty(diff)),
    toggleTheme: () => dispatch(toggleTheme()),
    setSettingsPanelView: state => dispatch(setSettingsPanelView(state)),
  }
}

const Settings = (props) => {
  return (
    <div className='settings__wrapper'>
      <div className='settings'>
        <div
          className='settings__button'
          onClick={ () => {
            props.setSettingsPanelView(!props.isSettingsOpen)
          }}
        >
          {props.lightTheme && <img src={settingsIcon} alt='S' title='Открыть настройки' className='settingsIcon'/>}
          {!props.lightTheme && <img src={settingsIconDark} alt='S' title='Открыть настройки' className='settingsIcon'/>}
        </div>
        <NewGameButton />
        <div className='flags'>
          <div className='flagsCounter' title='Осталось мин'>{props.bombsCounter - props.flagCounter}</div>
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
