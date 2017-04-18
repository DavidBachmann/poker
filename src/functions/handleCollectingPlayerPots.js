/**
 * Handles collecting player pots into the pot
 */
export default function handleCollectingPlayerPots(players, pot) {
  const amountsFromPlayerPots = players.reduce(
    (acc, player) => player.chipsCurrentlyInvested + acc,
    0,
  )

  return amountsFromPlayerPots + pot
}
