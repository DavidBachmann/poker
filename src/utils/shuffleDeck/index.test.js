import shuffleDeck from './'
import generateShuffledDeck from '../generateShuffledDeck'

test('Shuffle a deck', () => {
  shuffleDeck(generateShuffledDeck())
})

test('Two shuffled decks should both be of length 52', () => {
  const shuffledDeck1 = shuffleDeck(generateShuffledDeck())
  const shuffledDeck2 = shuffleDeck(generateShuffledDeck())

  expect (shuffledDeck1.length && shuffledDeck2.length).toBe(52)
})


test('Two shuffled decks shouldn\'t be identical', () => {
  const shuffledDeck1 = shuffleDeck(generateShuffledDeck())
  const shuffledDeck2 = shuffleDeck(generateShuffledDeck())

  expect (shuffledDeck1 === shuffledDeck2).toBe(false)
})
