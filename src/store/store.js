import { createStore } from 'redux'
import initialState from './initialState'
import rootReducer from './Reducer/rootReducer'

const store = createStore(rootReducer, initialState)

export default store
