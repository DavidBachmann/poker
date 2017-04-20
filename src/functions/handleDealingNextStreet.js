import update from 'immutability-helper'

/**
 * Handles dealing of community cards
 */
export default function handleDealingNextStreet(street, communityCards, deck) {
  return update(communityCards, {
    [street - 1]: {
      $set: street === 1 ? deck.splice(0, 3) : deck.splice(0, 1),
    },
  })
}
