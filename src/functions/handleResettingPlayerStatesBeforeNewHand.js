/**
 * Handles resetting player states before a new hand
 */
export default function handleResettingPlayerStatesBeforeNewHand(players) {
  let _players = players

  _players.forEach(z => {
    z.isAllIn = false
    z.hasActed = false
  })

  return _players
}
