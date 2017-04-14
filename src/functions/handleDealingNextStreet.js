import update from 'immutability-helper'

/**
 * Handles dealing community cards
 */
export default function handleDealingNextStreet(
  currentStreet,
  communityCards,
  deck,
) {
  return update(communityCards, {
    [currentStreet]: {
      $set: currentStreet === 0 ? deck.splice(0, 3) : deck.splice(0, 1),
    },
  })
}
