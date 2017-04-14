import getAmountTakenFromBlindedPlayers
  from './getAmountTakenFromBlindedPlayers'

/**
 * Handles collecting blinds from players
 * Collected blinds go to player's chipsCurrentlyInvested
 * If the round continues the chips will be transferred to the pot via handlePuttingChipsInPot
 */
export default function handlePostBlinds(state) {
  const { levels, currentLevel, nextPlayerToAct, players } = state
  const totalPlayers = players.length
  const bigBlindPosition = (nextPlayerToAct + totalPlayers - 1) % totalPlayers
  const smallBlindPosition = (nextPlayerToAct + totalPlayers - 2) % totalPlayers
  const { smallBlind, bigBlind } = levels[currentLevel]

  const amountTakenFromSmallBlindPlayer = getAmountTakenFromBlindedPlayers(
    players,
    smallBlindPosition,
    smallBlind,
  )
  const amountTakenFromBigBlindPlayer = getAmountTakenFromBlindedPlayers(
    players,
    bigBlindPosition,
    bigBlind,
  )

  players[
    smallBlindPosition
  ].chipsCurrentlyInvested = amountTakenFromSmallBlindPlayer
  players[
    bigBlindPosition
  ].chipsCurrentlyInvested = amountTakenFromBigBlindPlayer

  return {
    ...state,
    players,
  }
}
