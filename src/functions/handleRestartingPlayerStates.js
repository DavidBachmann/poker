import update from 'immutability-helper'

/**
 * Handles restarting player states before a new round
 */
export default function handleRestartingPlayerStates(players) {
  return update(players, {
    isAllIn: { $set: false },
  })
}
