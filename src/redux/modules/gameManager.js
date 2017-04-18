import update from 'immutability-helper'
import initialState from '../initialState'

import handlePlayerBets from '../../functions/handlePlayerBets'
import handleGettingNextStreet from '../../functions/handleGettingNextStreet'
import handleDetermingWinner from '../../functions/handleDetermingWinner'
import handlePayingPlayers from '../../functions/handlePayingPlayers'
import handlePlayerFolds from '../../functions/handlePlayerFolds'
import handlePostBlinds from '../../functions/handlePostBlinds'
import generateShuffledDeck from '../../utils/generateShuffledDeck'
import handleNextPlayerToAct from '../../functions/handleNextPlayerToAct'
import handleCollectingPlayerPots
  from '../../functions/handleCollectingPlayerPots'
import handleEmptyingPlayerPots from '../../functions/handleEmptyingPlayerPots'
import handleSettingHighestCurrentBettor
  from '../../functions/handleSettingHighestCurrentBettor'
import handleDealingCardsToPlayers
  from '../../functions/handleDealingCardsToPlayers'
import handleCalculatingPositions
  from '../../functions/handleCalculatingPositions'
import handleDealingNextStreet from '../../functions/handleDealingNextStreet'

const COLLECT_PLAYER_POTS = 'COLLECT_PLAYER_POTS'
const DEAL_CARDS_TO_PLAYERS = 'DEAL_CARDS_TO_PLAYERS'
const DEAL_NEXT_STREET = 'DEAL_NEXT_STREET'
const DETERMINE_WINNER = 'DETERMINE_WINNER'
const EMPTY_PLAYER_POTS = 'EMPTY_PLAYER_POTS'
const GENERATE_NEW_DECK = 'GENERATE_NEW_DECK'
const GET_HIGHEST_CURRENT_BETTOR = 'GET_HIGHEST_CURRENT_BETTOR'
const GET_NEXT_PLAYER_TO_ACT = 'GET_NEXT_PLAYER_TO_ACT'
const GO_TO_SHOWDOWN = 'GO_TO_SHOWDOWN'
const PAY_PLAYERS = 'PAY_PLAYERS'
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

export function collectPlayerPots() {
  return {
    type: COLLECT_PLAYER_POTS,
  }
}

export function emptyPlayerPots() {
  return {
    type: EMPTY_PLAYER_POTS,
  }
}

export function determineWinner() {
  return {
    type: DETERMINE_WINNER,
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

export function goToShowdown() {
  return {
    type: GO_TO_SHOWDOWN,
  }
}

export function payPlayers() {
  return {
    type: PAY_PLAYERS,
  }
}

export function dealNextStreet(street) {
  return {
    type: DEAL_NEXT_STREET,
    street,
  }
}

export function dealNextStreetThunk(street) {
  return (dispatch, getState) => {
    dispatch(collectPlayerPots())
    dispatch(emptyPlayerPots())
    dispatch(dealNextStreet(street))
  }
}

export function playerFoldsThunk() {
  return dispatch => {
    dispatch(playerFolds())
    dispatch(nextPlayerToActThunk())
  }
}

export function playerBetsThunk(amount) {
  return dispatch => {
    dispatch(playerBets(amount))
    dispatch(getHighestCurrentBettor())
    dispatch(nextPlayerToActThunk())
  }
}

export function goToShowdownThunk() {
  return (dispatch, getState) => {
    dispatch(determineWinner())
    const { handWinners } = getState()
    dispatch(payPlayers(handWinners))
  }
}

export function startGameThunk() {
  return dispatch => {
    dispatch(startNewRound())
    dispatch(generateNewDeck())
    dispatch(dealCardsToPlayers())
  }
}

export function nextPlayerToActThunk() {
  return (dispatch, getState) => {
    dispatch(getNextPlayerToAct())
    const { nextPlayerToAct, currentStreet } = getState()
    // No one can act ...
    if (nextPlayerToAct === -1) {
      // ... because we should deal
      if (currentStreet < 3) {
        dispatch(dealNextStreetThunk(handleGettingNextStreet(currentStreet)))
        dispatch(getNextPlayerToAct())
      } else {
        // ... because we should go to showdown
        dispatch(goToShowdownThunk())
      }
    }
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

    case COLLECT_PLAYER_POTS: {
      return Object.assign({}, state, {
        pot: handleCollectingPlayerPots(state.players, state.pot),
      })
    }

    case EMPTY_PLAYER_POTS: {
      return Object.assign({}, state, {
        players: handleEmptyingPlayerPots(state.players),
      })
    }

    case DEAL_NEXT_STREET: {
      return Object.assign({}, state, {
        communityCards: handleDealingNextStreet(
          action.street,
          state.communityCards,
          state.deck,
        ),
        currentStreet: action.street,
      })
    }

    case DEAL_CARDS_TO_PLAYERS: {
      return Object.assign({}, state, {
        players: handleDealingCardsToPlayers(state.players, state.deck),
        deck: update(state.deck, {
          $splice: [[0, state.players.length * 2]],
        }),
      })
    }

    case DETERMINE_WINNER: {
      return Object.assign({}, state, {
        handWinners: handleDetermingWinner(state.players, state.communityCards),
      })
    }

    case PAY_PLAYERS: {
      return Object.assign({}, state, {
        players: handlePayingPlayers(
          state.players,
          state.handWinners,
          state.pot,
        ),
      })
    }

    default: {
      return state
    }
  }
}
