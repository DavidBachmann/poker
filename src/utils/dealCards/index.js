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

const dealCards = (deck, players, street, communityCards) => {
  if (street === 0) {
    return dealCardsToPlayers(deck, players)
  } else if (street === 1) {
    return dealFlop(deck, communityCards)
  } else if (street === 2) {
    return dealTurn(deck, communityCards)
  } else if (street === 3) {
    return dealRiver(deck, communityCards)
  }
}

export default dealCards
