import determineWinner from './'
import generateNewDeck from '../generateNewDeck'
import shuffleDeck from '../shuffleDeck'

test('Determine winner with 2 players', () => {
  let players = []
  let communityCards = []

  const totalPlayers = 2
  const totalCommunityCards = 5
  const shuffledDeck = shuffleDeck(generateNewDeck())

  for (let i = 0; i < totalPlayers; i++) {
    players[i] = shuffledDeck.splice(0, 2)
  }

  for (let i = 0; i < totalCommunityCards; i++) {
    communityCards = shuffledDeck.splice(0, 5)
  }

  console.log(determineWinner(players, communityCards))
})

test('Determine winner with 3 players', () => {
  let players = []
  let communityCards = []

  const totalPlayers = 3
  const totalCommunityCards = 5
  const shuffledDeck = shuffleDeck(generateNewDeck())

  for (let i = 0; i < totalPlayers; i++) {
    players[i] = shuffledDeck.splice(0, 2)
  }

  for (let i = 0; i < totalCommunityCards; i++) {
    communityCards = shuffledDeck.splice(0, 5)
  }

})
