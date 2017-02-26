import React, { Component } from 'react'
import Card from '../Card'
import { availableRanks, availableSuits } from '../../variables'
import { shuffle } from '../../utils'

import './styles.css'

class Board extends Component {

  state = {
    holeCards: [],
    boardCards: [],
  }

  constructor() {
    super()
    this._shuffledDeck = shuffle(this.generateDeck())
    this.holeCards = this._shuffledDeck.splice(0, 2)
    this.boardCards = this._shuffledDeck.splice(0, 3)
    this.calculateHandStrength(this.holeCards, this.boardCards)
  }

  componentDidMount() {
    this.setState({
      holeCards: this.holeCards,
      boardCards: this.boardCards
    })
  }

  generateDeck() {
    this.deck = []

    for (let i = 0; i < availableSuits.length; i++) {
      for (let j = 0; j < availableRanks.length; j++) {
        const card = {
          rank: availableRanks[j],
          suit: availableSuits[i]
        }

        this.deck.push(card)
      }
    }
    return this.deck
  }

  calculateHandStrength(holeCards, boardCards) {
    holeCards.forEach((card) => {
      console.log(card.rank.value)
    })
    boardCards.forEach((card) => {
      console.log(card.rank.value)
    })

  }

  render() {
    return (
      <div className="Board">
        <div className="Board-holeCards">
          {this.holeCards.map((card, index) => (
            <Card suit={card.suit} rank={card.rank} visibility="visible" key={index}></Card>
          ))}
        </div>
        <div className="Board-boardCards">
          {this.boardCards.map((card, index) => (
            <Card suit={card.suit} rank={card.rank} visibility="visible" key={index}></Card>
          ))}
        </div>
      </div>
    )
  }

}

export default Board
