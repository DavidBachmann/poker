import winnerDetermination from '../utils/winnerDetermination'
import dealCards from '../utils/dealCards'
import initializer from '../utils/initializer'
import generateShuffledDeck from '../utils/generateShuffledDeck'
import { concat } from 'lodash'

const STARTING_STACK = 1500
const TOTAL_BOTS = 8

const bots = initializer(TOTAL_BOTS, STARTING_STACK)
const hero = initializer(1, STARTING_STACK)

const initialState = {
  communityCards: {}, // Object of dealt community cards
  currentLevel: 1, // Starting level
  deck: [], // Current deck of cards
  level: { // Temp levels (TODO)
    1: { smallBlind: 25, bigBlind: 50 },
    2: { smallBlind: 50, bigBlind: 100 },
    3: { smallBlind: 150, bigBlind: 300 },
    4: { smallBlind: 300, bigBlind: 600 },
    5: { smallBlind: 600, bigBlind: 1200 },
  },
  nextStreet: 0, // {0: 'preflop', 1: 'flop', 2: 'turn', 3: 'river'} (TODO)
  nextToAct: 0, // Player at index 0 starts (TODO)
  players: [],
  pot: 0, // Chips currently in the pot
  showdown: false, // Showdown means the round is over and all remaining players should reveal their hands.
  started: false, // Game is not started
  totalPlayers: 9, // Players currently connected
  winners: null, // We haven't selected a winner yet
}

export default (state = initialState, action) => {
  const {
    communityCards,
    currentLevel,
    deck,
    level,
    nextStreet,
    nextToAct,
    players,
    pot,
    totalPlayers,
  } = state

  switch (action.type) {
    case 'START':
      return {
        ...state,
        players: concat(hero, bots),
        deck: generateShuffledDeck(),
        communityCards: {flop: {}, turn: {}, river: {}},
        nextStreet: 1,
        showdown: false,
        started: true,
        winners: null,
      }

    case 'KILL':
      return {
        ...state,
        players: [],
        communityCards: [],
        started: false,
        winners: null,
      }

    case 'DETERMINE_WINNER':
      return {
        ...state,
        showdown: true,
        winners: winnerDetermination(players, communityCards, totalPlayers),
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
        ...dealCards(deck, players, nextStreet, communityCards, totalPlayers)
      }

    case 'DEAL_FLOP':
      return {
        ...state,
        nextStreet: 3,
        ...dealCards(deck, players, nextStreet, communityCards)
      }

    case 'DEAL_TURN':
      return {
        ...state,
        nextStreet: 4,
        ...dealCards(deck, players, nextStreet, communityCards)

      }

    case 'DEAL_RIVER':
      return {
        ...state,
        ...dealCards(deck, players, nextStreet, communityCards),
        nextStreet: 0,
      }

    case 'NEXT_LEVEL':
      return {
        ...state,
        currentLevel: currentLevel + 1,
      }

    case 'POST_BLINDS': {
      const bbPosition = (nextToAct + totalPlayers - 1) % totalPlayers
      const sbPosition = (nextToAct + totalPlayers - 2) % totalPlayers
      const { smallBlind, bigBlind } = level[currentLevel]

      // Remove chips from relevant players
      players[bbPosition].chips -= bigBlind
      players[sbPosition].chips -= smallBlind

      return {
        ...state,
        pot: pot + smallBlind + bigBlind,
        players,
      }
    }

    default:
      return state
  }
}
