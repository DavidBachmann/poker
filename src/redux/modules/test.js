import handlePlayerBets from '../../functions/handlePlayerBets'
import initialState from '../initialState'

const PLAYER_BETS = 'PLAYER_BETS'

export function playerBets(value) {
  return {
    type: PLAYER_BETS,
    value,
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case PLAYER_BETS: {
      return {
        state: handlePlayerBets(state, action.value),
      }
    }

    default: {
      return state
    }
  }
}
