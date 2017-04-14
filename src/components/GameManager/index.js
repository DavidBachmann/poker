import { Component, cloneElement } from 'react'
import { round, find } from 'lodash'
import __DEBUG__ from '../../utils/__DEBUG__'
import winnerDetermination from './winnerDetermination'
import handlePuttingChipsInPot from '../../functions/handlePuttingChipsInPot'

class GameManager extends Component {
  constructor() {
    super()
    this.lock = false
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.state.nextPlayerToAct === -1 && !this.lock) {
      this.lock = true
      console.log(this.props.state.currentStreet)
      console.log('nextPlayerToAct === -1')
      this.props.dealNextStreet(this.props.state.currentStreet)
    }
  }

  setState(obj) {
    console.log(obj)
  }

  async moveGameForward() {
    const { playersInTheHand, handWinners } = this.props.state
    // Update the list of players that are still in the hand
    const alivePlayers = this.returnAlivePlayers()
    if (alivePlayers && alivePlayers.length !== playersInTheHand.length) {
      this.setState(() => {
        return {
          playersInTheHand: alivePlayers,
        }
      })
    }

    if (
      (alivePlayers && alivePlayers.length === 1 && handWinners.length === 0) ||
      this.props.state.showdown
    ) {
      handlePuttingChipsInPot(this.props.state)
      await this.handleWinnerSelection(alivePlayers)
    }

    if (handWinners.length >= 1) {
      __DEBUG__('handWinners.length >= 1')
      __DEBUG__('Resetting and stuff from moveGameForward')
      this.delayAndRestart()
    }
  }

  componentDidMount() {
    this.props.startNewRound()
    this.props.generateNewDeck()
    this.props.dealCardsToPlayers()
  }

  /**
   * Handles winner determination and paying out chips in the pot
   */
  handleWinnerSelection = players => {
    __DEBUG__('Calling handleWinnerSelection')
    const { communityCards } = this.props.state
    let winner = null

    if (!players) {
      winner = this.returnAlivePlayers()
    }

    if (players && players.length === 1) {
      winner = players
    }

    if (players && players.length > 1) {
      winner = winnerDetermination(players, communityCards)
    }

    this.payWinner(winner)
  }

  // Todo, gross
  // todo: this really isn't 'winner', but an array of players that are potential winners.
  payWinner = winner => {
    if (!winner) {
      throw new Error('no winner...')
    }

    this.setState(prevState => {
      const { players, communityCards, pot, handHistory } = prevState

      if (winner.length && winner.length > 1) {
        const winners = winnerDetermination(winner, communityCards)
        const amountWon = pot / winners.length

        winners.forEach(each => {
          const winnerObj = find(players, player => player.id === each.id)
          const currentWinnerChips = winnerObj.chips
          winnerObj.chips = round(currentWinnerChips + amountWon)
          __DEBUG__(
            `${winnerObj.name} wins ${amountWon} and has ${winnerObj.chips}`,
          )
          return winnerObj
        })

        return {
          handWinners: winners,
          handHistory: handHistory.concat(winners),
          players,
        }
      }

      if (winner.length && winner.length === 1) {
        const winnerObj = find(players, player => player.id === winner[0].id)
        const currentWinnerChips = winnerObj.chips
        winnerObj.chips = round(currentWinnerChips + pot)
        __DEBUG__(`${winnerObj.name} wins ${pot} and has ${winnerObj.chips}`)

        return {
          handWinners: [...winner],
          handHistory: handHistory.concat(winner),
          players,
        }
      }
    })
  }

  /**
   * Handles collecting player pots into the pot
   */
  handleCollectingPlayerPots = () => {
    this.setState(prevState => {
      const { players, pot } = prevState
      const amountsFromPlayerPots = players.reduce(
        (acc, player) => player.chipsCurrentlyInvested + acc,
        0,
      )

      return {
        pot: amountsFromPlayerPots + pot,
      }
    })
  }

  /**
   * Handles resetting state to prepare for a new hand
   */
  handleResetting = () => {
    this.setState(prevState => {
      const { players, whatPlayerIsDealer } = prevState

      players.forEach(player => {
        player.chipsCurrentlyInvested = 0
        player.holeCards = []
        player.hand = []
        player.hasFolded = false
        player.isAllIn = false
      })

      return {
        communityCards: { flop: {}, turn: {}, river: {} },
        currentStreet: 0,
        handWinners: [],
        highestCurrentBet: 0,
        showdown: false,
        whatPlayerIsDealer: whatPlayerIsDealer + 1,
        highestCurrentBettor: null,
        playersInTheHand: this.players,
        players,
      }
    })
    this.setState(this.returnNextPlayerToAct)
  }

  /**
   * Handle dealing of all cards
   */
  _handleDealing = () => {
    const {
      deck,
      communityCards,
      currentStreet,
      positions,
      whatPlayerIsDealer,
    } = this.props.state
    handlePuttingChipsInPot(this.props.state)
    // Preflop
    if (currentStreet === 0) {
      this.dealPlayerCards()
      this.setState({
        currentStreet: currentStreet + 1,
        highestCurrentBet: 0,
        nextPlayerToAct: positions.utg,
        highestCurrentBettor: null,
      })
    } else if (currentStreet === 1) {
      // Flop
      __DEBUG__('Currentstreet === 1')
      this.setState({
        currentStreet: currentStreet + 1,
        highestCurrentBet: 0,
        highestCurrentBettor: null,
        nextPlayerToAct: whatPlayerIsDealer,
        communityCards: { ...communityCards, flop: deck.splice(0, 3) },
      })
      this.setState(this.returnNextPlayerToAct)
    } else if (currentStreet === 2) {
      // Turn
      __DEBUG__('Currentstreet === 2')
      this.setState({
        currentStreet: currentStreet + 1,
        highestCurrentBet: 0,
        highestCurrentBettor: null,
        nextPlayerToAct: whatPlayerIsDealer,
        communityCards: { ...communityCards, turn: deck.splice(0, 1) },
      })
      this.setState(this.returnNextPlayerToAct)
    } else if (currentStreet === 3) {
      // River
      __DEBUG__('Currentstreet === 3')
      this.setState({
        currentStreet: currentStreet + 1,
        communityCards: { ...communityCards, river: deck.splice(0, 1) },
        highestCurrentBet: 0,
        highestCurrentBettor: null,
        nextPlayerToAct: whatPlayerIsDealer,
      })
      this.setState(this.returnNextPlayerToAct)
    } else {
      this.handleWinnerSelection()
    }
  }

  // returnAlivePlayers = () => {
  //   const { players } = this.props.state
  //   if (!players) {
  //     return
  //   }
  //
  //   return players.filter(player => !player.hasFolded)
  // }

  /**
   * Handle getting the next player capable of acting
   */
  // returnNextPlayerToAct = state => {
  //   const {
  //     players,
  //     nextPlayerToAct: currentPlayerIndex,
  //     highestCurrentBettor,
  //   } = state
  //   const playerCount = players.length
  //   const startIndex = (currentPlayerIndex + 1) % playerCount
  //   const _highestCurrentBet =
  //     highestCurrentBettor && highestCurrentBettor.chipsCurrentlyInvested
  //
  //   for (
  //     let index = startIndex;
  //     index !== currentPlayerIndex;
  //     index = (index + 1) % playerCount
  //   ) {
  //     const player = players[index]
  //     if (
  //       !player.hasFolded &&
  //       !player.isAllIn &&
  //       player.chipsCurrentlyInvested !== _highestCurrentBet
  //     ) {
  //       return { nextPlayerToAct: index }
  //     }
  //   }
  //
  //   return { nextPlayerToAct: -1 }
  // }

  /**
   * Handles player's betting (bet, raise, push)
   */

  //   this.setState(this.returnNextPlayerToAct)
  // }

  render() {
    const {
      children,
      state,
      playerBets,
      playerFolds,
      getNextPlayerToAct,
    } = this.props
    const {
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
    } = state

    return cloneElement(children, {
      pot,
      deck,
      players,
      showdown,
      positions,
      playerBets,
      playerFolds,
      handWinners,
      currentLevel,
      currentStreet,
      communityCards,
      nextPlayerToAct,
      highestCurrentBet,
      getNextPlayerToAct,
      highestCurrentBettor,
      handleDealing: this.handleDealing,
      handlePlayerFolds: this.handlePlayerFolds,
    })
  }
}

export default GameManager
