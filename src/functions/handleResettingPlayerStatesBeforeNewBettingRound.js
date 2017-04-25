/**
 * Handles resetting player states before a new betting round
 */
export default function handleResettingPlayerStatesBeforeNewBettingRound(players) {
  let _players = players

  _players.forEach(z => {
    z.hasActed = false
  })

  return _players
}
