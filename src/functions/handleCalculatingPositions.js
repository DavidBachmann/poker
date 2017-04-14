import update from 'immutability-helper'

export default function handleCalculatingPositions(state) {
  const {players, handHistory, positions} = state
  const totalPlayers = players.length

  const $positions = update(positions, {
    bb: {$set: (handHistory.length + totalPlayers - 1) % totalPlayers},
    sb: {$set: (handHistory.length + totalPlayers - 2) % totalPlayers},
    button: {$set: (handHistory.length + totalPlayers - 3) % totalPlayers},
    cutoff: {$set: (handHistory.length + totalPlayers - 4) % totalPlayers},
    mp: {$set: (handHistory.length + totalPlayers - 5) % totalPlayers},
    utg: {$set: (handHistory.length + totalPlayers - 6) % totalPlayers},
  })

  return {
    state: {
      ...state,
      positions: $positions,
    },
  }
}
