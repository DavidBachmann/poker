import React, { Component } from 'react'
import { connect } from 'react-redux'
import Board from './components/Board'

import './App.css'

class App extends Component {

  componentWillMount() {
    const { dispatch } = this.props
    dispatch({ type: 'DEAL' })
  }

  render() {
    const { dispatch, started, pot, players, communityCards } = this.props

    return (
      <div className="App">
        <div>
          {started && (
            <Board
              started={started}
              pot={pot}
              players={players}
              communityCards={communityCards}
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
