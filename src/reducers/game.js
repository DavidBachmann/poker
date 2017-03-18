import uuidV1 from 'uuid/v1' // V1 is time based UUID
import determineWinner from '../utils/determineWinner'
import dealCards from '../utils/dealCards'
import { initializePlayers, initializePlayerPots } from '../utils/initializer'
import generateShuffledDeck from '../utils/generateShuffledDeck'
import { concat } from 'lodash'
import generateLevels from '../utils/generateLevels'
import payOutChips from '../utils/payOutChips'
import checkForPlayerElimination from '../utils/checkForPlayerElimination'
import checkIfTournamentIsOver from '../utils/checkIfTournamentIsOver'
import getAmountTakenFromBlindedPlayers from '../utils/getAmountTakenFromBlindedPlayers'

const STARTING_STACK = 1500
const TOTAL_PLAYERS = 9

const initialState = {
  communityCards: {}, // Object of dealt community cards
  currentLevel: 1, // Starting level
  dealerMessage: '', // Dealer message displayed to players on table
  deck: [], // Current deck of cards
  handHistory: [], // Empty hand history
  handWinners: null, // We haven't selected a winner yet
  howMuchToCall: 0, // how much does a player have to pay to be able to call the current bet
  level: generateLevels(),
  nextToAct: 0, // Player at index 0 starts (TODO)
  paused: false, // Game is not paused
  playerPots: initializePlayerPots(TOTAL_PLAYERS), // Chips each player has bet and will be going into the pot
  players: initializePlayers(TOTAL_PLAYERS, STARTING_STACK), // Initialized players
  pot: 0, // Chips currently in the pot
  showdown: false, // Showdown means the round is over and all remaining players should reveal their hands
  sidepot: [], // Array of sidepots
  started: false, // Game is not started
  street: 0, // {0: 'preflop', 1: 'flop', 2: 'turn', 3: 'river'} (TODO)
  tournamentWinner: null, // Who won the tournament
  waitingForPlayer: false,
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
    nextToAct,
    playerPots,
    players,
    pot,
    street,
  } = state

  const isFirstToAct = (nextToAct + TOTAL_PLAYERS) % TOTAL_PLAYERS
  const nextToActCheck = nextToAct >= players.length -1 ? 0 : handHistory.length === 0 ? 0 : nextToAct + 1

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
        nextToAct: nextToActCheck,
        pot: 0,
        showdown: false,
        started: true,
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
      if (street >= 4) {
        return
      }
      return {
        ...state,
        ...dealCards(deck, players, street, communityCards),
        street: street + 1,
      }
    }

    case 'NEXT_LEVEL':
      return {
        ...state,
        currentLevel: currentLevel + 1,
      }

    case 'POST_BLINDS': {
      const totalPlayers = players.length
      const bbPosition = (nextToAct + totalPlayers - 1) % totalPlayers
      const sbPosition = (nextToAct + totalPlayers - 2) % totalPlayers
      const { smallBlind, bigBlind } = level[currentLevel]

      return {
        ...state,
        pot: pot + getAmountTakenFromBlindedPlayers(players, sbPosition, smallBlind) + getAmountTakenFromBlindedPlayers(players, bbPosition, bigBlind),
        players,
      }
    }

    // Player actions, todo: refactor into its own reducer

    case 'PLAYER_ACTION_ALL_IN': {
      let currentPlayer = players[nextToAct]
      let chipsBetByPlayer = currentPlayer.chips
      currentPlayer.chips -= chipsBetByPlayer
      playerPots[nextToAct] = chipsBetByPlayer

      return {
        ...state,
        nextToAct: nextToActCheck,
        howMuchToCall: chipsBetByPlayer
      }
    }

    case 'PLAYER_ACTION_BET': {
      let currentPlayer = players[nextToAct]
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
        playerPots[nextToAct] = chipsBetByPlayer

        return {
          ...state,
          nextToAct: nextToActCheck,
          howMuchToCall: chipsBetByPlayer
        }
      } else {
        return {
          ...state
        }
      }
    }

    case 'PLAYER_ACTION_CALL': {
      let player = players[nextToAct]
      let chipsBetByPlayer = howMuchToCall
      player.chips -= chipsBetByPlayer
      playerPots[nextToAct] = chipsBetByPlayer

      return {
        ...state,
        nextToAct: nextToAct + 1,
      }
    }

    case 'PLAYER_ACTION_FOLD': {
      let player = players[nextToAct]

      // Can only fold if not first to act.
      if (isFirstToAct !== player.index) {
        player.cards = []
        return {
          ...state,
          nextToAct: nextToActCheck,
        }
      }

      return {
        ...state,
      }
    }

    case 'WAITING_FOR_PLAYER_TO_ACT': {
      return {
        ...state,
        dealerMessage: `Waiting for ${players[nextToAct].name} to act.`,
        waitingForPlayer: true,
      }
    }

    default:
      return state
  }
}
