import update from 'immutability-helper'

/**
 * Handles dealing of community cards
 */
export default function handleDealingNextStreet(
  currentStreet,
  communityCards,
  deck,
) {
  console.log('current street is ' + currentStreet)
  return update(communityCards, {
    [currentStreet]: {
      $set: currentStreet === 1 ? deck.splice(0, 3) : deck.splice(0, 1),
    },
  })
}
