import update from 'immutability-helper'

export default function handleDealingCardsToPlayers(players, deck) {
  const _deck = deck
  return players.map(function(player) {
    return update(player, {
      holeCards: {
        $set: _deck.splice(0, 2),
      },
    })
  })
}
