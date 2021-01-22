import settingsReducer from './settingsReducer'

const rootReducer = (state, action) => {
  switch (action.type) {
    case 'action1':
      //do something
      break;
    case 'action2':
      //do something else
      break;
    default:
      return state;
  }
}

export default rootReducer
