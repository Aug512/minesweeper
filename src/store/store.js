import { createStore } from 'redux'
import initialState from './initialState'
import settingsReducer from './Reducers/settingsReducer'

const store = createStore(settingsReducer, initialState)

export default store
