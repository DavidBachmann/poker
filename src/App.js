import React, { Component } from 'react'
import Board from './components/Board'
import generateNewDeck from './utils/generateNewDeck'
import shuffleDeck from './utils/shuffleDeck'

import './App.css'

const MAX_PLAYERS = 9

class App extends Component {
  constructor() {
    super()
    this.players = []
    this.totalPlayers = 9
    this.dealCards()
  }

  dealCards() {
    this._shuffledDeck = shuffleDeck(generateNewDeck())

    for (let i = 0; i < this.totalPlayers; i++) {
      this.players[i] = this._shuffledDeck.splice(0, 2)
    }

    if (this.players.length > MAX_PLAYERS) {
      throw new Error('Max players exceeded!')
    }

    this.communityCards = this._shuffledDeck.splice(0, 5)
  }

  render() {
    return (
      <div className="App">
        <Board
          players={this.players}
          communityCards={this.communityCards} />
      </div>
    )
  }
}

export default App
