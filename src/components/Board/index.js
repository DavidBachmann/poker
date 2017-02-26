import React, { Component } from 'react'
import Card from '../Card'
import { Hand } from 'pokersolver'

import './styles.css'

class Board extends Component {

  state = {

  }

  determineWinner(hand1, hand2, winner) {
    console.log(hand1)
    console.log(hand2)
    console.log(winner)
    if (hand1.toString() === winner.toString()) {
      return `Player 1 wins with hand ${hand1}: ${hand1.descr}`
    } else if (hand2.toString() === winner.toString()) {
      return `Player 2 wins with hand ${hand2}: ${hand1.descr}`
    } else {
      return "Draw"
    }
  }

  evaluateHandStrength(player1HoleCards, player2HoleCards, boardCards) {

    const formattedHand1 = player1HoleCards.map((card) => `${card.rank.symbol}${card.suit.letter}`)
    const formattedHand2 = player2HoleCards.map((card) => `${card.rank.symbol}${card.suit.letter}`)
    const formattedBoard = boardCards.map((card) => `${card.rank.symbol}${card.suit.letter}`)
    const handWinner = Hand.winners(
      [Hand.solve(
        formattedHand1.concat(formattedBoard)),
        Hand.solve(formattedHand2.concat(formattedBoard))
      ])

    return {
      handWinner: this.determineWinner(
        Hand.solve(formattedHand1.concat(formattedBoard)),
        Hand.solve(formattedHand2.concat(formattedBoard)),
        handWinner),
    }
  }

  render() {
    const { players, boardCards } = this.props

    return (
      <div className="Board">
        {players.map((player, index) => (
          <div className="Board-holeCards" key={index}>
            <p>Player {index + 1} Cards:</p>
            {player.map((card, index) => (
              <Card suit={card.suit} rank={card.rank} visibility="visible" key={index}></Card>
            ))}
          </div>
        ))}
        <div className="Board-boardCards">
          <p>Community cards:</p>
          {boardCards.map((card, index) => (
            <Card suit={card.suit} rank={card.rank} visibility="visible" key={index}></Card>
          ))}
        </div>
        <p>{this.evaluateHandStrength(players[0], players[1], boardCards).handWinner} </p>
      </div>
    )
  }

}

export default Board
