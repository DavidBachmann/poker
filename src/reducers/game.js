import uuidV1 from 'uuid/v1' // V1 is time based UUID
import { concat } from 'lodash'
import __DEBUG__ from '../utils/__DEBUG__'
import determineWinner from '../utils/determineWinner'
import dealCards from '../utils/dealCards'
import { initializePlayers, initializePlayerPots } from '../utils/initializer'
import generateShuffledDeck from '../utils/generateShuffledDeck'
import generateLevels from '../utils/generateLevels'
import payOutChips from '../utils/payOutChips'
import checkForPlayerElimination from '../utils/checkForPlayerElimination'
import checkIfTournamentIsOver from '../utils/checkIfTournamentIsOver'
import getAmountTakenFromBlindedPlayers from '../utils/getAmountTakenFromBlindedPlayers'

const STARTING_STACK = 1500
const TOTAL_PLAYERS = 9

const initialState = {
  communityCards: {},
  currentLevel: 1,
  dealerMessage: '', // Dealer message displayed to players on table
  deck: [],
  handHistory: [],
  handWinners: null,
  howMuchToCall: 0, // how much does a player have to put out to be able to call the current bet
  level: generateLevels(),
  nextPlayerToAct: 0, // Player at index 0 starts (TODO)
  paused: false,
  playerPots: initializePlayerPots(TOTAL_PLAYERS), // Containing the chips each player has bet this round, that will be going into the pot
  players: initializePlayers(TOTAL_PLAYERS, STARTING_STACK), // Initialized players
  pot: 0,
  showdown: false, // Showdown means the round is over and all remaining players should reveal their hands
  sidepot: [], // Array of sidepots (TODO)
  street: 0, // {0: 'preflop', 1: 'flop', 2: 'turn', 3: 'river'} (TODO)
  tournamentWinner: null, // Who won the tournament
}

export default (state = initialState, action) => {
  const {
    communityCards,
    currentLevel,
    deck,
    handHistory,
    handWinners,
    howMuchToCall,
    level,
    nextPlayerToAct,
    playerPots,
    players,
    pot,
    street,
  } = state

  const getNextPlayerToAct = () => {
    if (nextPlayerToAct === TOTAL_PLAYERS - 1 || handHistory.length === 0) {
      return 0
    } else {
      return nextPlayerToAct + 1
    }
  }

  switch (action.type) {
    case 'START': {
      const maxHandsPerLevel = 25
      const newHandId = uuidV1()
      const newHandHistory = concat(handHistory, newHandId)
      const shouldChangeLevel = currentLevel < 19 && handHistory.length % maxHandsPerLevel === 0 && handHistory.length !== 0 // Every 25 hands the level should go up

      return {
        ...state,
        communityCards: {flop: {}, turn: {}, river: {}},
        currentLevel: shouldChangeLevel ? currentLevel + 1 : currentLevel,
        deck: generateShuffledDeck(),
        handHistory: newHandHistory,
        handWinners: null,
        nextPlayerToAct: getNextPlayerToAct(),
        pot: 0,
        showdown: false,
        street: 0,
      }
    }

    case 'PAUSE':
      return {
        paused: true,
      }

    case 'DETERMINE_WINNER': {
      return {
        ...state,
        showdown: true,
        handWinners: determineWinner(players, communityCards),
      }
    }

    case 'PAY_OUT_CHIPS': {
      payOutChips(players, handWinners, pot)
      console.log(checkIfTournamentIsOver(players))

      return {
        ...state,
        players: checkForPlayerElimination(players),
        tournamentWinner: checkIfTournamentIsOver(players),
      }
    }

    case 'DEAL': {
      // Combine playerPots amounts and combine it with the pot
      const newPot = playerPots.reduce((acc, value) => acc + value, 0) + pot

      players.forEach((player) => {
        player.hasActedThisTurn = false
      })

      const nextStreet = street + 1

      return {
        ...state,
        ...dealCards(deck, players, street, communityCards),
        street: nextStreet,
        pot: newPot,
        players,
      }
    }

    case 'NEXT_LEVEL': {
      const nextLevel = currentLevel + 1

      return {
        ...state,
        currentLevel: nextLevel,
      }
    }

    case 'POST_BLINDS': {
      const totalPlayers = TOTAL_PLAYERS
      const bbPosition = (nextPlayerToAct + totalPlayers - 1) % totalPlayers
      const sbPosition = (nextPlayerToAct + totalPlayers - 2) % totalPlayers
      const { smallBlind, bigBlind } = level[currentLevel]
      const newPot = pot + getAmountTakenFromBlindedPlayers(players, sbPosition, smallBlind) + getAmountTakenFromBlindedPlayers(players, bbPosition, bigBlind)

      return {
        ...state,
        pot: newPot,
        players,
      }
    }

    case 'PLAYER_ACTION_BET': {
      let currentPlayer = players[nextPlayerToAct]
      const MIN_AMOUNT = level[currentLevel].bigBlind

      // Player has to bet >= bigBlind
      if (action.amountRequested >= howMuchToCall & action.amountRequested >= MIN_AMOUNT) {
        // Use the amount in currentPlayer's input field
        // -- if he can afford it. Else he's All-In.
        let chipsBetByPlayer = action.amountRequested <= currentPlayer.chips
        ? action.amountRequested
        : currentPlayer.chips
        // Remove the amount from currentPlayer's stack
        currentPlayer.chips -= chipsBetByPlayer
        // Put it into currentPlayer's playerPot
        playerPots[nextPlayerToAct] = chipsBetByPlayer
        currentPlayer.hasActedThisTurn = true

        return {
          ...state,
          nextPlayerToAct: getNextPlayerToAct(),
          howMuchToCall: chipsBetByPlayer
        }
      }

      __DEBUG__(`${currentPlayer.name} bets invalid amount`)
      return state
    }

    case 'PLAYER_ACTION_CALL': {
      let currentPlayer = players[nextPlayerToAct]
      let chipsBetByPlayer = howMuchToCall
      currentPlayer.chips -= chipsBetByPlayer
      playerPots[nextPlayerToAct] = chipsBetByPlayer
      currentPlayer.hasActedThisTurn = true

      return {
        ...state,
        nextPlayerToAct: getNextPlayerToAct(),
      }
    }

    case 'PLAYER_ACTION_FOLD': {
      let currentPlayer = players[nextPlayerToAct]

      // Can only fold if not first to act.
      const temporaryFirstToActIndex = 0 // Todo
      if (currentPlayer.index !== temporaryFirstToActIndex) {
        currentPlayer.cards = []
        currentPlayer.hasActedThisTurn = true

        return {
          ...state,
          nextPlayerToAct: getNextPlayerToAct(),
        }
      }

      __DEBUG__(`${currentPlayer.name} tried to fold when first to act`)
      return state
    }

    default:
      return state
  }
}
