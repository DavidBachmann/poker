import React, { Component } from 'react'
import ConnectedBoard from './containers/ConnectedBoard'
import GameManager from './components/GameManager'
import { Provider } from 'react-redux'
import configureStore from './redux/configureStore'
import './App.css'

const store = configureStore

class App extends Component {
  componentDidMount() {
    console.log(configureStore)
  }
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <GameManager>
            <ConnectedBoard />
          </GameManager>
        </Provider>
      </div>
    )
  }
}

export default App
