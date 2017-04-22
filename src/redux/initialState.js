import deepFreeze from 'deep-freeze'
import { initializePlayers, initializeLevels } from '../utils/initializer'

const players = initializePlayers(6, 1500)
const levels = initializeLevels()

const initialState = deepFreeze({
  pot: 0,
  deck: [],
  levels: levels,
  players: players,
  showdown: false,
  positions: {},
  handHistory: [],
  handWinners: [],
  currentLevel: 1,
  currentStreet: 0,
  communityCards: {},
  nextPlayerToAct: 0,
  whatPlayerIsDealer: null,
  highestCurrentBettor: null,
})

export default initialState
