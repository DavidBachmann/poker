export default function handleCalculatingPositions(
  players,
  handHistory,
  positions,
) {
  const totalPlayers = players.length

  // Todo doesn't work with fewer players
  const newPositions = {
    bb: (handHistory.length + totalPlayers - 1) % totalPlayers,
    sb: (handHistory.length + totalPlayers - 2) % totalPlayers,
    button: (handHistory.length + totalPlayers - 3) % totalPlayers,
    cutoff: (handHistory.length + totalPlayers - 4) % totalPlayers,
    mp: (handHistory.length + totalPlayers - 5) % totalPlayers,
    utg: (handHistory.length + totalPlayers - 6) % totalPlayers,
  }

  return newPositions
}
