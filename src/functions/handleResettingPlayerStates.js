/**
 * Handles resetting player states before a new round
 * Currently it only resets _isAllIn_
 */
export default function handleRestartingPlayerStates(players) {
  let _players = players
  _players.map(z => (z.isAllIn = false))
  return _players
}
