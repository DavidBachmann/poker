export default function getAmountTakenFromBlindedPlayers(
  players,
  position,
  blindLevel,
) {
  let amountTaken = 0
  const blindedPlayer = players[position]

  // Pay the blind if the player can afford it
  if (blindedPlayer.chips >= blindLevel) {
    amountTaken = blindLevel
  } else {
    // else pay all his chips
    amountTaken = blindedPlayer.chips
  }

  return amountTaken
}
