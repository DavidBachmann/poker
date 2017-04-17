/**
 * Handles taking chips from player's chipsCurrentlyInvested
 * and putting them in the pot
 */
export default function handlePuttingChipsInPot(state) {
  const { players, pot } = state
  const amountOfChipsToTransfer = players.reduce(
    (acc, player) => player.chipsCurrentlyInvested + acc,
    0,
  )
  // Empty chipsCurrentlyInvested
  players.map(player => player.chipsCurrentlyInvested = 0)
  return {
    ...state,
    pot: pot + amountOfChipsToTransfer,
  }
}
