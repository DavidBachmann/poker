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

    const formatHand1 = player1HoleCards.map((card) => `${card.rank.symbol}${card.suit.letter}`)
    const formatHand2 = player2HoleCards.map((card) => `${card.rank.symbol}${card.suit.letter}`)
    const formatBoard = boardCards.map((card) => `${card.rank.symbol}${card.suit.letter}`)

    const hand1Strength = Hand.solve(formatHand1.concat(formatBoard))
    const hand2Strength = Hand.solve(formatHand2.concat(formatBoard))
    const handWinner = Hand.winners([hand1Strength, hand2Strength])


    return {
      hand1Strength,
      hand2Strength,
      handWinner: this.determineWinner(hand1Strength, hand2Strength, handWinner),
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
