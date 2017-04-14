import update from 'immutability-helper'

import handlePlayerBets from '../../functions/handlePlayerBets'
import handleStartRound from '../../functions/handleStartRound'
import initialState from '../initialState'

const PLAYER_BETS = 'PLAYER_BETS'
const PAY_BLINDS = 'PAY_BLINDS' // valid action?!
const START_NEW_ROUND = 'START_NEW_ROUND'

export function startNewRound() {
  return {
    type: START_NEW_ROUND,
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
        positions: handleStartRound(state),
      })
    }

    default: {
      return state
    }
  }
}
