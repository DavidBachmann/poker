import update from 'immutability-helper'

/**
 * Handles dealing of community cards
 */
export default function handleDealingNextStreet(
  currentStreet,
  communityCards,
  deck,
) {
  return update(communityCards, {
    [currentStreet - 1]: {
      $set: currentStreet === 1 ? deck.splice(0, 3) : deck.splice(0, 1),
    },
  })
}
