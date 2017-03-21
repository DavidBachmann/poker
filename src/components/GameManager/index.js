import { Component, cloneElement } from 'react'
import { find, round } from 'lodash'
import __DEBUG__ from '../../utils/__DEBUG__'
import { initializePlayers, initializeLevels } from '../../utils/initializer'
import generateShuffledDeck from '../../utils/generateShuffledDeck'
import getAmountTakenFromBlindedPlayers from './getAmountTakenFromBlindedPlayers'
import winnerDetermination from './winnerDetermination'

class GameManager extends Component {
  static STARTING_STACK = 1500
  static TOTAL_PLAYERS = 9
  static MAX_HANDS_PER_LEVEL = 25
  static __ROBOT_DEALER_ACTIVATE__ = false

  players = initializePlayers(GameManager.TOTAL_PLAYERS, GameManager.STARTING_STACK)
  levels = initializeLevels()

  constructor() {
    super()
    this.state = {
      deck: [],
      players: this.players,
      playersInTheHand: [],
      handWinners: [],
      levels: this.levels,
      nextPlayerToAct: 0,
      currentLevel: 1,
      currentStreet: 0,
      pot: 0,
      communityCards: {flop: {}, turn: {}, river: {}},
    }
  }

  ROBOT_DEALER_9000() {
      this.counter = 0
      setInterval(() => {
        if (this.counter <= 3) {
          this.handleDealing()
          this.counter += 1
        } else if (this.counter === 4) {
          this._handleDetermineWinnersAndPayPlayers()
          this.counter += 1
        } else {
          this.counter = 0
          this.handleResetting()
        }
      }, 1000)
  }

  componentDidMount() {
    if (GameManager.__ROBOT_DEALER_ACTIVATE__) {
      this.ROBOT_DEALER_9000()
    }
  }

  generateDeck = () => {
    const deck = generateShuffledDeck()
    return deck
  }

  _dealPlayerCards() {
    const { players } = this.state
    const deck = this.generateDeck()

    players.forEach((player) => {
      player.holeCards = deck.splice(0, 2)
    })

    this.setState({
      deck,
      players,
    })
  }

  _handleDetermineWinnersAndPayPlayers = () => {
    this.setState((state) => {
      const { players, communityCards, pot  } = state
      const winners = winnerDetermination(players, communityCards)
      const amountWon = pot/winners.length

      winners.forEach((winner) => {
        const winnerObj = find(players, (player) => player.id === winner.id)
        const currentWinnerChips = winnerObj.chips
        winnerObj.chips = round(currentWinnerChips + amountWon)
        console.log(`${winnerObj.name } wins ${amountWon} and has ${winnerObj.chips}`)
        return winnerObj
      })

      return {
        handWinners: winners,
        pot,
        players,
      }
    })
  }

  handleResetting = () => {
    this.handleNextPlayerToAct()
    this.setState((state) => {

      return {
        communityCards: {flop: {}, turn: {}, river: {}},
        handWinners: [],
      }
    })
  }

  /**
   * Handle dealing of all cards
   */
  handleDealing = () => {
    const { deck, communityCards, currentStreet } = this.state

    // Get a list of players that haven't folded
    this.setState((state) => {
      const { players } = state
      const alivePlayers = players.filter(player => !player.hasFolded)

      return {
        playersInTheHand: alivePlayers
      }
    })

    // Preflop
    if (currentStreet === 0) {
      this._dealPlayerCards()
      this.setState({
        currentStreet: currentStreet + 1
      })
    }

    // Flop
    else if (currentStreet === 1) {
      communityCards.flop = deck.splice(0, 3)

      this.setState({
        currentStreet: currentStreet + 1
      })
    }

    // Turn
    else if (currentStreet === 2) {
      communityCards.turn = deck.splice(0, 1)

      this.setState({
        currentStreet: currentStreet + 1
      })
    }

    // River
    else if (currentStreet === 3) {
      communityCards.river = deck.splice(0, 1)

      this.setState({
        currentStreet: 0
      })
    }
    else {
      throw new Error(`Invalid street: ${currentStreet}`)
    }

    return {
      deck,
      communityCards
    }
  }

