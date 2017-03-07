// TODO: Refactor

import Player from '../../Player'
import { Hand } from 'pokersolver'
import formatHand from '../../utils/formatHand'
import { stripSpaces } from '../../utils'

const determineWinner = (bots, heroCards, communityCards) => {
  let allPlayerCards = [heroCards].concat(bots)
  let allHands = []
  let players = []
  let solvedHands = []
  let winner = undefined

  /*
    Transform communityCards; an array with with two 5 objects that look like:
    { rank: { value: 7, symbol: '7' }, suit: { symbol: '♥', letter: 'h', name: 'heart', color: 'red' } }
    { rank: { value: 12, symbol: 'Q' }, suit: { symbol: '♣', letter: 'c', name: 'club', color: 'black' } ... }
    into:
    [ '7h', 'Qc', ... ]
  */

  const formattedCommunityCards = formatHand(communityCards)

  for (let i = 0; i < allPlayerCards.length; i++) {
    // Do the same for allPlayerCards
    // and concatinate it with the formatted community cards
    allHands.push(formatHand(allPlayerCards[i]).concat(formattedCommunityCards))
  }

  // Now we can create Players and give them their full cards
  for (let i = 0; i < allHands.length; i++) {
    players.push(new Player(`Player ${i+1}`, allHands[i]))
  }

  // Take all the players hands and figure out who has the best hand
  for (let i = 0; i < players.length; i++) {
    solvedHands.push(Hand.solve(players[i].hand))
  }

  // Let PokerSolver figure out who won the hand
  const handWinner = Hand.winners(solvedHands)[0]
  // Flatten the string so we can compare it
  const winningHand = stripSpaces(handWinner.cards.toString())

  players.map((player) => {
    let playerHand = stripSpaces(Hand.solve(player.hand).toString())

    // If the winning hand matches this player's hand we have found our winner.
    if (winningHand === playerHand) {
      return winner = {
        name: player.name,
        hand: player.hand,
        handDetails: handWinner,
        allHands: allHands
      }
    } else {
      return 0
    }
  })

  return winner
}

export default determineWinner
