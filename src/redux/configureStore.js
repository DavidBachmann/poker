import { createStore } from 'redux'
import reducer from './modules/test'

const configureStore = createStore(
  reducer,
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default configureStore
