import { availableRanks } from './availableRanks'
import { availableSuits } from './availableSuits'
import shuffleDeck from '../../utils/shuffleDeck'

const generateNewDeck = () => {
  let deck = []
  for (let i = 0; i < availableSuits.length; i++) {
    for (let j = 0; j < availableRanks.length; j++) {
      const card = {
        rank: availableRanks[j],
        suit: availableSuits[i]
      }

      deck.push(card)
    }
  }
  return shuffleDeck(deck)
}

export default generateNewDeck
