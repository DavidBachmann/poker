const dealCardsToPlayers = (deck, players) => {

  players.forEach((player) => {
    player.cards = deck.splice(0, 2)
  })

  return {
    deck,
    players
  }
}

const dealFlop = (deck, communityCards) => {
  communityCards.flop = deck.splice(0, 3)
  console.log('dealt flop')
  return {
    deck,
    communityCards
  }
}

const dealTurn = (deck, communityCards) => {
  communityCards.turn = deck.splice(0, 1)

  return {
    deck,
    communityCards
  }
}

const dealRiver = (deck, communityCards) => {
  communityCards.river = deck.splice(0, 1)

  return {
    deck,
    communityCards
  }
}

const dealCards = (deck, players, street, communityCards, totalPlayers) => {
  if (street === 0) {
    console.log('Dealing cards to players')
    return dealCardsToPlayers(deck, players)
  } else if (street === 1) {
    console.log('Dealing flop')
    return dealFlop(deck, communityCards)
  } else if (street === 2) {
    console.log('Dealing turn')
    return dealTurn(deck, communityCards)
  } else if (street === 3) {
    console.log('Dealing river')
    return dealRiver(deck, communityCards)
  }
}

export default dealCards
