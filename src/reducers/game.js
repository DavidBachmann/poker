import generateShuffledDeck from '../utils/generateShuffledDeck'
import winnerDetermination from '../utils/winnerDetermination'

// Dummy player generation
const dealCards = (totalPlayers) => {
  const deck = generateShuffledDeck()
  let players = []
  let communityCards = []

  for (let i = 0; i < totalPlayers; i++) {
    players[i] = deck.splice(0, 2)
  }

  communityCards = deck.splice(0, 5)

  return {
    players,
    communityCards
  }
}

const initialState = {
  started: false,
  pot: 0,
  players: [],
  communityCards: [],
  winner: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'START':
      return {
        ...state,
        started: true,
        winner: null,
        ...dealCards(action.numberOfPlayers),
      }
    case 'STOP':
      return {
        ...state,
        started: false,
        players: [],
        communityCards: [],
        winner: null,
      }
    case 'DETERMINE_WINNER': {
      const { players, communityCards } = state
      return {
        ...state,
        winner: winnerDetermination(players, communityCards),
      }
    }
    default:
      return state
  }
}
