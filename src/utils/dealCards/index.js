const dealCards = (players, deck) => {
  const MAX_PLAYERS = 9
  const totalPlayers = players.length

  for (let i = 0; i < totalPlayers; i++) {
    players[i] = deck.splice(0, 2)
  }

  if (totalPlayers > MAX_PLAYERS) {
    throw new Error('Max players exceeded!')
  }
}

export default dealCards
