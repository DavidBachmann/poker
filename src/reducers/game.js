import generateShuffledDeck from '../utils/generateShuffledDeck'
import winnerDetermination from '../utils/winnerDetermination'

// Dummy player generation
const dealCards = (totalPlayers) => {
  const deck = generateShuffledDeck()
  let bots = []
  let communityCards = []
  let heroCards = []

  for (let i = 0; i < totalPlayers - 1; i++) {
    bots[i] = deck.splice(0, 2)
  }

  communityCards = deck.splice(0, 5)
  heroCards = deck.splice(0, 2)

  return {
    bots,
    communityCards,
    heroCards
  }
}

const initialState = {
  started: false,
  pot: 0,
  bots: [],
  player: [],
  communityCards: [],
  winner: null,
  showdown: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'START':
      return {
        ...state,
        started: true,
        winner: null,
        showdown: false,
        ...dealCards(action.numberOfPlayers),
      }
    case 'STOP':
      return {
        ...state,
        started: false,
        bots: [],
        communityCards: [],
        winner: null,
      }
    case 'DETERMINE_WINNER':
      const { bots, communityCards } = state
      return {
        ...state,
        winner: winnerDetermination(bots, communityCards),
        showdown: true,
      }

    default:
      return state
  }
}
