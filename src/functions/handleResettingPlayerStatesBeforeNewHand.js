import update from 'immutability-helper'

/**
 * Handles resetting player states before a new hand
 */
// export default function handleResettingPlayerStatesBeforeNewHand(players) {
//   players.forEach(player => {
//     return update(player, {
//       isAllIn: { $set: false },
//       hasActed: { $set: false },
//       hasFolded: { $set: false },
//     })
//   })
//
//   return players
// }

export default function handleResettingPlayerStatesBeforeNewHand(players) {
  let _x = players
  for (var i = 0; i < _x.length; i++) {
    _x[i].hasActed = false
    _x[i].isAllIn = false
    _x[i].hasFolded = false
  }
  return _x
}
