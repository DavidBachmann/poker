import { round } from 'lodash'

export const payPlayer = (player, amount) => {
  const currentPlayerChips = player.chips
  player.chips = round(currentPlayerChips + amount)

  return player
}

// unused until I refactor
export const takeChipsFromPlayer = (player, amount) => {
  const currentPlayerChips = player.chips
  player.chips = round(currentPlayerChips - amount)

  return player
}
