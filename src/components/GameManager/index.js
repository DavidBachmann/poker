import { Component, cloneElement } from 'react'
import { round, find } from 'lodash'
import __DEBUG__ from '../../utils/__DEBUG__'
import { initializePlayers, initializeLevels } from '../../utils/initializer'
import generateShuffledDeck from '../../utils/generateShuffledDeck'
import getAmountTakenFromBlindedPlayers from './getAmountTakenFromBlindedPlayers'
import winnerDetermination from './winnerDetermination'

class GameManager extends Component {
  static STARTING_STACK = 1500
  static TOTAL_PLAYERS = 6
  static MAX_HANDS_PER_LEVEL = 25

  players = initializePlayers(GameManager.TOTAL_PLAYERS, GameManager.STARTING_STACK)
  levels = initializeLevels()

  emergency_stop = false
  can_deal = true

  constructor() {
    super()
    this.state = {
      pot: 0,
      deck: [],
      levels: this.levels,
      players: this.players,
      showdown: false,
      positions: {},
      handHistory: [],
      handWinners: [],
      currentLevel: 1,
      currentStreet: 0,
      communityCards: {flop: {}, turn: {}, river: {}},
      nextPlayerToAct: 0,
      playersInTheHand: this.players,
      highestCurrentBet: 0,
      whatPlayerIsDealer: null,
      highestCurrentBettor: null,
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    const { nextPlayerToAct } = this.state

    if (prevState.nextPlayerToAct !== nextPlayerToAct && nextPlayerToAct === -1 && this.can_deal) {
      await this.handleDealing()
    }
  }

  async moveGameForward() {
    const { playersInTheHand, handWinners } = this.state
    // Update the list of players that are still in the hand
    const alivePlayers = this.returnAlivePlayers()
    if (alivePlayers && alivePlayers.length !== playersInTheHand.length) {
      this.setState(() => {
        return {
          playersInTheHand: alivePlayers
        }
      })
    }

    if ((!this.emergency_stop && alivePlayers && alivePlayers.length === 1 && handWinners.length === 0) || this.state.showdown) {
      this.emergency_stop = true
      this.can_deal = false
      this.handlePuttingChipsInPot()
      await this.handleWinnerSelection(alivePlayers)
    }


    if (handWinners.length >= 1) {
      __DEBUG__('handWinners.length >= 1')
      __DEBUG__('Resetting and stuff from moveGameForward')
      this.delayAndRestart()
    }
  }

  componentDidMount() {
    this.thingsToDoWhenStartingAHand()
  }

  async delayAndRestart() {
    await this.delay(1000)
    await this.handleResetting()
    await this.thingsToDoWhenStartingAHand()
  }

  async thingsToDoWhenStartingAHand() {
    this.emergency_stop = false
    this.can_deal = true
    await this.handleCalculatingPositions()
    await this.handleDealing()
    await this.handlePostBlinds()
    this.moveGameForward()
  }

  delay = (amount) => new Promise(resolve => setTimeout(resolve, amount))

  /**
   * Handles winner determination and paying out chips in the pot
   */
  handleWinnerSelection = (players) => {
    __DEBUG__('Calling handleWinnerSelection')
    const { communityCards } = this.state
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
  payWinner = (winner) => {

    if (!winner) {
      throw new Error('no winner...')
    }

    if (this.emergency_stop) {
      return
    }

    this.emergency_stop = true

    this.setState((prevState) => {
      const { players, communityCards, pot, handHistory  } = prevState

      if (winner.length && winner.length > 1) {
        const winners = winnerDetermination(winner, communityCards)
        const amountWon = pot/winners.length

        winners.forEach((each) => {
          const winnerObj = find(players, (player) => player.id === each.id)
          const currentWinnerChips = winnerObj.chips
          winnerObj.chips = round(currentWinnerChips + amountWon)
          __DEBUG__(`${winnerObj.name } wins ${amountWon} and has ${winnerObj.chips}`)
          return winnerObj
        })

        return {
          handWinners: winners,
          handHistory: handHistory.concat(winners),
          players
        }
      }

      if (winner.length && winner.length === 1) {
        const winnerObj = find(players, (player) => player.id === winner[0].id)
        const currentWinnerChips = winnerObj.chips
        winnerObj.chips = round(currentWinnerChips + pot)
        __DEBUG__(`${winnerObj.name } wins ${pot} and has ${winnerObj.chips}`)

        return {
          handWinners: [...winner],
          handHistory: handHistory.concat(winner),
          players
        }
      }
    })

    this.delayAndRestart()
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
          mp: (handHistory.length + totalPlayers - 5) % totalPlayers,
          utg: (handHistory.length + totalPlayers - 6) % totalPlayers,
        },
        whatPlayerIsDealer: (handHistory.length + totalPlayers - 3) % totalPlayers,
      }
    })
  }

  handleCheckingHowManyPlayersHaveYetToAct() {
    const { players } = this.state
    return players.filter(player => player.chipsCurrentlyInvested === 0 && !player.hasFolded)
  }

  dealPlayerCards() {
    const { players } = this.state
    const deck = generateShuffledDeck()

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

      return {
        pot: amountsFromPlayerPots + pot
      }
    })
  }

  /**
   * Handles resetting state to prepare for a new hand
   */
  handleResetting = () => {
    this.setState((prevState) => {
      const { players, whatPlayerIsDealer } = prevState

      players.forEach((player) => {
        player.chipsCurrentlyInvested = 0
        player.holeCards = []
        player.hand = []
        player.hasFolded = false
        player.isAllIn = false
      })

      return {
        communityCards: {flop: {}, turn: {}, river: {}},
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
    const { deck, communityCards, currentStreet, positions, whatPlayerIsDealer } = this.state
    this.handlePuttingChipsInPot()
    // Preflop
    if (currentStreet === 0) {
      this.dealPlayerCards()
      this.setState({
        currentStreet: currentStreet + 1,
        highestCurrentBet: 0,
        nextPlayerToAct: positions.utg,
        highestCurrentBettor: null,
      })
    }

    // Flop
    else if (currentStreet === 1) {
      __DEBUG__('Currentstreet === 1')
      this.setState({
        currentStreet: currentStreet + 1,
        highestCurrentBet: 0,
        highestCurrentBettor: null,
        nextPlayerToAct: whatPlayerIsDealer,
        communityCards: {...communityCards, flop: deck.splice(0, 3)},
      })
      this.setState(this.returnNextPlayerToAct)
    }

    // Turn
    else if (currentStreet === 2) {
      __DEBUG__('Currentstreet === 2')
      this.setState({
        currentStreet: currentStreet + 1,
        highestCurrentBet: 0,
        highestCurrentBettor: null,
        nextPlayerToAct: whatPlayerIsDealer,
        communityCards: {...communityCards, turn: deck.splice(0, 1)},
      })
      this.setState(this.returnNextPlayerToAct)
    }

    // River
    else if (currentStreet === 3) {
      __DEBUG__('Currentstreet === 3')
      this.setState({
        currentStreet: currentStreet + 1,
        communityCards: {...communityCards, river: deck.splice(0, 1)},
        highestCurrentBet: 0,
        highestCurrentBettor: null,
        nextPlayerToAct: whatPlayerIsDealer,
      })
      this.setState(this.returnNextPlayerToAct)
    }

    else {
      this.handleWinnerSelection()
    }
  }

  returnAlivePlayers = () => {
    const { players } = this.state
    if (!players) {
      return
    }

    return players.filter(player => !player.hasFolded)
  }

  /**
   * Handle getting the next player capable of acting
   */
  returnNextPlayerToAct = (state) => {
    const { players, nextPlayerToAct: currentPlayerIndex, highestCurrentBettor } = state
    const playerCount = players.length
    const startIndex = (currentPlayerIndex + 1) % playerCount
    const _highestCurrentBet = highestCurrentBettor && highestCurrentBettor.chipsCurrentlyInvested

    for (let index = startIndex; index !== currentPlayerIndex; index = (index + 1) % playerCount) {
      const player = players[index]
      if (!player.hasFolded && player.chipsCurrentlyInvested !== _highestCurrentBet && !player.isAllIn) {
        return { nextPlayerToAct: index }
      }
    }

    return { nextPlayerToAct: -1 }
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

    // this.setState(updateBets(amountRequested))
    // this.setState(moveGameForward())

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
          highestCurrentBet: newHighestCurrentBet ? newHighestCurrentBet : highestCurrentBet,
          highestCurrentBettor: _highestCurrentBettor,
        }
      } else {
        __DEBUG__(`${currentPlayer.name} bets illegal amount: ${amountRequested}. Minimum bet is ${actualMinAmount}`)
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
    const { children } = this.props
    const { deck, players, currentLevel, handWinners, showdown, positions, currentStreet, highestCurrentBet, highestCurrentBettor, communityCards, nextPlayerToAct, pot } = this.state

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
