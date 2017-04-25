import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import initialState from '../initialState'
import reducer, { startRoundThunk, playerBetsThunk } from './gameManager'

test('test', () => {
  const { getState, dispatch } = createStore(reducer, initialState, applyMiddleware(thunk))

  dispatch(startRoundThunk())
  dispatch(playerBetsThunk(200))

  const state = getState()
  expect(state).toEqual({})
})
