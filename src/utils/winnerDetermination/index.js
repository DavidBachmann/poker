import { Hand } from 'pokersolver'
import { concat, valuesIn, flatten } from 'lodash'
import { stripSpaces } from '../../utils'
import { formatHand } from '../../utils/formatHand'

const determineWinner = (bots, heroCards, communityCards) => {
  let allPlayerCards = concat([heroCards], bots)
  let winners = []

  /*
    Note: Format Hand means taking an array with with objects that look like:
    { rank: { value: 7, symbol: '7' }, suit: { symbol: '♥', letter: 'h', color: 'red' } }
    { rank: { value: 12, symbol: 'Q' }, suit: { symbol: '♣', letter: 'c', color: 'black' } ... }
    and turning it into:
    [ '7h', 'Qc', ... ]
  */

  const formattedCommunityCards = formatHand(flatten(valuesIn(communityCards)))

  const formattedPlayerHands = allPlayerCards.map((card) => {
    return concat(formatHand(card), formattedCommunityCards)
  })

  const players = formattedPlayerHands.map((hand, index) => {
    return {
      name: `Player ${index}`,
      hand: hand
    }
  })

  const formattedPlayerHandsSolved = players.map((player) => {
    return Hand.solve(player.hand)
  })

  // Let PokerSolver figure out who won the hand
  const handWinners = Hand.winners(formattedPlayerHandsSolved)

  // Flatten the string so we can compare it
  let winningHands = handWinners.map((winner, index) => {
    return {
      place: index+1,
      winningHand: stripSpaces(winner.cards.toString())
    }
  })

  players.forEach((player) => {
    let playerHand = stripSpaces(Hand.solve(player.hand).toString())

    // If the winning hand matches this player's hand we have found our winner.
    for (let i = 0; i < winningHands.length; i++) {
      if (winningHands[i].winningHand === playerHand) {
        winners.push({
          place: winningHands[i].place,
          name: player.name,
          hand: player.hand,
          handDetails: handWinners[i],
          allHands: formattedPlayerHands
        })
      }
    }

  })
  return winners
}

export default determineWinner
