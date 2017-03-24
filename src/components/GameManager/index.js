import { Component, cloneElement } from 'react'
import { find, round } from 'lodash'
import __DEBUG__ from '../../utils/__DEBUG__'
import { initializePlayers, initializeLevels } from '../../utils/initializer'
import generateShuffledDeck from '../../utils/generateShuffledDeck'
import getAmountTakenFromBlindedPlayers from './getAmountTakenFromBlindedPlayers'
import winnerDetermination from './winnerDetermination'

class GameManager extends Component {
  static STARTING_STACK = 1500
  static TOTAL_PLAYERS = 3
  static MAX_HANDS_PER_LEVEL = 25
  static __ROBOT_DEALER_ACTIVATE__ = false

  players = initializePlayers(GameManager.TOTAL_PLAYERS, GameManager.STARTING_STACK)
  levels = initializeLevels()

  constructor() {
    super()
    this.state = {
      pot: 0,
      deck: [],
      levels: this.levels,
      players: this.players,
      handWinners: [],
      currentLevel: 1,
      currentStreet: 0,
      nextPlayerToAct: 0,
      playersInTheHand: [],
      highestCurrentBet: 0,
      highestCurrentBettor: {},
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
        this._handleDetermineAndPayWinners()
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

  /**
   * Handles winner determination and paying out chips in the pot
   */
  _handleDetermineAndPayWinners = (winnerWithoutShowdown) => {
    // If someone won without showdown we skip the winner check
    if (winnerWithoutShowdown) {
      console.log(winnerWithoutShowdown)
      this.setState((state) => {
        const { players, pot } = state
        const winnerObj = find(players, (player) => player.id === winnerWithoutShowdown.id)
        const winnerChips = winnerObj.chips
        winnerObj.chips = round(winnerChips + pot)

        return {
          handWinners: [...winnerWithoutShowdown],
          players,
        }
      })
    } else {
      this.setState((state) => {
        const { players, communityCards, pot  } = state
        const winners = winnerDetermination(players, communityCards)
        const amountWon = pot/winners.length

        winners.forEach((winner) => {
          const winnerObj = find(players, (player) => player.id === winner.id)
          const currentWinnerChips = winnerObj.chips
          winnerObj.chips = round(currentWinnerChips + amountWon)
          __DEBUG__(`${winnerObj.name } wins ${amountWon} and has ${winnerObj.chips}`)
          return winnerObj
        })

        return {
          handWinners: winners,
          pot,
          players,
        }
      })
    }
  }

  /**
   * Handles resetting state to prepare for a new hand
   */
  _handleResetting = () => {
    this.setState((state) => {

      return {
        communityCards: {flop: {}, turn: {}, river: {}},
        handWinners: [],
      }
    })
    this.handleNextPlayerToAct()
  }

  /**
   * Handle dealing of all cards
   */
  handleDealing = () => {
    const { deck, communityCards, currentStreet } = this.state

    // Get a list of players that haven't folded
    this.setState((state) => {
      const { players } = state

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

  _handleCheckingAlivePlayers = () => {
    const { players } = this.state
    let alivePlayers = players.filter(player => !player.hasFolded)

    this.setState((state) => {
      return {
        playersInTheHand: alivePlayers
      }
    })

    return alivePlayers
  }

  helperNextPlayerToAct = (index) => {
    const { players, highestCurrentBettor } = this.state
    if (!players) {
      return
    }
    // Checking if player[index] has folded
    if (players[index] && players[index].hasFolded) {
      return false
      // checking if player[index] is the current highest bettor.
    } else if (players[index] === highestCurrentBettor) {
      return false
      // We found nothing that indicates that player[index]
      // shouldn't act so we proceed with the game.
    } else {
      return true
    }
  }


  /**
   * Handle switching to next player
   */
  handleNextPlayerToAct = (index) => {
    const { nextPlayerToAct } = this.state
    // First check if there's anyone left to act
    const whosLeft = this._handleCheckingAlivePlayers()
    if (whosLeft.length === 1) {
      console.log(whosLeft[0])
      console.log(whosLeft[0].name + ' won')
      return
    }
    // The basics — If we are at the end, next should be 0
    if (nextPlayerToAct === GameManager.TOTAL_PLAYERS - 1) {
      // Was the function called without a index? Then we use 0.
      // Else we use provided index.
      let indexToCheck = !index ? 0 : index
      if (this.helperNextPlayerToAct(indexToCheck)) {
        return indexToCheck
      } else {
        __DEBUG__('Hit else in upper check')
        this.handleNextPlayerToAct(indexToCheck+1)
      }
    }
    // The basics — If we aren't at the end, it's next player turn
    else {
      let indexToCheck = !index ? nextPlayerToAct + 1 : index
      if (this.helperNextPlayerToAct(indexToCheck)) {
        return indexToCheck
      } else {
        __DEBUG__('Hit else in lower check')
        this.handleNextPlayerToAct(indexToCheck+1)
      }
    }
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
      const bigBlindPosition = (nextPlayerToAct + TOTAL_PLAYERS - 1) % TOTAL_PLAYERS
      const smallBlindPosition = (nextPlayerToAct + TOTAL_PLAYERS - 2) % TOTAL_PLAYERS
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
   * Handles player's betting (bet, raise, push)
   */
  handlePlayerBets = (amountRequested) => {
    let newHighestCurrentBet = null

    this.setState((state) => {
      const { players, nextPlayerToAct, levels, currentLevel, highestCurrentBet } = state
      const currentPlayer = players[nextPlayerToAct]
      // If the player is betting more than he can afford
      // we put him all in and bet his whole stack
      // else we'll honor the requested amount.
      const amountOfChipsToBet = amountRequested <= currentPlayer.chips ? amountRequested : currentPlayer.chips
      // Check if the player is betting the mininum required
      // By default that's 2xBB
      const defaultMinAmount = levels[currentLevel].bigBlind * 2
      // Unless someone has bet higher
      const actualMinAmount = highestCurrentBet > defaultMinAmount ? highestCurrentBet : defaultMinAmount

      // The bet has to be higher than the mininum allowed
      if (amountOfChipsToBet >= actualMinAmount) {
        // Remove the amount requested from the player,
        currentPlayer.chips -= amountOfChipsToBet
        // and put into chipsCurrentlyInvested
        currentPlayer.chipsCurrentlyInvested += amountOfChipsToBet
        if (amountOfChipsToBet > highestCurrentBet) {
          newHighestCurrentBet = amountOfChipsToBet
        }
        return {
          players,
          nextPlayerToAct: this.handleNextPlayerToAct(),
          highestCurrentBet: newHighestCurrentBet ? newHighestCurrentBet : highestCurrentBet,
          highestCurrentBettor: currentPlayer,
        }
      } else {
        __DEBUG__(`${currentPlayer.name} bets illegal amount: ${amountRequested}. Minimum bet is ${actualMinAmount}`)
      }
    })
  }

  /**
   * Handles player's folding
   */
  handlePlayerFolds = () => {
    this.setState((state) => {
      const { players, nextPlayerToAct } = state
      const currentPlayer = players[nextPlayerToAct]
      currentPlayer.holeCards = []
      currentPlayer.hasFolded = true

      return {
        players,
        nextPlayerToAct: this.handleNextPlayerToAct(),
      }
    })
  }

  render() {
    const { children } = this.props
    const { deck, players, currentLevel, handWinners, currentStreet, highestCurrentBet, highestCurrentBettor, communityCards, nextPlayerToAct, pot } = this.state

    return cloneElement(children, {
      pot,
      deck,
      players,
      handWinners,
      currentLevel,
      currentStreet,
      communityCards,
      nextPlayerToAct,
      highestCurrentBet,
      highestCurrentBettor,
      handleDealing: this.handleDealing,
      handlePostBlinds: this.handlePostBlinds,
      handlePlayerBets: this.handlePlayerBets,
      handlePlayerFolds: this.handlePlayerFolds,
      handleNextPlayerToAct: this.handleNextPlayerToAct,
    })

  }
}

export default GameManager
