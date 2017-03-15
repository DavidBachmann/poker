import React, { Component } from 'react'
import Board from './components/Board'
import UI from './components/UI'
import GameManager from './components/GameManager'

import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <GameManager>
          <Board />
          <UI />
        </GameManager>
      </div>
    )
  }
}

export default App
