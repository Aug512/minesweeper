import React from 'react'

const Settings = () => {
  return (
    <div className='settings'>
      <div className='flags'>
        <div className='flagsCounter' title='Осталось мин'>{state.bombsCounter - state.flagCounter}</div>
      </div>
      <div className='newGame'>
        <button 
          onClick={ () => {
            initGame(state.difficulty)
          }}
        >
          New Game
        </button>
      </div>
      <div className='difficulty'>
        <p style={{marginTop: '0.3em', marginBottom: '0.3em'}}>Выберите сложность:</p>
        <select onChange={ evt => initGame(evt.target.value)}>
          <option value='easy' title='Поле 8х8, 10 мин'>Новичок</option>
          <option value='medium' title='Поле 16х16, 40 мин'>Любитель</option>
          <option value='hard' title='Поле 30х16, 99 мин'>Профессионал</option>
        </select>
      </div>
    </div>
  )
}

export default Settings
