import update from 'immutability-helper'
import initialState from '../initialState'

import delay from '../../utils/delay'
import handlePlayerBets from '../../functions/handlePlayerBets'
import handleResettingPlayerStates
  from '../../functions/handleResettingPlayerStates'
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
const SET_NEXT_PLAYER_TO_ACT = 'SET_NEXT_PLAYER_TO_ACT'
const PAY_PLAYERS = 'PAY_PLAYERS'
const PLAYER_BETS = 'PLAYER_BETS'
const ADD_TO_HAND_HISTORY = 'ADD_TO_HAND_HISTORY'
const PLAYER_FOLDS = 'PLAYER_FOLDS'
const START_NEW_ROUND = 'START_NEW_ROUND'
const RESTART_PLAYER_STATES = 'RESTART_PLAYER_STATES'

function startNewRound() {
  return {
    type: START_NEW_ROUND,
  }
}

function getNextPlayerToAct() {
  return {
    type: GET_NEXT_PLAYER_TO_ACT,
  }
}

function setNextPlayerToAct() {
  return {
    type: SET_NEXT_PLAYER_TO_ACT,
  }
}

function getHighestCurrentBettor() {
  return {
    type: GET_HIGHEST_CURRENT_BETTOR,
  }
}

function generateNewDeck() {
  return {
    type: GENERATE_NEW_DECK,
  }
}

function collectPlayerPots() {
  return {
    type: COLLECT_PLAYER_POTS,
  }
}

function emptyPlayerPots() {
  return {
    type: EMPTY_PLAYER_POTS,
  }
}

function determineWinner() {
  return {
    type: DETERMINE_WINNER,
  }
}

function dealCardsToPlayers() {
  return {
    type: DEAL_CARDS_TO_PLAYERS,
  }
}

function playerFolds() {
  return {
    type: PLAYER_FOLDS,
  }
}

function playerBets(value) {
  return {
    type: PLAYER_BETS,
    value,
  }
}

function payPlayers() {
  return {
    type: PAY_PLAYERS,
  }
}

function addToHandHistory() {
  return {
    type: ADD_TO_HAND_HISTORY,
  }
}

function dealNextStreet(nextStreet) {
  return {
    type: DEAL_NEXT_STREET,
    nextStreet,
  }
}

function restartPlayerStates() {
  return {
    type: RESTART_PLAYER_STATES,
  }
}

function dealNextStreetThunk(street, runToEnd) {
  return async (dispatch, getState) => {
    dispatch(collectPlayerPots())
    dispatch(emptyPlayerPots())
    if (runToEnd) {
      for (let i = street; i <= 3; i++) {
        dispatch(dealNextStreet(i))
        await delay(750)
        if (i === 3) {
          dispatch(goToShowdownThunk())
        }
      }
    } else {
      dispatch(dealNextStreet(street))
    }
  }
}

export function playerFoldsThunk() {
  return dispatch => {
    dispatch(playerFolds())
    dispatch(getNextPlayerToActThunk())
  }
}

export function playerBetsThunk(amount) {
  return dispatch => {
    dispatch(playerBets(amount))
    dispatch(getHighestCurrentBettor())
    dispatch(getNextPlayerToActThunk())
  }
}

function goToShowdownThunk() {
  return async (dispatch, getState) => {
    const { handWinners } = getState()
    dispatch(determineWinner())
    dispatch(collectPlayerPots())
    dispatch(emptyPlayerPots())
    dispatch(payPlayers(handWinners))
    dispatch(addToHandHistory())
    await delay(2500)
    dispatch(restartRoundThunk())
  }
}

export function startGameThunk() {
  return dispatch => {
    dispatch(startNewRound())
    dispatch(generateNewDeck())
    dispatch(dealCardsToPlayers())
  }
}

function restartRoundThunk() {
  return dispatch => {
    dispatch(restartPlayerStates())
    dispatch(startNewRound())
    dispatch(generateNewDeck())
    dispatch(dealCardsToPlayers())
    dispatch(setNextPlayerToAct())
  }
}

function getNextPlayerToActThunk() {
  return (dispatch, getState) => {
    dispatch(getNextPlayerToAct())
    const { nextPlayerToAct, currentStreet, players } = getState()
    // No one can act ...
    if (nextPlayerToAct === -1) {
      if (currentStreet < 3) {
        // ... because every one is all-in?
        if (
          players.filter(player => !player.isAllIn && !player.hasFolded)
            .length === 0
        ) {
          dispatch(
            dealNextStreetThunk(handleGettingNextStreet(currentStreet), true),
          )
        } else {
          // ... because we should deal
          dispatch(dealNextStreetThunk(handleGettingNextStreet(currentStreet)))
          dispatch(getNextPlayerToAct())
        }
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

    case SET_NEXT_PLAYER_TO_ACT: {
      return Object.assign({}, state, {
        // Todo: won't work with fewer players.
        nextPlayerToAct: state.positions.utg,
      })
    }

    case RESTART_PLAYER_STATES: {
      return Object.assign({}, state, {
        players: handleResettingPlayerStates(state.players),
      })
    }

    case START_NEW_ROUND: {
      return Object.assign({}, state, {
        communityCards: {},
        handWinners: [],
        pot: 0,
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
          action.nextStreet,
          state.communityCards,
          state.deck,
        ),
        currentStreet: action.nextStreet,
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

    case ADD_TO_HAND_HISTORY: {
      return Object.assign({}, state, {
        handHistory: [...state.handHistory, state.handWinners],
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
