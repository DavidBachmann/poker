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
    const { playersInTheHand, nextPlayerToAct, currentStreet } = this.state
    // Update the list of players that are still in the hand
    const alivePlayers = this.handleCheckingAlivePlayers()
    if (alivePlayers.length !== playersInTheHand.length) {
      this.setState((state) => {
        return {
          playersInTheHand: alivePlayers
        }
      })
    }

    if (nextPlayerToAct === undefined) {
      // temp, todo
      if (currentStreet <= 3) {
        window.setTimeout(() => {
          this.handleDealing()
        }, 1000)
      } else if (currentStreet === 4) {
        this.handleDetermineAndPayWinners()
        this.setState({
          currentStreet: 5
        })
      }
    }
  }

  componentDidMount() {
    this.handleDealing()
  }

  generateDeck = () => {
    const deck = generateShuffledDeck()
    return deck
  }

  dealPlayerCards() {
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
  handleCollectingPlayerPots = (winners) => {
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
  handleDetermineAndPayWinners = (winner) => {
    // If someone won without showdown we skip the winner check
    if (winner) {
      this.handleCollectingPlayerPots(winner)
      this.setState((state) => {
        const { players, handWinners, pot } = state
        return {
          handWinners: handWinners.concat(winner),
          players,
          pot: pot + winner.chips,
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
  handleResetting = () => {
    this.setState((state) => {
      const { players } = state
      const resetPlayer = (player) => {
        player.chipsCurrentlyInvested = 0
        player.holeCards = []
        player.hand = []
        player.hasFolded = false
        player.isAllIn = false
      }
      players.map((player) => resetPlayer(player))
      return {
        communityCards: {flop: {}, turn: {}, river: {}},
        currentStreet: 0,
        handWinners: [],
        highestCurrentBet: 0,
        highestCurrentBettor: null,
        playersInTheHand: this.players,
        nextPlayerToAct: this.returnNextPlayerToAct(),
        players,
      }
    })
  }

  /**
   * Handle dealing of all cards
   */
  handleDealing = () => {
    const { deck, communityCards, currentStreet } = this.state
    this.handlePuttingChipsInPot()
    // Preflop
    if (currentStreet === 0) {
      this.dealPlayerCards()
      this.setState({
        currentStreet: currentStreet + 1,
        highestCurrentBet: 0,
        highestCurrentBettor: null,
      })
    }

    // Flop
    else if (currentStreet === 1) {
      this.setState({
        currentStreet: currentStreet + 1,
        highestCurrentBet: 0,
        highestCurrentBettor: null,
        communityCards: {...communityCards, flop: deck.splice(0, 3)}
      })
    }

    // Turn
    else if (currentStreet === 2) {
      this.setState({
        currentStreet: currentStreet + 1,
        highestCurrentBet: 0,
        highestCurrentBettor: null,
        communityCards: {...communityCards, turn: deck.splice(0, 1)}
      })
    }

    // River
    else if (currentStreet === 3) {
      this.setState({
        currentStreet: 4, // todo
        communityCards: {...communityCards, river: deck.splice(0, 1)}
      })
    }
    else {
      throw new Error(`Invalid street: ${currentStreet}`)
    }
  }

  handleCheckingAlivePlayers = () => {
    const { players } = this.state
    if (!players) {
      return
    }

    const alivePlayers = players.filter(player => !player.hasFolded)

    if (alivePlayers.length === 1) {
      this.handleDetermineAndPayWinners(alivePlayers[0])
      this.handleResetting()
    } else {
      return alivePlayers
    }
  }

  checkIfPlayerAtIndexCanAct = (index, currentPlayerIndex, highestCurrentBettor) => {
    const { players } = this.state

    if (!index || index === GameManager.TOTAL_PLAYERS - 1) {
      index = 0
    }

    if (
      players[index] === players[currentPlayerIndex] ||
      players[index].hasFolded ||
      players[index] === highestCurrentBettor ||
      players[index].isAllIn
    ) {
      // Can't act
      return false
    } else {
      // Can act
      return true
    }

  }


  /**
   * Handle getting the next player capable of acting
   */
  returnNextPlayerToAct = (currentPlayerIndex, highestCurrentBettor) => {
    const canNextPlayerAct = this.checkIfPlayerAtIndexCanAct(currentPlayerIndex + 1)
    if (canNextPlayerAct) {
      return currentPlayerIndex + 1
    } else {
      const { players } = this.state
      const playerToReturn = players.find(
        (player) => this.checkIfPlayerAtIndexCanAct(player.index, currentPlayerIndex, highestCurrentBettor)
      )

      if (playerToReturn) {
        return playerToReturn.index
      } else {
        this.handleDealing()
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
  handlePuttingChipsInPot = () => {
    this.setState((state) => {
      const { players, pot } = state
      const amountOfChipsToTransfer = players.reduce((acc, player) => player.chipsCurrentlyInvested + acc, 0)
      // Empty chipsCurrentlyInvested
      players.map((player) => player.chipsCurrentlyInvested = 0)
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
      if (amountRequested >= currentPlayer.chips) {
        currentPlayer.isAllIn = true
      }
      // Check if the player is betting the mininum required
      // By default that's 2xBB
      const defaultMinAmount = levels[currentLevel].bigBlind * 2
      // Unless someone has bet higher
      // If we have chipsCurrentlyInvested, we don't have to pay that amount again to call or raise the current bet.
      const actualMinAmount = highestCurrentBet > defaultMinAmount ? (highestCurrentBet - chipsCurrentlyInvested) : defaultMinAmount

      // The bet has to be higher than the mininum allowed
      if (amountOfChipsToBet >= actualMinAmount) {
        // Remove the amount requested from the player,
        currentPlayer.chips -= amountOfChipsToBet
        // and then put into chipsCurrentlyInvested
        currentPlayer.chipsCurrentlyInvested += amountOfChipsToBet
        if (amountOfChipsToBet > highestCurrentBet) {
          newHighestCurrentBet = amountOfChipsToBet
          newHighestCurrentBettor = currentPlayer
          __DEBUG__(`New highest current bettor is ${newHighestCurrentBettor.name}`)
        }
        const _highestCurrentBettor = newHighestCurrentBettor ? newHighestCurrentBettor : highestCurrentBettor
        return {
          players,
          nextPlayerToAct: this.returnNextPlayerToAct(currentPlayer.index, _highestCurrentBettor),
          highestCurrentBet: newHighestCurrentBet ? newHighestCurrentBet : highestCurrentBet,
          highestCurrentBettor: _highestCurrentBettor,
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
      const { players, nextPlayerToAct, highestCurrentBettor } = state
      const currentPlayer = players[nextPlayerToAct]
      currentPlayer.holeCards = []
      currentPlayer.hasFolded = true

      return {
        players,
        nextPlayerToAct: this.returnNextPlayerToAct(currentPlayer.index, highestCurrentBettor),
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
    })

  }
}

export default GameManager
