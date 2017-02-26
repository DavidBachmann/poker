import React, { Component } from 'react'
import Card from '../Card'

import './styles.css'

class Board extends Component {

  state = {
    holeCards: [],
    boardCards: [],
  }

  componentDidMount() {
    const { holeCards, boardCards } = this.props

    this.setState({
      holeCards: holeCards,
      boardCards: boardCards
    })
  }

  render() {
    const { holeCards, boardCards } = this.props

    return (
      <div className="Board">
        <div className="Board-holeCards">
          {holeCards.map((card, index) => (
            <Card suit={card.suit} rank={card.rank} visibility="visible" key={index}></Card>
          ))}
        </div>
        <div className="Board-boardCards">
          {boardCards.map((card, index) => (
            <Card suit={card.suit} rank={card.rank} visibility="visible" key={index}></Card>
          ))}
        </div>
      </div>
    )
  }

}

export default Board
