import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './modules/gameManager'
import initialState from './initialState'

const configureStore = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk)),
)

export default configureStore
