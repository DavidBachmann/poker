import winnerDetermination from '../utils/winnerDetermination'
import dealCards from '../utils/dealCards'
import initializer from '../utils/initializer'
import generateShuffledDeck from '../utils/generateShuffledDeck'

const STARTING_STACK = 1500
const TOTAL_BOTS = 8

const initializeBots = initializer(TOTAL_BOTS, STARTING_STACK)
const initializeHero = initializer(1, STARTING_STACK)

console.log(initializeBots)

const initialState = {
  deck: [], // Current deck of cards
  totalPlayers: 9, // Players currently connected
  started: false, // Game is not started
  pot: 0, // Chips currently in the pot
  nextStreet: 0, // {0: 'preflop', 1: 'flop', 2: 'turn', 3: 'river'}
  bots: [], // Array of bots
  hero: [], // Array of hero (Using array for consistency)
  communityCards: {flop: {}, turn: {}, river: {}}, // Object of dealt community cards
  winners: null, // We haven't selected a winner yet
  nextToAct: 0, // Player at index 0 starts (TODO)
  showdown: false, // Showdown means the round is over and all remaining players should reveal their hands.
}

export default (state = initialState, action) => {
  const { deck, totalPlayers, nextStreet, bots, communityCards, hero, nextToAct } = state
  switch (action.type) {
    case 'START':
      return {
        ...state,
        bots: initializeBots,
        deck: generateShuffledDeck(),
        hero: initializeHero,
        nextStreet: 1,
        showdown: false,
        started: true,
        winners: null,
      }

    case 'STOP':
      return {
        ...state,
        bots: [],
        communityCards: [],
        started: false,
        winners: null,
      }

    case 'DETERMINE_WINNER':
      return {
        ...state,
        showdown: true,
        winners: winnerDetermination(bots, hero, communityCards, totalPlayers),
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
        ...dealCards(deck, bots, hero, nextStreet, communityCards, totalPlayers)
      }

    case 'DEAL_FLOP':
      return {
        ...state,
        nextStreet: 3,
        ...dealCards(deck, bots, hero, nextStreet, communityCards)
      }

    case 'DEAL_TURN':
      return {
        ...state,
        nextStreet: 4,
        ...dealCards(deck, bots, hero, nextStreet, communityCards)

      }

    case 'DEAL_RIVER':
      return {
        ...state,
        ...dealCards(deck, bots, hero, nextStreet, communityCards),
        nextStreet: 0,
      }

    case 'RESET_CARDS':
      return {
        ...state,
        bots: [],
        communityCards: [],
        deck: [],
        hero: [],
        nextStreet: 1,
        showdown: false,
        winners: null,
      }


    default:
      return state
  }
}
