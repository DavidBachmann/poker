const shuffleDeck = deck => {
  let rnd, temp

  for (var i = deck.length - 1; i; i--) {
    rnd = (Math.random() * i) | 0
    temp = deck[i]
    deck[i] = deck[rnd]
    deck[rnd] = temp
  }

  return deck
}

export default shuffleDeck
