import { PureComponent, cloneElement } from 'react'
import __DEBUG__ from '../../utils/__DEBUG__'
import { initializePlayers, initializeLevels } from '../../utils/initializer'
import generateShuffledDeck from '../../utils/generateShuffledDeck'

class GameManager extends PureComponent {
  static STARTING_STACK = 1500
  static TOTAL_PLAYERS = 9
  static MAX_HANDS_PER_LEVEL = 25

  players = initializePlayers(GameManager.TOTAL_PLAYERS, GameManager.STARTING_STACK)
  levels = initializeLevels()
  deck = this.generateDeck

  constructor() {
    super()
    this.state = {
      deck: this.deck,
      players: this.players,
      levels: this.levels,
      nextPlayerToAct: 0,
      currentLevel: 1,
      currentStreet: 0,
      communityCards: {flop: {}, turn: {}, river: {}},
    }
  }


  generateDeck = () => {
    const deck = generateShuffledDeck()
    return deck
  }

  bootstrapPlayers(deck) {
    const players = initializePlayers(GameManager.TOTAL_PLAYERS, GameManager.STARTING_STACK)

    players.forEach((player) => {
      player.holeCards = deck.splice(0, 2)
    })

    this.setState({
      deck,
      players,
    })

  }


  handleDealStreets(street = this.state.currentStreet) {
    const { deck, communityCards, currentStreet } = this.state

    if (currentStreet === 1) {
      communityCards.flop = deck.splice(0, 3)
    }
    if (currentStreet === 2) {
      communityCards.turn = deck.splice(0, 1)
    }
    if (currentStreet === 3) {
      communityCards.river = deck.splice(0, 1)
    }

    return {
      deck,
      communityCards
    }
  }

  componentWillMount() {

  }

  render() {
    const { children } = this.props
    const { deck, players, currentLevel, nextPlayerToAct } = this.state
    return cloneElement(children, {
      deck,
      players,
      currentLevel,
      nextPlayerToAct,
      handleDealStreets: this.handleDealStreets
    })

  }
}

export default GameManager
