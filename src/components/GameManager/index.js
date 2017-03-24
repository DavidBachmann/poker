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
      pot: 0,
      deck: [],
      levels: this.levels,
      players: this.players,
      handWinners: [],
      currentLevel: 1,
      currentStreet: 0,
      nextPlayerToAct: 0,
      playersInTheHand: this.players,
      highestCurrentBet: 0,
      highestCurrentBettor: null,
      communityCards: {flop: {}, turn: {}, river: {}},
    }
  }

  componentDidUpdate() {
    const { playersInTheHand } = this.state

    // Update the list of players that are still in the hand
    const alivePlayers = this._handleCheckingAlivePlayers()
    if (alivePlayers.length !== playersInTheHand.length) {
      this.setState((state) => {
        return {
          playersInTheHand: alivePlayers
        }
      })
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
   * Handles collecting player pots into the pot
   */
  _handleCollectingPlayerPots = (winners) => {
    this.setState((state) => {
      const { players, pot } = state
      const amountsFromPlayerPots = players.reduce((acc, player) => player.chipsCurrentlyInvested + acc, 0)
      return {
        pot: amountsFromPlayerPots + pot
      }
    })
  }
  /**
   * Handles winner determination and paying out chips in the pot
   */
  _handleDetermineAndPayWinners = (winner) => {
    // If someone won without showdown we skip the winner check
    if (winner) {
      this._handleCollectingPlayerPots(winner)
      this.setState((state) => {
        const { players, handWinners, pot } = state
        winner.chips += pot
        return {
          handWinners: handWinners.concat(winner),
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
      const { players } = state
      const resetPlayer = (player) => {
        player.chipsCurrentlyInvested = 0
        player.holeCards = []
        player.hand = []
        player.hasFolded = false
      }
      players.map((player) => resetPlayer(player))
      return {
        communityCards: {flop: {}, turn: {}, river: {}},
        currentStreet: 0,
        handWinners: [],
        highestCurrentBet: 0,
        highestCurrentBettor: null,
        playersInTheHand: this.players,
        players,
      }
    })
  }

  /**
   * Handle dealing of all cards
   */
  handleDealing = () => {
    const { deck, communityCards, currentStreet } = this.state

    // Preflop
    if (currentStreet === 0) {
      this.handleNextPlayerToAct()
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
    if (!players) {
      return
    }

    let alivePlayers = players.filter(player => !player.hasFolded)

    return alivePlayers
  }

  helperNextPlayerToAct = (index) => {
    const { players, highestCurrentBettor } = this.state
    if (!players) {
      __DEBUG__('No players so we returned false')
      return
    }
    // Checking if player[index] has folded
    if (players[index] && players[index].hasFolded) {
      __DEBUG__('Player has folded so we returned false')
      return false
      // checking if player[index] is the current highest bettor.
    } else if (players[index] === highestCurrentBettor) {
      __DEBUG__('player[index] is the current highest bettor so we returned false')
      return false
      // We found nothing that indicates that player[index]
      // shouldn't act so we proceed with the game.
    } else {
      __DEBUG__(`We found nothing that indicates that players[${[index]}] (${players[index].name}) shouldn't act so we returned true.`)
      return true
    }
  }


  /**
   * Handle switching to next player
   */
  handleNextPlayerToAct = (index) => {
    const { nextPlayerToAct, players } = this.state
    // First check if there's anyone left to act
    const whosLeft = this._handleCheckingAlivePlayers()
    if (whosLeft.length === 1) {
      this._handleDetermineAndPayWinners(whosLeft[0])
      this._handleResetting()
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
        if (indexToCheck + 1 !== GameManager.TOTAL_PLAYERS - 1) {
          __DEBUG__(`indexToCheck+1 is ${indexToCheck+1} which is ${players[indexToCheck+1].name}`)
          this.handleNextPlayerToAct(indexToCheck+1)
        } else {
          __DEBUG__(`I think we should deal now`)
          this.handleDealing()
        }
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
    let newHighestCurrentBettor = null
    this.setState((state) => {
      const { players, nextPlayerToAct, levels, currentLevel, highestCurrentBet, highestCurrentBettor } = state
      const currentPlayer = players[nextPlayerToAct]
      const chipsCurrentlyInvested = currentPlayer.chipsCurrentlyInvested
      // If the player is betting more than he can afford
      // we put him all in and bet his whole stack
      // else we'll honor the requested amount.
      const amountOfChipsToBet = amountRequested <= currentPlayer.chips ? amountRequested : currentPlayer.chips
      // Check if the player is betting the mininum required
      // By default that's 2xBB
      const defaultMinAmount = levels[currentLevel].bigBlind * 2
      // Unless someone has bet higher
      const actualMinAmount = highestCurrentBet > defaultMinAmount ? (highestCurrentBet - chipsCurrentlyInvested) : defaultMinAmount

      // The bet has to be higher than the mininum allowed
      if (amountOfChipsToBet >= actualMinAmount) {
        // Remove the amount requested from the player,
        currentPlayer.chips -= amountOfChipsToBet
        // and put into chipsCurrentlyInvested
        currentPlayer.chipsCurrentlyInvested += amountOfChipsToBet
        if (amountOfChipsToBet > highestCurrentBet) {
          newHighestCurrentBet = amountOfChipsToBet
          newHighestCurrentBettor = currentPlayer
          __DEBUG__(`Raise! New highest current bettor is ${newHighestCurrentBettor.name}`)
        } else {
          __DEBUG__('No new highest bettor yet.')
        }
        return {
          players,
          nextPlayerToAct: this.handleNextPlayerToAct(),
          highestCurrentBet: newHighestCurrentBet ? newHighestCurrentBet : highestCurrentBet,
          highestCurrentBettor: newHighestCurrentBettor ? newHighestCurrentBettor : highestCurrentBettor,
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
