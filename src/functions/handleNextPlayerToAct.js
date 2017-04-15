/**
 * Handle getting the next player capable of acting
 */
export default function handleNextPlayerToAct(state) {
  const {
    players,
    nextPlayerToAct: currentPlayerIndex,
    highestCurrentBettor,
  } = state

  const playerCount = players.length
  const startIndex = (currentPlayerIndex + 1) % playerCount
  const highestCurrentBet =
    highestCurrentBettor && highestCurrentBettor.chipsCurrentlyInvested

  for (
    let index = startIndex;
    index !== currentPlayerIndex;
    index = (index + 1) % playerCount
  ) {
    const player = players[index]
    if (
      !player.hasFolded &&
      !player.isAllIn &&
      player.chipsCurrentlyInvested !== highestCurrentBet
    ) {
      return index
    }
  }

  return -1
}
