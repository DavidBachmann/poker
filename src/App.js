import React, { Component } from 'react'
import Player from './classes/Player'
import Board from './components/Board'
import { shuffleDeck, generateDeck } from './utils'

import './App.css'

const MAX_PLAYERS = 9

class App extends Component {
  constructor() {
    super()
    this.players = []
    this.totalPlayers = 2
    this.dealCards()
  }

  dealCards() {
    this._shuffledDeck = shuffleDeck(generateDeck())
    for (let i = 0; i < this.totalPlayers; i++) {
      this.players[i] = this._shuffledDeck.splice(0, 2)
    }

    if (this.players.length > MAX_PLAYERS) {
      throw new Error('Max players exceeded!')
    }
    this.boardCards = this._shuffledDeck.splice(0, 5)
  }

  render() {
    return (
      <div className="App">
        <Board
          players={this.players}
          boardCards={this.boardCards} />
      </div>
    )
  }
}

export default App
