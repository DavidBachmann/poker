import { round } from 'lodash'

const payPlayer = (player, amount) => {
  const currentPlayerChips = player.chips
  player.chips = round(currentPlayerChips + amount)

  return player
}

export default payPlayer
