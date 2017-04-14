import { Component, cloneElement } from 'react'
import { round, find } from 'lodash'
import __DEBUG__ from '../../utils/__DEBUG__'
import generateShuffledDeck from '../../utils/generateShuffledDeck'
import winnerDetermination from './winnerDetermination'
import deepFreeze from 'deep-freeze'
import update from 'immutability-helper'

import handleCalculatingPositions
  from '../../functions/handleCalculatingPositions'
import handlePuttingChipsInPot from '../../functions/handlePuttingChipsInPot'
import handlePostBlinds from '../../functions/handlePostBlinds'

class GameManager extends Component {
  async componentDidUpdate(prevProps, prevState) {
    const { nextPlayerToAct } = this.props.state
    if (nextPlayerToAct && nextPlayerToAct === -1) {
      // await this.handleDealing()
    }
    console.log('GameManger state = ')
    console.log(this.props.state)
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
    // this.thingsToDoWhenStartingAHand()
  }

  async delayAndRestart() {
    await this.delay(1000)
    await this.handleResetting()
    await this.thingsToDoWhenStartingAHand()
  }

  async thingsToDoWhenStartingAHand() {
    await handleCalculatingPositions(this.props.state)
    await this.handleDealing()
    await handlePostBlinds(this.props.state)
    this.moveGameForward()
  }

  delay = amount => new Promise(resolve => setTimeout(resolve, amount))

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

    this.delayAndRestart()
  }

  handleCheckingHowManyPlayersHaveYetToAct() {
    const { players } = this.props.state
    return players.filter(
      player => player.chipsCurrentlyInvested === 0 && !player.hasFolded,
    )
  }

  dealPlayerCards() {
    const { players } = this.props.state
    const deck = generateShuffledDeck()

    players.forEach(player => {
      player.holeCards = deck.splice(0, 2)
    })

    this.setState({
      deck,
      players,
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
  handleDealing = () => {
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

  returnAlivePlayers = () => {
    const { players } = this.props.state
    if (!players) {
      return
    }

    return players.filter(player => !player.hasFolded)
  }

  /**
   * Handle getting the next player capable of acting
   */
  returnNextPlayerToAct = state => {
    const {
      players,
      nextPlayerToAct: currentPlayerIndex,
      highestCurrentBettor,
    } = state
    const playerCount = players.length
    const startIndex = (currentPlayerIndex + 1) % playerCount
    const _highestCurrentBet =
      highestCurrentBettor && highestCurrentBettor.chipsCurrentlyInvested

    for (
      let index = startIndex;
      index !== currentPlayerIndex;
      index = (index + 1) % playerCount
    ) {
      const player = players[index]
      if (
        !player.hasFolded &&
        player.chipsCurrentlyInvested !== _highestCurrentBet &&
        !player.isAllIn
      ) {
        return { nextPlayerToAct: index }
      }
    }

    return { nextPlayerToAct: -1 }
  }

  /**
   * Handles player's betting (bet, raise, push)
   */
  handlePlayerBets = amountRequested => {
    let newHighestCurrentBet = null
    let newHighestCurrentBettor = null

    // this.setState(updateBets(amountRequested))
    // this.setState(moveGameForward())

    this.setState(prevState => {
      const {
        players,
        nextPlayerToAct,
        levels,
        currentLevel,
        highestCurrentBet,
        highestCurrentBettor,
      } = prevState
      const currentPlayer = players[nextPlayerToAct]

      const chipsCurrentlyInvested = currentPlayer.chipsCurrentlyInvested
      // If the player is betting more than he can afford
      // we put him all in and bet his whole stack
      // else we'll honor the requested amount.
      const amountOfChipsToBet = amountRequested <= currentPlayer.chips
        ? amountRequested
        : currentPlayer.chips
      if (amountRequested >= currentPlayer.chips) {
        currentPlayer.isAllIn = true
      }
      // Check if the player is betting the mininum required
      // By default that's 2xBB
      const defaultMinAmount = levels[currentLevel].bigBlind * 2
      // Unless someone has bet higher
      // If we have chipsCurrentlyInvested, we don't have to pay that amount again to call or raise the current bet.
      const actualMinAmount = highestCurrentBet > defaultMinAmount
        ? highestCurrentBet - chipsCurrentlyInvested
        : defaultMinAmount

      // The bet has to be higher than the mininum allowed
      if (amountOfChipsToBet >= actualMinAmount) {
        // Remove the amount requested from the player,
        currentPlayer.chips -= amountOfChipsToBet
        // and then put into chipsCurrentlyInvested
        currentPlayer.chipsCurrentlyInvested += amountOfChipsToBet
        if (amountOfChipsToBet > highestCurrentBet) {
          newHighestCurrentBet = amountOfChipsToBet
          newHighestCurrentBettor = currentPlayer
          __DEBUG__(
            `New highest current bettor is ${newHighestCurrentBettor.name}`,
          )
        }
        const _highestCurrentBettor = newHighestCurrentBettor
          ? newHighestCurrentBettor
          : highestCurrentBettor
        return {
          players,
          highestCurrentBet: newHighestCurrentBet
            ? newHighestCurrentBet
            : highestCurrentBet,
          highestCurrentBettor: _highestCurrentBettor,
        }
      } else {
        __DEBUG__(
          `${currentPlayer.name} bets illegal amount: ${amountRequested}. Minimum bet is ${actualMinAmount}`,
        )
      }
    })

    this.setState(this.returnNextPlayerToAct)
  }

  /**
   * Handles player's folding
   */
  handlePlayerFolds = () => {
    this.setState(({ players, nextPlayerToAct }) => {
      const currentPlayer = players[nextPlayerToAct]
      currentPlayer.holeCards = []
      currentPlayer.hasFolded = true

      return {
        players,
      }
    })
    this.setState(this.returnNextPlayerToAct)
  }

  render() {
    const { children, playerBets } = this.props
    const {
      deck,
      players,
      currentLevel,
      handWinners,
      showdown,
      positions,
      currentStreet,
      highestCurrentBet,
      highestCurrentBettor,
      communityCards,
      nextPlayerToAct,
      pot,
    } = this.props.state

    return cloneElement(children, {
      pot,
      deck,
      players,
      showdown,
      positions,
      playerBets,
      handWinners,
      currentLevel,
      currentStreet,
      communityCards,
      nextPlayerToAct,
      highestCurrentBet,
      highestCurrentBettor,
      handleDealing: this.handleDealing,
      handlePlayerBets: this.handlePlayerBets,
      handlePlayerFolds: this.handlePlayerFolds,
    })
  }
}

export default GameManager
