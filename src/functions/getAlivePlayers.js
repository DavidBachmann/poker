export default function getAlivePlayers(players) {
  return players.filter(player => !player.hasFolded)
}
