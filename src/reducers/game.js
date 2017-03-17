import uuidV1 from 'uuid/v1' // V1 is time based UUID
import winnerDetermination from '../utils/winnerDetermination'
import dealCards from '../utils/dealCards'
import initializer from '../utils/initializer'
import generateShuffledDeck from '../utils/generateShuffledDeck'
import { concat, find, pullAt, findIndex, round } from 'lodash'
import generateLevels from '../utils/generateLevels'

const STARTING_STACK = 1500
const TOTAL_BOTS = 8

const bots = initializer(TOTAL_BOTS, STARTING_STACK)
const hero = initializer(1, STARTING_STACK)

const initialState = {
  communityCards: {}, // Object of dealt community cards
  currentLevel: 1, // Starting level
  deck: [], // Current deck of cards
  level: generateLevels(),
  street: 0, // {0: 'preflop', 1: 'flop', 2: 'turn', 3: 'river'} (TODO)
  nextToAct: 0, // Player at index 0 starts (TODO)
  players: concat(hero, bots), // Initialized players
  pot: 0, // Chips currently in the pot
  sidepot: [], // Array of sidepots
  showdown: false, // Showdown means the round is over and all remaining players should reveal their hands.
  started: false, // Game is not started
  paused: false, // Game is not paused
  handWinners: null, // We haven't selected a winner yet
  handHistory: [], // Empty hand history
  tournamentWinner: null, // Who won the tournament
}

export default (state = initialState, action) => {
  const {
    communityCards,
    currentLevel,
    deck,
    level,
    street,
    nextToAct,
    players,
    pot,
    showdown,
    handWinners,
    handHistory,
  } = state

  switch (action.type) {
    case 'START': {
      const maxHandsPerLevel = 25
      const newHandId = uuidV1()
      const newHandHistory = concat(handHistory, newHandId)
      const shouldChangeLevel = currentLevel < 19 && handHistory.length % maxHandsPerLevel === 0 && handHistory.length !== 0 // Every 25 hands the level should go up

      return {
        ...state,
        currentLevel: shouldChangeLevel ? currentLevel + 1 : currentLevel,
        deck: generateShuffledDeck(),
        communityCards: {flop: {}, turn: {}, river: {}},
        street: 0,
        pot: 0,
        showdown: false,
        started: true,
        handWinners: null,
        nextToAct: nextToAct >= players.length - 1 ? 0 : nextToAct + 1,
        handHistory: newHandHistory,
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
        handWinners: winnerDetermination(players, communityCards),
      }
    }

    case 'PAY_OUT_CHIPS': {
      if (!showdown) {
        return null
      }

      const checkIfAnyoneIsBroke = () => {
        let newPlayers = players

        const playerWithoutChips = find(players, (player) => player.chips <= 0)

        if (playerWithoutChips) {
          pullAt(newPlayers, findIndex(newPlayers, ((player) => player.id === playerWithoutChips.id )))
        }

        return newPlayers
      }

      const checkIfTournamentIsOver = () => {
        if (players.length > 1) {
          return null
        }

        return players[0].id
      }

      const totalWinners = handWinners.length

      handWinners.forEach((winner) => {
        const playerThatWon = find(players, (player) => player.name === winner.name)
        const amountWon = round(pot/totalWinners, 2)
        playerThatWon.chips += amountWon
      })

      return {
        ...state,
        players: checkIfAnyoneIsBroke(),
        tournamentWinner: checkIfTournamentIsOver(),
      }
    }

    case 'NEXT_TO_ACT':
      return {
        ...state,
        nextToAct: nextToAct === players.length - 1 ? 0 : nextToAct + 1,
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

      // Remove chips from relevant players
      const amountTakenFromBlindedPlayers = (position, blindLevel) => {
        let amountTaken = 0
        const blindedPlayer = players[position]
        // Pay the blind if the player can afford it
        if (blindedPlayer.chips >= blindLevel) {
          amountTaken = blindLevel
          blindedPlayer.chips -= blindLevel
        } else {
          // else pay all his chips
          amountTaken = blindedPlayer.chips
          blindedPlayer.chips = 0
        }
        return amountTaken
      }

      return {
        ...state,
        pot: pot + amountTakenFromBlindedPlayers(sbPosition, smallBlind) + amountTakenFromBlindedPlayers(bbPosition, bigBlind),
        players,
      }
    }

    default:
      return state
  }
}
