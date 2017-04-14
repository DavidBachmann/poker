import update from 'immutability-helper'

export default function handleDealingCardsToPlayers(state) {
  const { players, deck } = state

  return players.map(function(player) {
    return update(player, {
      holeCards: {
        $set: deck.splice(0, 2),
      },
    })
  })
}
