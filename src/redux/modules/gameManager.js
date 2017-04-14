import update from 'immutability-helper'

import handlePlayerBets from '../../functions/handlePlayerBets'
import handlePostBlinds from '../../functions/handlePostBlinds'
import generateShuffledDeck from '../../utils/generateShuffledDeck'

import handleDealingCardsToPlayers
  from '../../functions/handleDealingCardsToPlayers'
import handleCalculatingPositions
  from '../../functions/handleCalculatingPositions'
import initialState from '../initialState'

const PLAYER_BETS = 'PLAYER_BETS'
const GENERATE_NEW_DECK = 'GENERATE_NEW_DECK'
const PAY_BLINDS = 'PAY_BLINDS' // valid action?!
const DEAL_CARDS_TO_PLAYERS = 'DEAL_CARDS_TO_PLAYERS'
const START_NEW_ROUND = 'START_NEW_ROUND'

export function startNewRound() {
  return {
    type: START_NEW_ROUND,
  }
}

export function generateNewDeck() {
  return {
    type: GENERATE_NEW_DECK,
  }
}

export function dealCardsToPlayers() {
  return {
    type: DEAL_CARDS_TO_PLAYERS,
  }
}

export function playerBets(value) {
  return {
    type: PLAYER_BETS,
    value,
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case PLAYER_BETS: {
      return Object.assign({}, state, {
        state: handlePlayerBets(state),
      })
    }
    case START_NEW_ROUND: {
      return Object.assign({}, state, {
        positions: handleCalculatingPositions(
          state.players,
          state.handHistory,
          state.positions,
        ),
        players: handlePostBlinds(state),
      })
    }

    case GENERATE_NEW_DECK: {
      return Object.assign({}, state, {
        deck: generateShuffledDeck(),
      })
    }

    case DEAL_CARDS_TO_PLAYERS: {
      return Object.assign({}, state, {
        players: handleDealingCardsToPlayers(state),
        deck: update(state.deck, {
          $splice: [[0, state.players.length * 2]],
        }),
      })
    }

    default: {
      return state
    }
  }
}
