import React from 'react'
import { connect } from 'react-redux'
import NewGameButton from '../NewGameButton/NewGameButton'
import setDifficulty from '../../store/ActionCreators/setDifficulty'
import toggleTheme from '../../store/ActionCreators/toggleTheme'

const mapStateToProps = state => {
  return {
    bombsCounter: state.bombsCounter,
    flagCounter: state.flagCounter,
    difficulty: state.difficulty,
    state: state,
    lightTheme: state.lightTheme,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDifficulty: (diff) => dispatch(setDifficulty(diff)),
    toggleTheme: () => dispatch(toggleTheme()),
  }
}

const Settings = (props) => {
  return (
    <div className='settings'>
      <div className='settings__button'>O</div>
      <NewGameButton />
      <div className='flags'>
        <div className='flagsCounter' title='Осталось мин'>{props.bombsCounter - props.flagCounter}</div>
      </div>
      {/* <div className='difficulty'>
        <p style={{marginTop: '0.3em', marginBottom: '0.3em'}}>Выберите сложность:</p>
        <select onChange={ evt => props.setDifficulty(evt.target.value)}>
          <option value='easy' title='Поле 8х8, 10 мин'>Новичок</option>
          <option value='medium' title='Поле 16х16, 40 мин'>Любитель</option>
          <option value='hard' title='Поле 30х16, 99 мин'>Профессионал</option>
        </select>
      </div> */}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
