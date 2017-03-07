import React, { Component } from 'react'
import Board from './components/Board'
import UI from './components/UI'

import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Board />
        <UI />
      </div>
    )
  }
}

export default App
