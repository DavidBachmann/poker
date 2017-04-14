import __DEBUG__ from '../utils/__DEBUG__'

/**
 * Handles player's betting (bet, raise, push)
 * Takes in state and amountRequested
 * Returns new state
 */

export default function handlePlayerBets(state, amountRequested) {
  console.log('handlePlayerBets got state = ')
  console.log(state)
  console.log('and amount requested = ')
  console.log(amountRequested)

  let newHighestCurrentBet = null
  let newHighestCurrentBettor = null

  const {
    players,
    nextPlayerToAct,
    levels,
    currentLevel,
    highestCurrentBet,
    highestCurrentBettor,
  } = state
  const currentPlayer = players[nextPlayerToAct]

  const chipsCurrentlyInvested = currentPlayer.chipsCurrentlyInvested
  // If the player is betting more than he can afford
  // we put him all in and bet his whole stack
  // else we'll honor the requested amount.
  const amountOfChipsToBet = amountRequested <= currentPlayer.chips
    ? amountRequested
    : currentPlayer.chips
  if (amountRequested >= currentPlayer.chips) {
    currentPlayer.isAllIn = true
  }
  // Check if the player is betting the mininum required
  // By default that's 2xBB
  const defaultMinAmount = levels[currentLevel].bigBlind * 2
  // Unless someone has bet higher
  // If we have chipsCurrentlyInvested, we don't have to pay that amount again to call or raise the current bet.
  const actualMinAmount = highestCurrentBet > defaultMinAmount
    ? highestCurrentBet - chipsCurrentlyInvested
    : defaultMinAmount

  // The bet has to be higher than the mininum allowed
  if (amountOfChipsToBet >= actualMinAmount) {
    // Remove the amount requested from the player,
    currentPlayer.chips -= amountOfChipsToBet
    // and then put into chipsCurrentlyInvested
    currentPlayer.chipsCurrentlyInvested += amountOfChipsToBet
    if (amountOfChipsToBet > highestCurrentBet) {
      newHighestCurrentBet = amountOfChipsToBet
      newHighestCurrentBettor = currentPlayer
      __DEBUG__(`New highest current bettor is ${newHighestCurrentBettor.name}`)
    }
    const _highestCurrentBettor = newHighestCurrentBettor
      ? newHighestCurrentBettor
      : highestCurrentBettor
    return state // todo
  } else {
    __DEBUG__(
      `${currentPlayer.name} bets illegal amount: ${amountRequested}. Minimum bet is ${actualMinAmount}`,
    )
  }

  // this.setState(this.returnNextPlayerToAct)
}
