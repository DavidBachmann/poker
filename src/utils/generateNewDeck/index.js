import { availableRanks, availableSuits } from '../../variables'

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
  return deck
}

export default generateNewDeck
