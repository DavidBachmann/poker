import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import initialState from '../initialState'
import reducer, { startGameThunk, playerBetsThunk, playerFoldsThunk } from './gameManager'

jest.mock('../../utils/delay', () => {
  return jest.fn(() => Promise.resolve())
})

test('First player to act bets and everyone folds', () => {
  const { getState, dispatch } = createStore(reducer, initialState, applyMiddleware(thunk))
  const { players } = getState()
  dispatch(startGameThunk())
  dispatch(playerBetsThunk(200))
  for (var i = 0; i < players.length - 1; i++) {
    dispatch(playerFoldsThunk())
  }
  const state = getState()
  expect(state.handWinners.length).toBe(1)
})

test('Everyone folds to the BB', () => {
  const { getState, dispatch } = createStore(reducer, initialState, applyMiddleware(thunk))
  const { players } = getState()
  dispatch(startGameThunk())
  for (var i = 0; i < players.length - 1; i++) {
    dispatch(playerFoldsThunk())
  }
  const state = getState()
  expect(state.handWinners.length).toBe(1)
})

test('Last two players go all-in and one is eliminated', async () => {
  const { getState, dispatch } = createStore(reducer, initialState, applyMiddleware(thunk))
  const { players } = getState()
  await dispatch(startGameThunk())
  for (var i = 0; i < players.length - 2; i++) {
    await dispatch(playerFoldsThunk())
  }
  await dispatch(playerBetsThunk(15000))
  await dispatch(playerBetsThunk(15000))
  const state = getState()
  expect(state.players.length).toBe(5)
})
