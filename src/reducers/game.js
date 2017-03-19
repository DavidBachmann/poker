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
const MAX_HANDS_PER_LEVEL = 25

const initialState = {
  communityCards: {},
  currentLevel: 1,
  dealerMessage: '', // Dealer message displayed to players on table
  deck: [],
  handHistory: [],
  handWinners: null,
  highestCurrentBet: 0, // how much does a player have to put out to be able to call the current bet
  level: generateLevels(),
  nextPlayerIndexToAct: 0, // Player at index 0 starts (TODO)
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
    highestCurrentBet,
    level,
    nextPlayerIndexToAct,
    playerPots,
    players,
    pot,
    street,
  } = state

  const getNextPlayerIndexToAct = () => {
    if (nextPlayerIndexToAct === TOTAL_PLAYERS - 1 || handHistory.length === 0) {
      return 0
    } else {
      return nextPlayerIndexToAct + 1
    }
  }


  switch (action.type) {
    case 'START': {
      const newHandId = uuidV1()
      const newHandHistory = concat(handHistory, newHandId)
      // Every {MAX_HANDS_PER_LEVEL} hands the level should go up
      const shouldChangeLevel = currentLevel < Object.keys(level).length && handHistory.length % MAX_HANDS_PER_LEVEL === 0 && handHistory.length !== 0

      return {
        ...state,
        communityCards: {flop: {}, turn: {}, river: {}},
        currentLevel: shouldChangeLevel ? currentLevel + 1 : currentLevel,
        deck: generateShuffledDeck(),
        handHistory: newHandHistory,
        handWinners: null,
        nextPlayerIndexToAct: getNextPlayerIndexToAct(),
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
      const bbPosition = (nextPlayerIndexToAct + totalPlayers - 1) % totalPlayers
      const sbPosition = (nextPlayerIndexToAct + totalPlayers - 2) % totalPlayers
      const { smallBlind, bigBlind } = level[currentLevel]
      const sbAmount = getAmountTakenFromBlindedPlayers(players, sbPosition, smallBlind)
      const bbAmount = getAmountTakenFromBlindedPlayers(players, bbPosition, bigBlind)
      const newPot = pot + sbAmount + bbAmount

      playerPots[sbPosition] = sbAmount
      playerPots[bbPosition] = bbAmount

      return {
        ...state,
        highestCurrentBet: bbAmount,
        pot: newPot,
        players,
      }
    }

    case 'PLAYER_ACTION_BET': {
      let currentPlayer = players[nextPlayerIndexToAct]
      const MIN_AMOUNT = level[currentLevel].bigBlind
      // Find out what players are still in the hand, e.g. have not folded.
      const playersStillInTheHand = players.filter(player => player.cards.length > 0)
      // Player has to bet >= highestCurrentBet and >= bigBlind
      if (action.amountRequested >= highestCurrentBet & action.amountRequested >= MIN_AMOUNT) {
        // Use the amount in currentPlayer's input field if he can afford it. Else he's All-In.
        let chipsBetByPlayer = action.amountRequested <= currentPlayer.chips ? action.amountRequested : currentPlayer.chips
        // Check if player has raised so we can let other players know they have to act.
        if (chipsBetByPlayer > highestCurrentBet) {
            playersStillInTheHand.map((player) => player.hasActedThisTurn = false)
            __DEBUG__(`${currentPlayer.name} raises to ${action.amountRequested}. Previous highest bet was ${highestCurrentBet} `)
            __DEBUG__(`Players still in the hand: ${playersStillInTheHand.map(player => player.name)}`)
        }
        // Remove the amount from currentPlayer's stack
        currentPlayer.chips -= chipsBetByPlayer
        // Put it into currentPlayer's playerPot
        playerPots[nextPlayerIndexToAct] = chipsBetByPlayer
        currentPlayer.hasActedThisTurn = true

        return {
          ...state,
          nextPlayerIndexToAct: getNextPlayerIndexToAct(),
          highestCurrentBet: chipsBetByPlayer
        }
      }

      __DEBUG__(`${currentPlayer.name} bets invalid amount`)
      return state
    }

    case 'PLAYER_ACTION_CALL': {
      // Get player
      let currentPlayer = players[nextPlayerIndexToAct]
      // Get the amount he has invested in this round
      let currentPlayerAlreadyInvested = playerPots[nextPlayerIndexToAct]
      // Let the player bet the difference of how much he has already invested minus how much the pot is.
      // This is so if the player has already bet, and facing a raise,
      // he doesn't have to pay the whole raised amount but only the difference.
      let chipsBetByPlayer = highestCurrentBet - currentPlayerAlreadyInvested
      // Take the chips from his stack
      currentPlayer.chips -= chipsBetByPlayer
      // currentPlayerAlreadyInvested = chipsBetByPlayer
      currentPlayer.hasActedThisTurn = true

      return {
        ...state,
        nextPlayerIndexToAct: getNextPlayerIndexToAct(),
      }
    }

    case 'PLAYER_ACTION_CHECK': {
      let currentPlayer = players[nextPlayerIndexToAct]

      __DEBUG__(`${currentPlayer.name} checks. HasActedThisTurn set to ${currentPlayer.hasActedThisTurn}`)
      return {
        ...state,
        nextPlayerIndexToAct: getNextPlayerIndexToAct(),
      }
    }

    case 'PLAYER_ACTION_FOLD': {
      let currentPlayer = players[nextPlayerIndexToAct]

      // Can only fold if not first to act.
      const temporaryFirstToActIndex = 0 // Todo
      if (currentPlayer.index !== temporaryFirstToActIndex) {
        currentPlayer.cards = []
        currentPlayer.hasActedThisTurn = true
        currentPlayer.shouldActThisTurn = false
        __DEBUG__(`${currentPlayer.name} folds. HasActedThisTurn set to ${currentPlayer.hasActedThisTurn}`)
        return {
          ...state,
          nextPlayerIndexToAct: getNextPlayerIndexToAct(),
        }
      }

      __DEBUG__(`${currentPlayer.name} tried to fold when first to act`)
      return state
    }

    default:
      return state
  }
}
