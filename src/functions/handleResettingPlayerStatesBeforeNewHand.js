/**
 * Handles resetting player states before a new hand
 */

export default function handleResettingPlayerStatesBeforeNewHand(players) {
  for (var i = 0; i < players.length; i++) {
    players[i].hasActed = false
    players[i].isAllIn = false
  }

  return players
}
