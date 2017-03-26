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

  players = initializePlayers(GameManager.TOTAL_PLAYERS, GameManager.STARTING_STACK)
  levels = initializeLevels()

  constructor() {
    super()
    this.state = {
      pot: 0,
      deck: [],
      levels: this.levels,
      players: this.players,
      positions: {},
      handHistory: [],
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
    const { playersInTheHand, nextPlayerToAct } = this.state
    // Update the list of players that are still in the hand
    const alivePlayers = this.handleCheckingAlivePlayers()
    if (alivePlayers && alivePlayers.length !== playersInTheHand.length) {
      this.setState((prevState) => {
        return {
          playersInTheHand: alivePlayers
        }
      })
    }

    if (nextPlayerToAct === null || nextPlayerToAct === undefined) {
    //this.handleDealing() todo
    }
  }

  componentDidMount() {
    this.handleCalculatingPositions()
    this.handleDealing()
  }

  handleCalculatingPositions = () => {
    this.setState((prevState) => {
      const { players, handHistory } = prevState
      const totalPlayers = players.length

      return {
        positions: {
          bb: (handHistory.length + totalPlayers - 1) % totalPlayers,
          sb: (handHistory.length + totalPlayers - 2) % totalPlayers,
          button: (handHistory.length + totalPlayers - 3) % totalPlayers,
          cutoff: (handHistory.length + totalPlayers - 4) % totalPlayers,
          hijack: (handHistory.length + totalPlayers - 5) % totalPlayers,
          mp1: (handHistory.length + totalPlayers - 6) % totalPlayers,
          mp: (handHistory.length + totalPlayers - 7) % totalPlayers,
          utg1: (handHistory.length + totalPlayers - 8) % totalPlayers,
          utg: (handHistory.length + totalPlayers - 9) % totalPlayers,
        },
        nextPlayerToAct: (handHistory.length + totalPlayers - 9) % totalPlayers,
      }
    })
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
  handleCollectingPlayerPots = () => {
    this.setState((prevState) => {
      const { players, pot } = prevState
      const amountsFromPlayerPots = players.reduce((acc, player) => player.chipsCurrentlyInvested + acc, 0)
      console.log(amountsFromPlayerPots)
      return {
        pot: amountsFromPlayerPots + pot
      }
    })
  }

  /**
   * Handles winner determination and paying out chips in the pot
   */
  handleDetermineAndPayWinnersOnShowdown = () => {
    this.setState(({ players, communityCards, pot }) => {
      const winners = winnerDetermination(players, communityCards)
      const amountWon = pot/winners.length

      winners.forEach((winner) => {
        const currentWinnerChips = winner.chips
        winner.chips = round(currentWinnerChips + amountWon)
        __DEBUG__(`${winner.name } wins ${amountWon} and has ${winner.chips}`)
      })

      return {
        handWinners: winners,
        pot,
        players,
      }
    })
  }

  /**
   * Handles winner determination and paying out chips in the pot
   */
  handlePayingWinnerOnNonShowdown = (winner) => {
    this.handlePuttingChipsInPot()
    this.setState(({ communityCards, pot, handHistory }) => {
      const currentWinnerChips = winner[0].chips
      winner[0].chips = round(currentWinnerChips + pot)
      __DEBUG__(`${winner[0].name } wins ${pot} and has ${winner[0].chips}`)

      return {
        handWinners: winner,
        pot: 0,
        handHistory: handHistory.concat(winner[0].id),
      }
    })

    this.handleResetting()
  }


  /**
   * Handles resetting state to prepare for a new hand
   */
  handleResetting = () => {
    this.setState((prevState) => {
      const { players, positions } = prevState
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
        nextPlayerToAct: positions.bb + 1 === GameManager.TOTAL_PLAYERS ? 0 : positions.bb + 1,
        playersInTheHand: this.players,
        players,
      }
    })

    this.handleCalculatingPositions()
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
      this.handlePostBlinds()
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
      this.handlePayingWinnerOnNonShowdown(alivePlayers)
    } else {
      return alivePlayers
    }
  }


  /**
   * Handle getting the next player capable of acting
   */
  returnNextPlayerToAct = (players, currentPlayerIndex, highestCurrentBettor) => {
    const playerCount = players.length
    const startIndex = (currentPlayerIndex + 1) % playerCount

    for (let index = startIndex; index !== currentPlayerIndex; index = (index + 1) % playerCount) {
      const player = players[index]

      if (!player.hasFolded && player !== highestCurrentBettor && !player.isAllIn) {
        return index
      }
    }

  }

  /**
   * Handles collecting blinds from players
   * Collected blinds go to player's chipsCurrentlyInvested
   * If the round continues the chips will be transferred to the pot via handlePuttingChipsInPot
   */
  handlePostBlinds = () => {
    this.setState((prevState) => {
      const { levels, currentLevel, nextPlayerToAct, players } = prevState
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
    this.setState((prevState) => {
      const { players, pot } = prevState
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

    this.setState((prevState) => {
      const { players, nextPlayerToAct, levels, currentLevel, highestCurrentBet, highestCurrentBettor } = prevState
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
          nextPlayerToAct: this.returnNextPlayerToAct(players, currentPlayer.index, _highestCurrentBettor),
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
    this.setState(({ players, nextPlayerToAct, highestCurrentBettor }) => {
      const currentPlayer = players[nextPlayerToAct]
      currentPlayer.holeCards = []
      currentPlayer.hasFolded = true

      return {
        players,
        nextPlayerToAct: this.returnNextPlayerToAct(players, nextPlayerToAct, highestCurrentBettor),
      }
    })
  }

  render() {
    const { children } = this.props
    const { deck, players, currentLevel, handWinners, positions, currentStreet, highestCurrentBet, highestCurrentBettor, communityCards, nextPlayerToAct, pot } = this.state

    return cloneElement(children, {
      pot,
      deck,
      players,
      positions,
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
