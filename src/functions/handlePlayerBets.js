import __DEBUG__ from '../utils/__DEBUG__'
import update from 'immutability-helper'

/**
 * Handles player's betting (bet, raise, push)
 * Takes in state and amountRequested
 * Returns new state
 */

export default function handlePlayerBets(amountRequested, state) {
  console.log('handlePlayerBets got state = ')
  console.log(state)
  console.log('and amount requested = ')
  console.log(amountRequested)

  const {
    players,
    nextPlayerToAct,
    levels,
    currentLevel,
    highestCurrentBettor,
  } = state

  // Values we'll be changing and returning
  let $chips = players[nextPlayerToAct].chips
  let $isAllIn = players[nextPlayerToAct].isAllIn
  let $chipsCurrentlyInvested = players[nextPlayerToAct].chipsCurrentlyInvested
  let $highestCurrentBettor = highestCurrentBettor

  // If the player is betting more than he can afford
  // we put him all in and bet his whole stack
  // else we'll honor the requested amount.
  const amountOfChipsToBet = amountRequested <= players[nextPlayerToAct].chips
    ? amountRequested
    : players[nextPlayerToAct].chips
  if (amountRequested >= players[nextPlayerToAct].chips) {
    $isAllIn = true
  }

  // Check what the highest current bet is
  const highestCurrentBet = highestCurrentBettor
    ? highestCurrentBettor.chipsCurrentlyInvested
    : 0

  // Check if the player is betting the mininum required
  // By default that's 2xBB
  const defaultMinAmount = levels[currentLevel].bigBlind * 2
  // Unless someone has bet higher
  // If we have chipsCurrentlyInvested, we don't have to pay that amount again to call or raise the current bet.
  const actualMinAmount = highestCurrentBet > defaultMinAmount
    ? highestCurrentBet - players[nextPlayerToAct].chipsCurrentlyInvested
    : defaultMinAmount

  // The bet has to be higher than the mininum allowed
  if (amountOfChipsToBet >= actualMinAmount) {
    // Remove the amount requested from the player,
    $chips -= amountOfChipsToBet
    // and then put into chipsCurrentlyInvested
    $chipsCurrentlyInvested += amountOfChipsToBet

    if (amountOfChipsToBet > highestCurrentBet) {
      $highestCurrentBettor = players[nextPlayerToAct]
      __DEBUG__(`New highest current bettor is ${$highestCurrentBettor.name}`)
    }
  }

  return update(players, {
    [nextPlayerToAct]: {
      chips: { $set: $chips },
      isAllIn: { $set: $isAllIn },
      chipsCurrentlyInvested: { $set: $chipsCurrentlyInvested },
    },
  })
}
