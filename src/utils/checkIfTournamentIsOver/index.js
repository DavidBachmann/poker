const checkIfTournamentIsOver = (players) => {
  if (players.length > 1) {
    return null
  }

  return players[0].id
}

export default checkIfTournamentIsOver
