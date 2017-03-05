import Player from '../../Player'
import { Hand } from 'pokersolver'
import formatHand from '../formatHand'
import { stripSpaces } from '../'


const determineWinner = (allPlayerCards, communityCards) => {
  let allHands = []
  let players = []
  let solvedHands = []
  let winner = undefined

  /*
    Transform communityCards; an array with with two card objects that look like:
    { rank: { value: 7, symbol: '7' }, suit: { symbol: '♥', letter: 'h', name: 'heart', color: 'red' } }
    { rank: { value: 12, symbol: 'Q' }, suit: { symbol: '♣', letter: 'c', name: 'club', color: 'black' } }
    into:
    [ '7h', 'Qc' ]
  */

  const formattedCommunityCards = formatHand(communityCards)

  // Do the same for allPlayerCards
  for (let i = 0; i < allPlayerCards.length; i++) {
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

  const handWinner = Hand.winners(solvedHands)


  players.map((player) => {
    let winningHand = stripSpaces(handWinner[0].cards.toString())
    let playerHand = stripSpaces(Hand.solve(player.hand).toString())

    if (winningHand === playerHand) {

      return winner = {
        name: player.name,
        hand: player.hand,
        handDetails: handWinner[0],
      }
    }
  })

  return winner
}

export default determineWinner
