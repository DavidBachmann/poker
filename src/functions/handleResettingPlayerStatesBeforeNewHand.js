import update from 'immutability-helper'

/**
 * Handles resetting player states before a new hand
 */
export default function handleResettingPlayerStatesBeforeNewHand(players) {
  players.forEach(player => {
    return update(player, {
      isAllIn: { $set: false },
      hasActed: { $set: false },
      hasFolded: { $set: false },
    })
  })

  return players
}
