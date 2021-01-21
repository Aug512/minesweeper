import CreateStore from 'redux'
import initialState from './initailState'
import rootReducer from './Reducers/rootReducer'

const store = CreateStore(rootReducer, initialState)

export default store
