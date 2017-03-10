import winnerDetermination from '../utils/winnerDetermination'
import dealCards from '../utils/dealCards'
import generateShuffledDeck from '../utils/generateShuffledDeck'

const initialState = {
  deck: generateShuffledDeck(),
  started: false, // Game is not started
  pot: 0, // Pot in dollars
  nextStreet: 0, // {0: 'preflop', 1: 'flop', 2: 'turn', 3: 'river'}
  bots: [], // Array of bot players.
  communityCards: {flop: {}, turn: {}, river: {}}, // Array of dealt community cards
  heroCards: [], // Array of our cards
  winners: null, // We haven't selected a winner yet
  nextToAct: 0, // Player at index 0 starts (TODO)
  showdown: false, // Showdown means the round is over and all remaining players should reveal their hands.
}

export default (state = initialState, action) => {
  const { deck, nextStreet, bots, communityCards, heroCards, nextToAct } = state

  switch (action.type) {
    case 'START':
      return {
        ...state,
        started: true,
        winners: null,
        showdown: false,
        nextStreet: 1,
        ...dealCards(deck, nextStreet, communityCards, (action.numberOfPlayers)),
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
        nextToAct: nextToAct === 8 ? 0 : nextToAct + 1,
      }

    case 'DEAL_NEXT_STREET':
      return {
        ...state,
        nextStreet: nextStreet + 1,
        ...dealCards(deck, nextStreet, communityCards)
      }

    case 'RESET_STREET':
      return {
        ...state,
        nextStreet: 0,
      }


    default:
      return state
  }
}
