import {createStore} from 'redux'
import reducer from './modules/test'
import initialState from './initialState'

const configureStore = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

export default configureStore
