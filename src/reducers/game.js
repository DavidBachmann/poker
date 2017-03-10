import winnerDetermination from '../utils/winnerDetermination'
import dealCards from '../utils/dealCards'
import generateShuffledDeck from '../utils/generateShuffledDeck'

const initialState = {
  deck: generateShuffledDeck(), // Freshly shuffled deck of cards
  totalPlayers: 9,
  started: false, // Game is not started
  pot: 0, // Pot in dollars
  nextStreet: 0, // {0: 'preflop', 1: 'flop', 2: 'turn', 3: 'river'}
  bots: [], // Array of bots
  heroCards: [], // Array of our cards
  communityCards: {flop: {}, turn: {}, river: {}}, // Array of dealt community cards
  winners: null, // We haven't selected a winner yet
  nextToAct: 0, // Player at index 0 starts (TODO)
  showdown: false, // Showdown means the round is over and all remaining players should reveal their hands.
}

export default (state = initialState, action) => {
  const { deck, totalPlayers, nextStreet, bots, communityCards, heroCards, nextToAct } = state
  console.log(Array.from({length: 8}, () => []))
  switch (action.type) {
    case 'START':
      return {
        ...state,
        bots: Array.from({length: 8}, () => []),
        started: true,
        winners: null,
        showdown: false,
        nextStreet: 1,
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
        winners: winnerDetermination(bots, heroCards, communityCards, totalPlayers),
        showdown: true,
      }

    case 'NEXT_TO_ACT':
      return {
        ...state,
        nextToAct: nextToAct === 8 ? 0 : nextToAct + 1,
      }

    case 'DEAL_PREFLOP':
      return {
        ...state,
        nextStreet: 2,
        ...dealCards(deck, bots, heroCards, nextStreet, communityCards, totalPlayers)
      }

    case 'DEAL_FLOP':
      return {
        ...state,
        nextStreet: 3,
        ...dealCards(deck, bots, heroCards, nextStreet, communityCards)
      }

    case 'DEAL_TURN':
      return {
        ...state,
        nextStreet: 4,
        ...dealCards(deck, bots, heroCards, nextStreet, communityCards)

      }

    case 'DEAL_RIVER':
      return {
        ...state,
        ...dealCards(deck, bots, heroCards, nextStreet, communityCards),
        nextStreet: 0,
      }

    case 'RESET_CARDS':
      return {
        ...state,
        deck: generateShuffledDeck(),
        nextStreet: 0,
        communityCards: [],
        heroCards: [],
        bots: [],
        winners: null,
      }


    default:
      return state
  }
}
