import React, { Component } from 'react'
import Card from '../Card'
import { Hand } from 'pokersolver'

import './styles.css'

class Board extends Component {

  determineWinner(player1Cards, player2Cards, boardCards) {
    const formattedBoard = boardCards.map((card) => `${card.rank.symbol}${card.suit.letter}`)
    const formattedHand1 = player1Cards.map((card) => `${card.rank.symbol}${card.suit.letter}`)
    const formattedHand2 = player2Cards.map((card) => `${card.rank.symbol}${card.suit.letter}`)
    const solvedHand1 = Hand.solve(formattedHand1.concat(formattedBoard))
    const solvedHand2 = Hand.solve(formattedHand2.concat(formattedBoard))

    const handWinner = Hand.winners([
      solvedHand1,
      solvedHand2
    ])

    if (handWinner.toString() === solvedHand1.toString()) {
        return `Player 1 wins with hand ${formattedHand1}: ${solvedHand1.descr}`
      } else if (handWinner.toString() === solvedHand2.toString()) {
        return `Player 2 wins with hand ${formattedHand2}: ${solvedHand2.descr}`
      } else {
        return 'Draw'
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
              <Card
                visibility="visible"
                suit={card.suit}
                rank={card.rank}
                key={index}
              />
            ))}
          </div>
        ))}

        <div className="Board-boardCards">
          <p>Community cards:</p>

          {boardCards.map((card, index) => (
            <Card
              visibility="visible"
              suit={card.suit}
              rank={card.rank}
              key={index}
            />
          ))}

        </div>
        <p>{this.determineWinner(players[0], players[1], boardCards)} </p>
      </div>
    )
  }

}

export default Board
