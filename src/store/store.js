import CreateStore from 'redux'
import initialState from './initialState'
import rootReducer from './Reducers/rootReducer'

const store = CreateStore(rootReducer, initialState)

export default store
