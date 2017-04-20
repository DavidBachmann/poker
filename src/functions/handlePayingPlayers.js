export default function handlePayingPlayers(players, handWinners, pot) {
  const totalWinners = handWinners.length
  const amountWon = pot / totalWinners
  let indexes = []

  handWinners.forEach(winner => {
    indexes.push(players.findIndex(x => x.id === winner.id))
  })

  indexes.map(index => {
    return (players[index].chips += amountWon)
  })

  return players
}