  /**
   * Handle switching to next player
   */
  handleNextPlayerToAct = () => {
    const { nextPlayerToAct } = this.state

    return nextPlayerToAct === GameManager.TOTAL_PLAYERS - 1 ? 0 : nextPlayerToAct + 1
  }

  /**
   * Handles collecting blinds from players
   * Collected blinds go to player's chipsCurrentlyInvested
   * If the round continues the chips will be transferred to the pot via handlePuttingChipsInPot
   */
  handlePostBlinds = () => {
    this.setState((state) => {
      const { levels, currentLevel, nextPlayerToAct, players } = state
      const { TOTAL_PLAYERS } = GameManager
      const smallBlindPosition = (nextPlayerToAct + TOTAL_PLAYERS - 8) % TOTAL_PLAYERS
      const bigBlindPosition = (nextPlayerToAct + TOTAL_PLAYERS - 7) % TOTAL_PLAYERS
      const { smallBlind, bigBlind } = levels[currentLevel]

      const amountTakenFromSmallBlindPlayer = getAmountTakenFromBlindedPlayers(players, smallBlindPosition, smallBlind)
      const amountTakenFromBigBlindPlayer = getAmountTakenFromBlindedPlayers(players, bigBlindPosition, bigBlind)

      players[smallBlindPosition].chipsCurrentlyInvested = amountTakenFromSmallBlindPlayer
      players[bigBlindPosition].chipsCurrentlyInvested = amountTakenFromBigBlindPlayer

      return {
        players,
      }
    })
  }

  /**
   * Handles taking chips from player's chipsCurrentlyInvested
   * and putting them in the pot
   */
  _handlePuttingChipsInPot = () => {
    this.setState((state) => {
      const { players, pot } = state
      const amountOfChipsToTransfer = players.reduce((acc, player) => player.chipsCurrentlyInvested + acc, 0)

      return {
        pot: pot + amountOfChipsToTransfer,
      }
    })
  }

  /**
   * Handles player's betting (call, raise, push)
   */
  handlePlayerBets = (amountRequested) => {
    this.setState((state) => {
      const { players, nextPlayerToAct, levels, currentLevel } = state
      const currentPlayer = players[nextPlayerToAct]
      // If the player is betting more than he can afford
      // we put him all in and bet his whole stack
      // else we'll honor the requested amount.
      const amountOfChipsToBet = amountRequested <= currentPlayer.chips ? amountRequested : currentPlayer.chips
      // Check if the player is betting the mininum required
      let TEMP_MIN_REQ = levels[currentLevel].bigBlind * 2

      if (amountOfChipsToBet >= TEMP_MIN_REQ) {
        // Remove the amount requested from the player,
        currentPlayer.chips -= amountOfChipsToBet
        // and put into chipsCurrentlyInvested
        currentPlayer.chipsCurrentlyInvested += amountOfChipsToBet

        return {
          players,
          nextPlayerToAct: this.handleNextPlayerToAct()
        }
      } else {
        __DEBUG__(`${currentPlayer.name} bets illegal amount: ${amountOfChipsToBet}. Minimum bet is ${TEMP_MIN_REQ}`)
      }
    })
  }

  render() {
    const { children } = this.props
    const { deck, players, currentLevel, handWinners, currentStreet, communityCards, nextPlayerToAct, pot } = this.state

    return cloneElement(children, {
      pot,
      deck,
      players,
      handWinners,
      currentLevel,
      currentStreet,
      communityCards,
      nextPlayerToAct,
      handleDealing: this.handleDealing,
      handlePostBlinds: this.handlePostBlinds,
      handlePlayerBets: this.handlePlayerBets,
      handleNextPlayerToAct: this.handleNextPlayerToAct,
    })

  }
}

export default GameManager
