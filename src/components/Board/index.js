import React, { Component } from 'react'
import Card from '../Card'
import { Hand } from 'pokersolver'

import './styles.css'

class Board extends Component {

  state = {

  }

  componentDidMount() {
    const {players, boardCards } = this.props
    this.evaluateHandStrength(players[0], players[1], boardCards)
  }

  evaluateHandStrength(player1HoleCards, player2HoleCards, boardCards) {

    const hand1 = player1HoleCards.map((card) => `${card.rank.symbol}${card.suit.letter}`)
    const hand2 = player2HoleCards.map((card) => `${card.rank.symbol}${card.suit.letter}`)
    const board = boardCards.map((card) => `${card.rank.symbol}${card.suit.letter}`)

    var winner = Hand.winners([Hand.solve(hand1.concat(board)), Hand.solve(hand2.concat(board))])
    console.log(winner)
  }

  render() {
    const { players, boardCards } = this.props
    console.log(players)
    console.log(boardCards)
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
      </div>
    )
  }

}

export default Board
