import update from 'immutability-helper'
import getAmountTakenFromBlindedPlayers from './getAmountTakenFromBlindedPlayers'

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

  const $players = update(players, {
    [smallBlindPosition]: {
      chipsCurrentlyInvested: {
        $set: amountTakenFromSmallBlindPlayer,
      },
      chips: {
        $apply: x => x - amountTakenFromSmallBlindPlayer,
      },
    },
    [bigBlindPosition]: {
      chipsCurrentlyInvested: {
        $set: amountTakenFromBigBlindPlayer,
      },
      chips: {
        $apply: x => x - amountTakenFromBigBlindPlayer,
      },
    },
  })

  return $players
}
