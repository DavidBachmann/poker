import generateShuffledDeck from '../utils/generateShuffledDeck'
import winnerDetermination from '../utils/winnerDetermination'

// Dummy player generation
const dealCards = (totalPlayers) => {
  const deck = generateShuffledDeck()
  let bots = []
  let communityCards = []
  let heroCards = []

  for (let i = 0; i < totalPlayers; i++) {
    if (i === 0) {
      // First deal for Hero
      heroCards = deck.splice(0, 2)
    } else {
      // Then for bots
      bots[i - 1] = deck.splice(0, 2)
    }
  }

  communityCards = deck.splice(0, 5)

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
  communityCards: [],
  heroCards: [],
  winners: null,
  nextToAct: 0,
  showdown: false,
}

export default (state = initialState, action) => {
  const { bots, communityCards, heroCards, nextToAct } = state

  switch (action.type) {
    case 'START':
      return {
        ...state,
        started: true,
        winners: null,
        showdown: false,
        ...dealCards(action.numberOfPlayers),
      }

    case 'STOP':
      return {
        ...state,
        started: false,
        bots: [],
        communityCards: [],
        winners: null,
      }

    case 'DETERMINE_WINNER':
      return {
        ...state,
        winners: winnerDetermination(bots, heroCards, communityCards),
        showdown: true,
      }

    case 'NEXT_TO_ACT':
      return {
        ...state,
        nextToAct: nextToAct === 8 ? 0 : nextToAct + 1
      }

    default:
      return state
  }
}
