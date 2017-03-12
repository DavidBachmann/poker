const dealCardsToPlayers = (deck, bots, hero, totalPlayers) => {

  for (let i = 0; i < totalPlayers; i++) {
    if (i === 0) {
      // First deal for Hero
      hero[0].cards = deck.splice(0, 2)
    } else {
      // Then for bots
      bots[i - 1].cards = deck.splice(0, 2)
    }
  }

  return {
    deck,
    bots,
    hero
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

const dealCards = (deck, bots, hero, nextStreet, communityCards, totalPlayers) => {
  if (nextStreet === 1) {
    console.log('Dealing cards to players')
    return dealCardsToPlayers(deck, bots, hero, totalPlayers)
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
