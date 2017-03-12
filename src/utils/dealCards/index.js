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

const dealCards = (deck, players, nextStreet, communityCards, totalPlayers) => {
  if (nextStreet === 1) {
    console.log('Dealing cards to players')
    return dealCardsToPlayers(deck, players)
  } else if (nextStreet === 2) {
    console.log('Dealing flop')
    return dealFlop(deck, communityCards)
  } else if (nextStreet === 3) {
    console.log('Dealing turn')
    return dealTurn(deck, communityCards)
  } else if (nextStreet === 4) {
    console.log('Dealing river')
    return dealRiver(deck, communityCards)
  }
}

export default dealCards
