import { Component, cloneElement } from 'react'
import { round, find } from 'lodash'
import __DEBUG__ from '../../utils/__DEBUG__'
import winnerDetermination from './winnerDetermination'

class GameManager extends Component {
  constructor() {
    super()
    this.lock = false
  }

  componentDidMount() {
    const { startGameThunk } = this.props
    startGameThunk()
  }

  // handleDealing() {

  // // Todo, gross
  // // todo: this really isn't 'winner', but an array of players that are potential winners.
  // payWinner = winner => {
  //   if (!winner) {
  //     throw new Error('no winner...')
  //   }
  //
  //   this.setState(prevState => {
  //     const { players, communityCards, pot, handHistory } = prevState
  //
  //     if (winner.length && winner.length > 1) {
  //       const winners = winnerDetermination(winner, communityCards)
  //       const amountWon = pot / winners.length
  //
  //       winners.forEach(each => {
  //         const winnerObj = find(players, player => player.id === each.id)
  //         const currentWinnerChips = winnerObj.chips
  //         winnerObj.chips = round(currentWinnerChips + amountWon)
  //         __DEBUG__(
  //           `${winnerObj.name} wins ${amountWon} and has ${winnerObj.chips}`,
  //         )
  //         return winnerObj
  //       })
  //
  //       return {
  //         handWinners: winners,
  //         handHistory: handHistory.concat(winners),
  //         players,
  //       }
  //     }
  //
  //     if (winner.length && winner.length === 1) {
  //       const winnerObj = find(players, player => player.id === winner[0].id)
  //       const currentWinnerChips = winnerObj.chips
  //       winnerObj.chips = round(currentWinnerChips + pot)
  //       __DEBUG__(`${winnerObj.name} wins ${pot} and has ${winnerObj.chips}`)
  //
  //       return {
  //         handWinners: [...winner],
  //         handHistory: handHistory.concat(winner),
  //         players,
  //       }
  //     }
  //   })
  // }

  // /**
  //  * Handles resetting state to prepare for a new hand
  //  */
  // handleResetting = () => {
  //   this.setState(prevState => {
  //     const { players, whatPlayerIsDealer } = prevState
  //
  //     players.forEach(player => {
  //       player.chipsCurrentlyInvested = 0
  //       player.holeCards = []
  //       player.hand = []
  //       player.hasFolded = false
  //       player.isAllIn = false
  //     })
  //
  //     return {
  //       communityCards: { flop: {}, turn: {}, river: {} },
  //       currentStreet: 0,
  //       handWinners: [],
  //       highestCurrentBet: 0,
  //       showdown: false,
  //       whatPlayerIsDealer: whatPlayerIsDealer + 1,
  //       highestCurrentBettor: null,
  //       playersInTheHand: this.players,
  //       players,
  //     }
  //   })
  //   this.setState(this.returnNextPlayerToAct)
  // }
  //
  // /**
  //  * Handle dealing of all cards
  //  */
  // _handleDealing = () => {
  //   const {
  //     deck,
  //     communityCards,
  //     currentStreet,
  //     positions,
  //     whatPlayerIsDealer,
  //   } = this.props
  //   handlePuttingChipsInPot(this.props)
  //   // Preflop
  //   if (currentStreet === 0) {
  //     this.dealPlayerCards()
  //     this.setState({
  //       currentStreet: currentStreet + 1,
  //       highestCurrentBet: 0,
  //       nextPlayerToAct: positions.utg,
  //       highestCurrentBettor: null,
  //     })
  //   } else if (currentStreet === 1) {
  //     // Flop
  //     __DEBUG__('Currentstreet === 1')
  //     this.setState({
  //       currentStreet: currentStreet + 1,
  //       highestCurrentBet: 0,
  //       highestCurrentBettor: null,
  //       nextPlayerToAct: whatPlayerIsDealer,
  //       communityCards: { ...communityCards, flop: deck.splice(0, 3) },
  //     })
  //     this.setState(this.returnNextPlayerToAct)
  //   } else if (currentStreet === 2) {
  //     // Turn
  //     __DEBUG__('Currentstreet === 2')
  //     this.setState({
  //       currentStreet: currentStreet + 1,
  //       highestCurrentBet: 0,
  //       highestCurrentBettor: null,
  //       nextPlayerToAct: whatPlayerIsDealer,
  //       communityCards: { ...communityCards, turn: deck.splice(0, 1) },
  //     })
  //     this.setState(this.returnNextPlayerToAct)
  //   } else if (currentStreet === 3) {
  //     // River
  //     __DEBUG__('Currentstreet === 3')
  //     this.setState({
  //       currentStreet: currentStreet + 1,
  //       communityCards: { ...communityCards, river: deck.splice(0, 1) },
  //       highestCurrentBet: 0,
  //       highestCurrentBettor: null,
  //       nextPlayerToAct: whatPlayerIsDealer,
  //     })
  //     this.setState(this.returnNextPlayerToAct)
  //   } else {
  //     this.handleWinnerSelection()
  //   }
  // }

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
