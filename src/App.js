import React, { Component } from 'react'
import { connect } from 'react-redux'
import Board from './components/Board'
import { startGame, stopGame, determineWinner } from './actions/game'

import './App.css'

class App extends Component {
  render() {
    const { dispatch, winner, started, pot, players, communityCards } = this.props

    return (
      <div className="App">
        <div>
          {started && (
            <Board
              dispatch={dispatch}
              started={started}
              pot={pot}
              players={players}
              communityCards={communityCards}
              winner={winner && winner}
            />
          )}
          <button onClick={() => dispatch(startGame(9))}>Start Game</button>
          <button onClick={() => dispatch(stopGame())}>Stop Game</button>
          <button onClick={() => dispatch(determineWinner())}>Determine Winner</button>
          <button onClick={() => console.log(this.props)}>Get State</button>
        </div>
      </div>
    )
  }
}

export default connect(state => state)(App)
