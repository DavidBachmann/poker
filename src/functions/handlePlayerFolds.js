import update from 'immutability-helper'

/**
 * Handles player's folding
 */
export default function handlePlayerFolds(players, nextPlayerToAct) {
  return update(players, {
    [nextPlayerToAct]: {
      holeCards: { $set: [] },
      hasFolded: { $set: true },
      hasActed: { $set: true },
    },
  })
}
