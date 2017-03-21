import { find, pullAt, findIndex } from 'lodash'

const checkForPlayerElimination = (players) => {
  const playerWithoutChips = find(players, (player) => player.chips <= 0)

  if (playerWithoutChips) {
    pullAt(players, findIndex(players, ((player) => player.id === playerWithoutChips.id )))
  }

  return players
}

export default checkForPlayerElimination
