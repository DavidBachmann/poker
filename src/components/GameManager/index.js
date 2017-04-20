import { Component, cloneElement } from 'react'
import __DEBUG__ from '../../utils/__DEBUG__'

class GameManager extends Component {
  componentDidMount() {
    const { startGameThunk } = this.props
    startGameThunk()
  }

  render() {
    const {
      children,
      playerBetsThunk,
      playerFoldsThunk,
      getHighestCurrentBettor,
      testNextPlayerToAct,
      communityCards,
      currentLevel,
      currentStreet,
      deck,
      handWinners,
      highestCurrentBet,
      highestCurrentBettor,
      nextPlayerToAct,
      players,
      positions,
      pot,
      showdown,
    } = this.props

    return cloneElement(children, {
      pot,
      deck,
      players,
      showdown,
      positions,
      handWinners,
      currentLevel,
      currentStreet,
      communityCards,
      nextPlayerToAct,
      playerBetsThunk,
      playerFoldsThunk,
      highestCurrentBet,
      testNextPlayerToAct,
      highestCurrentBettor,
      getHighestCurrentBettor,
      handleDealing: this.handleDealing,
      handlePlayerFolds: this.handlePlayerFolds,
    })
  }
}

export default GameManager
