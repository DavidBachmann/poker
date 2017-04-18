import update from 'immutability-helper'

export default function handleEmptyingPlayerPots(players) {
  return players.map(player => {
    return update(player, {
      chipsCurrentlyInvested: { $set: 0 },
    })
  })
}
