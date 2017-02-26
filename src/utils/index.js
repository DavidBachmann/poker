import { availableRanks, availableSuits } from '../variables'

export const shuffleDeck = (array) => {
  let rnd, temp

  for (var i = array.length - 1; i; i--) {
    rnd = Math.random() * i | 0
    temp = array[i]
    array[i] = array[rnd]
    array[rnd] = temp
  }

  return array
}

export const generateDeck = () => {
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
