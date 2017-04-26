import { availableRanks } from '../generateShuffledDeck/availableRanks'
import { availableSuits } from '../generateShuffledDeck/availableSuits'

const fakeDeck = () => {
  let deck = []
  for (let i = 0; i < availableSuits.length; i++) {
    for (let j = 0; j < availableRanks.length; j++) {
      const card = {
        rank: availableRanks[j],
        suit: availableSuits[i],
      }

      deck.push(card)
    }
  }
  return deck
}

export default fakeDeck
