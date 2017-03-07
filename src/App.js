import React, { Component } from 'react'
import { connect } from 'react-redux'
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
    const shuffledDeck = shuffleDeck(generateNewDeck())

    for (let i = 0; i < this.totalPlayers; i++) {
      this.players[i] = shuffledDeck.splice(0, 2)
    }

    if (this.players.length > MAX_PLAYERS) {
      throw new Error('Max players exceeded!')
    }

    this.communityCards = shuffledDeck.splice(0, 5)
  }

  render() {
    const { dispatch, started } = this.props
    return (
      <div className="App">
        <div>
          {started && (
            <Board
              players={this.players}
              communityCards={this.communityCards}
            />
          )}
          <button onClick={() => dispatch({ type: 'START' })}>Start Game</button>
          <button onClick={() => dispatch({ type: 'STOP' })}>Restart Game</button>
          <button onClick={() => console.log(this.props)}>Get State</button>
        </div>
      </div>
    )
  }
}

export default connect(state => state)(App)
