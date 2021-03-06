import React from 'react'
import { connect } from 'react-redux'
import setDifficulty from '../../store/ActionCreators/setDifficulty'
import toggleTheme from '../../store/ActionCreators/toggleTheme'
import setSettingsPanelView from '../../store/ActionCreators/setSettingsPanelView'
import classNames from 'classnames'

const mapStateToProps = state => {
  return {
    lightTheme: state.lightTheme,
    isSettingsOpen: state.isSettingsOpen,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDifficulty: diff => dispatch(setDifficulty(diff)),
    toggleTheme: () => dispatch(toggleTheme()),
    setSettingsPanelView: state => dispatch(setSettingsPanelView(state)),
  }
}

const SettingsPanel = props => {
  return (
    <div className={classNames({
      'settings__panel': true,
      'open': props.isSettingsOpen,
    })}
    id='settingsPanel'
    >
      <div className='theme__selector'>
        <span className='theme__title'>Тема оформления</span>
        <label>
          <div className='themeSelector__field'></div>
          <input type='checkbox' checked={!props.lightTheme} id='themeSelector' onChange={ () => props.toggleTheme()} />
        </label>
      </div>

      <p className='difficulty__head'>Выберите сложность:</p>
      <div
        className='difficulty__label'
        onClick={ () => props.setDifficulty('easy')}
      >
        <h3 className='difficulty__title'>Новичок</h3>
        <p className='difficulty__description'>Поле 8х8, 10 мин</p>
      </div>
      <div
        className='difficulty__label'
        onClick={ () => props.setDifficulty('medium')}
      >
        <h3 className='difficulty__title'>Любитель</h3>
        <p className='difficulty__description'>Поле 16х16, 40 мин</p>
      </div>
      <div
        className='difficulty__label'
        onClick={ () => props.setDifficulty('hard')}
      >
        <h3 className='difficulty__title'>Профессионал</h3>
        <p className='difficulty__description'>Поле 30х16, 99 мин</p>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPanel)