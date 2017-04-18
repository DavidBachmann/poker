import React, { Component } from 'react'
import ConnectedGameManager from './containers/ConnectedGameManager'
import Board from './components/Board'
import { Provider } from 'react-redux'
import configureStore from './redux/configureStore'
import './App.css'

const store = configureStore

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <ConnectedGameManager>
            <Board />
          </ConnectedGameManager>
        </Provider>
      </div>
    )
  }
}

export default App
