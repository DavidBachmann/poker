import update from 'immutability-helper'
import initialState from '../initialState'

import delay from '../../utils/delay'
import generateShuffledDeck from '../../utils/generateShuffledDeck'
import getAlivePlayers from '../../functions/getAlivePlayers'
import handleCalculatingPositions from '../../functions/handleCalculatingPositions'
import handleCollectingPlayerPots from '../../functions/handleCollectingPlayerPots'
import handleDealingCardsToPlayers from '../../functions/handleDealingCardsToPlayers'
import handleDealingNextStreet from '../../functions/handleDealingNextStreet'
import handleDetermingWinner from '../../functions/handleDetermingWinner'
import handlePlayerChecks from '../../functions/handlePlayerChecks'
import handleEmptyingPlayerPots from '../../functions/handleEmptyingPlayerPots'
import handleGettingNextStreet from '../../functions/handleGettingNextStreet'
import handleNextPlayerToAct from '../../functions/handleNextPlayerToAct'
import handlePayingPlayers from '../../functions/handlePayingPlayers'
import handlePlayerBets from '../../functions/handlePlayerBets'
import handlePlayerFolds from '../../functions/handlePlayerFolds'
import handlePostBlinds from '../../functions/handlePostBlinds'
import handleRemovingBustedPlayers from '../../functions/handleRemovingBustedPlayers'
import handleResettingPlayerStatesBeforeNewHand
  from '../../functions/handleResettingPlayerStatesBeforeNewHand'
import handleResettingPlayerStatesBeforeNewBettingRound
  from '../../functions/handleResettingPlayerStatesBeforeNewBettingRound'
import handleSettingHighestCurrentBettor from '../../functions/handleSettingHighestCurrentBettor'

export const ADD_TO_HAND_HISTORY = 'ADD_TO_HAND_HISTORY'
export const COLLECT_PLAYER_POTS = 'COLLECT_PLAYER_POTS'
export const DEAL_CARDS_TO_PLAYERS = 'DEAL_CARDS_TO_PLAYERS'
export const DEAL_NEXT_STREET = 'DEAL_NEXT_STREET'
export const DETERMINE_WINNER = 'DETERMINE_WINNER'
export const EMPTY_PLAYER_POTS = 'EMPTY_PLAYER_POTS'
export const GENERATE_NEW_DECK = 'GENERATE_NEW_DECK'
export const GET_HIGHEST_CURRENT_BETTOR = 'GET_HIGHEST_CURRENT_BETTOR'
export const GET_NEXT_PLAYER_TO_ACT = 'GET_NEXT_PLAYER_TO_ACT'
export const PAY_PLAYERS = 'PAY_PLAYERS'
export const PLAYER_BETS = 'PLAYER_BETS'
export const PLAYER_CHECKS = 'PLAYER_CHECKS'
export const PLAYER_FOLDS = 'PLAYER_FOLDS'
export const REMOVE_BUSTED_PLAYERS = 'REMOVE_BUSTED_PLAYERS'
export const RESET_HIGHEST_CURRENT_BETTOR = 'RESET_HIGHEST_CURRENT_BETTOR'
export const RESTART_PLAYER_STATES_BEFORE_NEW_HAND = 'RESTART_PLAYER_STATES_BEFORE_NEW_HAND'
export const RESTART_PLAYER_STATES_BEFORE_NEW_BETTING_ROUND =
  'RESTART_PLAYER_STATES_BEFORE_NEW_BETTING_ROUND'
export const START_NEW_ROUND = 'START_NEW_ROUND'

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

function resetHighestCurrentBettor() {
  return {
    type: RESET_HIGHEST_CURRENT_BETTOR,
  }
}

function playerFolds() {
  return {
    type: PLAYER_FOLDS,
  }
}

