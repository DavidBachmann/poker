import React, { Component } from 'react'
import Board from './components/Board'
import { availableRanks, availableSuits } from './variables'
import { shuffle } from './utils'
import './App.css'

class App extends Component {
  constructor() {
    super()
    this._shuffledDeck = shuffle(this.generateDeck())
    this.holeCards = this._shuffledDeck.splice(0, 2)
    this.boardCards = this._shuffledDeck.splice(0, 3)
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

  render() {
    return (
      <div className="App">
        <Board holeCards={this.holeCards} boardCards={this.boardCards} />
      </div>
    )
  }
}

export default App
