const getAmountTakenFromBlindedPlayers = (players, position, blindLevel) => {
  let amountTaken = 0
  const blindedPlayer = players[position]

  // Pay the blind if the player can afford it
  if (blindedPlayer.chips >= blindLevel) {
    amountTaken = blindLevel
    blindedPlayer.chips -= blindLevel
  } else {
    // else pay all his chips
    amountTaken = blindedPlayer.chips
    blindedPlayer.chips = 0
  }

  return amountTaken
}

export default getAmountTakenFromBlindedPlayers
