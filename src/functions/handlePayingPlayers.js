import { find } from 'lodash'
import update from 'immutability-helper'

export default function handlePayingPlayers(players, handWinners, pot) {
  const totalWinners = handWinners.length
  const amountWon = pot / totalWinners

  handWinners.map(winner => {
    return update(winner, {
      chips: { $set: amountWon },
    })
  })

  return players
}
