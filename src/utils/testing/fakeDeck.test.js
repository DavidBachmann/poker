import fakeDeck from './fakeDeck'
import { fakeDeckShouldBe } from './fakeDeckShouldBe'

test('Unshuffled deck', () => {
  expect(fakeDeck()).toEqual(fakeDeckShouldBe)
})
