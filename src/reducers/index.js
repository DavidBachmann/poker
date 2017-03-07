import generateShuffledDeck from '../actions/generateShuffledDeck'

// Dummy player generation
const deck = generateShuffledDeck()
const dealCards = () => {
  let totalPlayers = 9
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
  deck: deck,
  players: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'START':
      return {
        ...state,
        started: true
      }
    case 'STOP':
      return {
        ...state,
        started: false
      }
    case 'DEAL':
      return {
        ...state,
        players: dealCards().players,
        communityCards: dealCards().communityCards
      }
    case 'GET_WINNER':
      return {
        ...state,
      }
    default:
      return state
  }
}
