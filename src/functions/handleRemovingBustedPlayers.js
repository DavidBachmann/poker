export default function handleRemovingBustedPlayers(players) {
  const alivePlayers = players.filter(player => player.chips > 0)

  return alivePlayers
}
