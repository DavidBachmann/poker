import uuidV1 from 'uuid/v1' // V1 is time based UUID
import { concat, find } from 'lodash'
import __DEBUG__ from '../utils/__DEBUG__'
import determineWinner from '../utils/determineWinner'
import dealCards from '../utils/dealCards'
import { initializePlayers } from '../utils/initializer'
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
  dealerMessage: '',
  deck: [],
  handHistory: [],
  handWinners: null,
  highestCurrentBet: 0,
  level: generateLevels(),
  nextToActCounter: 0, // (TODO)
  paused: false,
  players: initializePlayers(TOTAL_PLAYERS, STARTING_STACK),
  pot: 0,
  showdown: false, // Showdown means the round is over and all remaining players should reveal their hands
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
    nextToActCounter,
    players,
    pot,
    street,
  } = state

  const handleNextToActCounter = (currentPlayer) => {
    const _nextToActCounter = nextToActCounter
    if (players[_nextToActCounter] && players[_nextToActCounter].name) {
      __DEBUG__(`players[_nextToActCounter].name: ${players[_nextToActCounter].name}`)
    }
    if (currentPlayer && currentPlayer.name) {
      __DEBUG__(`currentPlayer.name: ${currentPlayer.name}`)
    }
    if (handHistory.length < 1) {
      __DEBUG__('handHistory.length < 1')
      return 0
    }

    // If the counter can't count up further, we would ideally want to reset it to 0
    if (_nextToActCounter >= TOTAL_PLAYERS - 1) {
      // If player in index 0 is still in the hand, we can reset the counter and call it a day
      if (!players[0].hasFolded) {
        __DEBUG__(`Index 0 is still in the hand: ${players[0].name}`)
        return 0
      }
      // Else if player at index 0 has folded, we have to check for another player
      else {
        const nextIdealPlayer = find(players, (player) => !player.hasFolded && !player.hasActedThisTurn)
        console.log('// Else if player in index 0 has folded, we have to check for the next one')
        console.log(nextIdealPlayer)
        return nextIdealPlayer.index
      }
    }

    // The counter can count up further
    else {
      let nextIdealPlayer = undefined
      // Ideal player fullfills the following: hasn't folded, hasn't acted this turn, hasn't VP$IP
      __DEBUG__(`// Ideal player fullfills the following: hasn't folded, hasn't acted this turn, hasn't VP$IP`)
      nextIdealPlayer = find(players, (player) => !player.hasFolded && !player.hasActedThisTurn && !player.chipsInvested)
      if (nextIdealPlayer) {
        __DEBUG__(`Found ${nextIdealPlayer.name}`)
        return nextIdealPlayer.index
      } else {
        // We didn't find anyone, narrowing search to players who haven't folded or acted this turn, and didn't act last. Searching from currentPlayer's index.
        __DEBUG__(`// We didnt find anyone, narrowing search to players who havent folded or acted this turn, and didn't act last. Searching from currentPlayer's index.`)
        nextIdealPlayer = find(players, (player) => !player.hasFolded && !player.hasActedThisTurn && player !== currentPlayer)
        if (nextIdealPlayer) {
          __DEBUG__(`// Found ${nextIdealPlayer.name}`)
          return nextIdealPlayer.index
        } else {
          // We didn't find anyone, narrowing search to players who haven't folded this turn and didn't act last. Searching from currentPlayer's index.
           __DEBUG__(`// We didn't find anyone, narrowing search to players who haven't folded this turn and didn't act last. Searching from currentPlayer's index`)
          nextIdealPlayer = find(players, (player) => !player.hasFolded && player !== currentPlayer, currentPlayer.index)
          if (nextIdealPlayer) {
            __DEBUG__(`// Found ${nextIdealPlayer.name}`)
            return nextIdealPlayer.index
          } else {
            __DEBUG__(`// We didn't find anyone, narrowing search to players who haven't folded this turn and didn't act last.`)
            nextIdealPlayer = find(players, (player) => !player.hasFolded)
            return currentPlayer.index
          }
        }
      }
    }
  }

  const nextPlayerToAct = players[nextToActCounter]

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
        nextToActCounter: handleNextToActCounter(),
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

      // Combine player investments with pot
      const _pot = players.reduce((acc, player) => player.chipsInvested + acc, 0) + pot

      players.forEach((player) => {
        player.hasActedThisTurn = false
      })

      const nextStreet = street + 1

      return {
        ...state,
        ...dealCards(deck, players, street, communityCards),
        street: nextStreet,
        pot: _pot,
        nextToActCounter: handleNextToActCounter(),
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
      const bigBlindPosition = (nextToActCounter + TOTAL_PLAYERS - 1) % TOTAL_PLAYERS
      const smallBlindPosition = (nextToActCounter + TOTAL_PLAYERS - 2) % TOTAL_PLAYERS
      const { smallBlind, bigBlind } = level[currentLevel]
      const amountTakenFromSmallBlindPlayer = getAmountTakenFromBlindedPlayers(players, smallBlindPosition, smallBlind)
      const amountTakenFromBigBlindPlayer = getAmountTakenFromBlindedPlayers(players, bigBlindPosition, bigBlind)
      const _pot = pot + amountTakenFromSmallBlindPlayer + amountTakenFromBigBlindPlayer

      players[smallBlindPosition].blindsPaid = amountTakenFromSmallBlindPlayer
      players[bigBlindPosition].blindsPaid = amountTakenFromBigBlindPlayer

      return {
        ...state,
        highestCurrentBet: amountTakenFromBigBlindPlayer,
        pot: _pot,
        players,
      }
    }

    case 'PLAYER_ACTION_BET': {
      const currentPlayer = nextPlayerToAct
      const MIN_AMOUNT = level[currentLevel].bigBlind
      // Find out what players are still in the hand, e.g. have not folded.
      const playersStillInTheHand = players.filter(player => !player.hasFolded)
      // Player has to bet >= highestCurrentBet and >= bigBlind
      if (action.amountRequested >= highestCurrentBet & action.amountRequested >= MIN_AMOUNT) {
        // Use the amount in currentPlayer's input field if he can afford it. Else he's All-In.
        let chipsBetByPlayer = action.amountRequested <= currentPlayer.chips ? action.amountRequested : currentPlayer.chips
        // Check if player has raised so we can let other players know they have to act.
        // We also have to reset everyone's hasActedThisTurn since they have to react to our bet
        if (chipsBetByPlayer > highestCurrentBet) {
          playersStillInTheHand.map(player => player.hasActedThisTurn = false)
          playersStillInTheHand.filter((player) => player !== currentPlayer).map((player) => player.isFacingRaise = true)
          __DEBUG__(`${currentPlayer.name} raises to ${action.amountRequested}. Previous highest bet was ${highestCurrentBet} `)
          __DEBUG__(`Players still in the hand: ${playersStillInTheHand.map(player => player.name)}`)
        }
        // Remove the amount from currentPlayer's stack
        currentPlayer.chips -= chipsBetByPlayer
        // Put it into currentPlayer's playerPot
        currentPlayer.chipsInvested = chipsBetByPlayer
        // Mark as 'acted'
        currentPlayer.hasActedThisTurn = true
        // We are the raiser, others are facing raise
        currentPlayer.isFacingRaise = false
        __DEBUG__(`${currentPlayer.name} bets a valid amount :)`)
        return {
          ...state,
          nextToActCounter: handleNextToActCounter(),
          highestCurrentBet: chipsBetByPlayer
        }
      }

      __DEBUG__(`${currentPlayer.name} bets invalid amount`)
      return state
    }

    case 'PLAYER_ACTION_CALL': {
      // Get player
      const currentPlayer = nextPlayerToAct

      // Get the amount he has invested in this round
      const currentPlayerAlreadyInvested = currentPlayer.chipsInvested
      // Let the player bet the difference of how much he has already invested minus how much the pot is.
      // This is so if the player has already bet, and facing a raise,
      // he doesn't have to pay the whole raised amount but only the difference.
      const chipsBetByPlayer = highestCurrentBet - currentPlayerAlreadyInvested
      // Take the chips from his stack
      currentPlayer.chips -= chipsBetByPlayer
      // currentPlayerAlreadyInvested = chipsBetByPlayer
      currentPlayer.hasActedThisTurn = true
      currentPlayer.chipsInvested = chipsBetByPlayer
      __DEBUG__(`${currentPlayer.name} calls ${chipsBetByPlayer}`)
      return {
        ...state,
        nextToActCounter: handleNextToActCounter(),
      }
    }

    case 'PLAYER_ACTION_CHECK': {
      let currentPlayer = nextPlayerToAct

      __DEBUG__(`${currentPlayer.name} checks. HasActedThisTurn set to ${currentPlayer.hasActedThisTurn}`)
      return {
        ...state,
        nextToActCounter: handleNextToActCounter(),
      }
    }

    case 'PLAYER_ACTION_FOLD': {
      let currentPlayer = nextPlayerToAct

      // Can only fold if not first to act.
      const temporaryFirstToActIndex = 0 // Todo
      if (currentPlayer.index !== temporaryFirstToActIndex || currentPlayer.isFacingRaise) {
        currentPlayer.cards = []
        currentPlayer.hasActedThisTurn = true
        currentPlayer.shouldActThisTurn = false
        currentPlayer.hasFolded = true
        __DEBUG__(`${currentPlayer.name} folds. HasFolded set to ${currentPlayer.hasFolded}. HasActedThisTurn set to ${currentPlayer.hasActedThisTurn}`)
        return {
          ...state,
          nextToActCounter: handleNextToActCounter(),
        }
      }

      __DEBUG__(`${currentPlayer.name} tried to fold when first to act`)
      return state
    }

    default:
      return state
  }
}
