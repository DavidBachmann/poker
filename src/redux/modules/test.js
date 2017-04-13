const PLAYER_BETS = 'PLAYER_BETS'

export function playerBets(value) {
  return {
    type: PLAYER_BETS,
    value,
  }
}

export default function reducer(state = {}, action) {
  switch (action.type) {
    case PLAYER_BETS: {
      console.log('player bet', action.value)
      return {
        state
      }
    }

    default: {
      return state
    }
  }
}
