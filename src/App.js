import React, { Component } from 'react'
import Board from './components/Board'
import GameManager from './components/GameManager'

import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <GameManager>
          <Board />
        </GameManager>
      </div>
    )
  }
}

export default App
