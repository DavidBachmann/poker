import update from 'immutability-helper'

import handlePlayerBets from '../../functions/handlePlayerBets'
import handlePlayerFolds from '../../functions/handlePlayerFolds'
import handlePostBlinds from '../../functions/handlePostBlinds'
import generateShuffledDeck from '../../utils/generateShuffledDeck'
import handleNextPlayerToAct from '../../functions/handleNextPlayerToAct'
import handleSettingHighestCurrentBettor
  from '../../functions/handleSettingHighestCurrentBettor'
import handleDealingCardsToPlayers
  from '../../functions/handleDealingCardsToPlayers'
import handleCalculatingPositions
  from '../../functions/handleCalculatingPositions'
import handleDealingNextStreet from '../../functions/handleDealingNextStreet'
import initialState from '../initialState'

const DEAL_CARDS_TO_PLAYERS = 'DEAL_CARDS_TO_PLAYERS'
const DEAL_NEXT_STREET = 'DEAL_NEXT_STREET'
const GENERATE_NEW_DECK = 'GENERATE_NEW_DECK'
const GET_HIGHEST_CURRENT_BETTOR = 'GET_HIGHEST_CURRENT_BETTOR'
const GET_NEXT_PLAYER_TO_ACT = 'GET_NEXT_PLAYER_TO_ACT'
const PLAYER_BETS = 'PLAYER_BETS'
const PLAYER_FOLDS = 'PLAYER_FOLDS'
const START_NEW_ROUND = 'START_NEW_ROUND'

export function startNewRound() {
  return {
    type: START_NEW_ROUND,
  }
}

export function getNextPlayerToAct() {
  return {
    type: GET_NEXT_PLAYER_TO_ACT,
  }
}

export function getHighestCurrentBettor() {
  return {
    type: GET_HIGHEST_CURRENT_BETTOR,
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

export function playerFolds() {
  return {
    type: PLAYER_FOLDS,
  }
}

export function playerBets(value) {
  return {
    type: PLAYER_BETS,
    value,
  }
}

export function dealNextStreet(currentStreet) {
  return {
    type: DEAL_NEXT_STREET,
    currentStreet,
  }
}

export function testNextPlayerToAct() {
  return dispatch => {
    dispatch(getNextPlayerToAct)
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case PLAYER_BETS: {
      return Object.assign({}, state, {
        players: handlePlayerBets(action.value, state),
      })
    }

    case PLAYER_FOLDS: {
      return Object.assign({}, state, {
        players: handlePlayerFolds(state.players, state.nextPlayerToAct),
      })
    }

    case GET_HIGHEST_CURRENT_BETTOR: {
      return Object.assign({}, state, {
        highestCurrentBettor: handleSettingHighestCurrentBettor(state.players),
      })
    }

    case GET_NEXT_PLAYER_TO_ACT: {
      return Object.assign({}, state, {
        nextPlayerToAct: handleNextPlayerToAct(
          state.players,
          state.nextPlayerToAct,
          state.highestCurrentBettor,
        ),
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

    case DEAL_NEXT_STREET: {
      debugger
      const newState = Object.assign({}, state, {
        communityCards: handleDealingNextStreet(
          action.currentStreet,
          state.communityCards,
          state.deck,
        ),
        nextPlayerToAct: state.positions.button + 1,
      })
      console.log(newState)
      return newState
    }

    case DEAL_CARDS_TO_PLAYERS: {
      return Object.assign({}, state, {
        players: handleDealingCardsToPlayers(state.players, state.deck),
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