function playerChecks() {
  return {
    type: PLAYER_CHECKS,
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

function removeBustedPlayers() {
  return {
    type: REMOVE_BUSTED_PLAYERS,
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

function restartPlayerStatesBeforeNewHand() {
  return {
    type: RESTART_PLAYER_STATES_BEFORE_NEW_HAND,
  }
}

function dealNextStreetThunk(currentStreet, runToEnd) {
  console.log('dealing street')
  return async (dispatch, getState) => {
    await dispatch(collectPlayerPots())
    await dispatch(emptyPlayerPots())
    await dispatch(resetHighestCurrentBettor())
    if (runToEnd) {
      for (let i = currentStreet; i <= 3; i++) {
        await dispatch(dealNextStreet(i))
        await delay(750)
        if (i === 3) {
          await dispatch(goToShowdownThunk())
        }
      }
    } else {
      await dispatch(dealNextStreet(currentStreet))
    }
  }
}

export function playerFoldsThunk() {
  return async (dispatch, getState) => {
    dispatch(playerFolds())
    // Get players after current player has folded
    const { players } = getState()
    const alivePlayers = getAlivePlayers(players)
    // If this player was the last to fold then end the round
    if (alivePlayers.length === 1) {
      await dispatch(goToShowdownThunk())
    } else {
      await dispatch(getNextPlayerToActThunk())
    }
  }
}

export function playerBetsThunk(amount) {
  return async dispatch => {
    await dispatch(playerBets(amount))
    await dispatch(getHighestCurrentBettor())
    await dispatch(getNextPlayerToActThunk())
  }
}

export function playerChecksThunk() {
  return async dispatch => {
    await dispatch(playerChecks())
    await dispatch(getNextPlayerToActThunk())
  }
}

function goToShowdownThunk() {
  return async (dispatch, getState) => {
    await dispatch(determineWinner())
    await dispatch(collectPlayerPots())
    await dispatch(emptyPlayerPots())
    await dispatch(payPlayers(getState().handWinners))
    await dispatch(addToHandHistory())
    await delay(2500)
    await dispatch(restartRoundThunk())
  }
}

export function startGameThunk() {
  return async dispatch => {
    await dispatch(startNewRound())
    await dispatch(generateNewDeck())
    await dispatch(dealCardsToPlayers())
    await dispatch(getHighestCurrentBettor())
  }
}

function restartRoundThunk() {
  return async dispatch => {
    await dispatch(restartPlayerStatesBeforeNewHand())
    await dispatch(removeBustedPlayers())
    await dispatch(startNewRound())
    await dispatch(generateNewDeck())
    await dispatch(dealCardsToPlayers())
  }
}

function getNextPlayerToActThunk() {
  return async (dispatch, getState) => {
    dispatch(getNextPlayerToAct())
    const { nextPlayerToAct, currentStreet, players } = getState()
    // No one can act ...
    if (nextPlayerToAct === -1) {
      if (currentStreet < 3) {
        // ... because every one is all-in?
        if (players.filter(player => !player.isAllIn && !player.hasFolded).length === 0) {
          await dispatch(dealNextStreetThunk(handleGettingNextStreet(currentStreet), true))
        } else {
          // ... because we should deal
          await dispatch(dealNextStreetThunk(handleGettingNextStreet(currentStreet)))
          await dispatch(getNextPlayerToAct())
        }
      } else {
        // ... because we should go to showdown
        await dispatch(goToShowdownThunk())
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

    case PLAYER_CHECKS: {
      return Object.assign({}, state, {
        players: handlePlayerChecks(state.players),
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
          state.handHistory,
        ),
      })
    }

    case RESTART_PLAYER_STATES_BEFORE_NEW_HAND: {
      return Object.assign({}, state, {
        players: handleResettingPlayerStatesBeforeNewHand(state.players),
      })
    }

    case START_NEW_ROUND: {
      const positions = handleCalculatingPositions(
        state.players,
        state.handHistory,
        state.positions,
      )
      return Object.assign({}, state, {
        communityCards: {},
        handWinners: [],
        highestCurrentBettor: null,
        pot: 0,
        positions,
        nextPlayerToAct: positions.utg,
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
        players: handleResettingPlayerStatesBeforeNewBettingRound(state.players),
        highestCurrentBettor: null,
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
      console.log('DETERMINE_WINNER called')
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
        players: handlePayingPlayers(state.players, state.handWinners, state.pot),
      })
    }

    case REMOVE_BUSTED_PLAYERS: {
      return Object.assign({}, state, {
        players: handleRemovingBustedPlayers(state.players),
      })
    }

    default: {
      return state
    }
  }
}
