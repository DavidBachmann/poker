import update from 'immutability-helper'

/**
 * Handles player's checking
 */
export default function handlePlayerChecks(players, nextPlayerToAct) {
  return update(players, {
    [nextPlayerToAct]: {

    },
  })
}
