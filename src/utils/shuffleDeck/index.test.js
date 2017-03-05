import shuffleDeck from './'
import generateNewDeck from '../generateNewDeck'

test('Shuffle a deck', () => {
  shuffleDeck(generateNewDeck())
})

test('Two shuffled decks should both be of length 52', () => {
  const shuffledDeck1 = shuffleDeck(generateNewDeck())
  const shuffledDeck2 = shuffleDeck(generateNewDeck())

  expect (shuffledDeck1.length && shuffledDeck2.length).toBe(52)
})


test('Two shuffled decks shouldn\'t be identical', () => {
  const shuffledDeck1 = shuffleDeck(generateNewDeck())
  const shuffledDeck2 = shuffleDeck(generateNewDeck())

  expect (shuffledDeck1 === shuffledDeck2).toBe(false)
})
