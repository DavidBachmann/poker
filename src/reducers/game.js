import uuidV1 from 'uuid/v1' // V1 is time based UUID
import winnerDetermination from '../utils/winnerDetermination'
import dealCards from '../utils/dealCards'
import initializer from '../utils/initializer'
import generateShuffledDeck from '../utils/generateShuffledDeck'
import { concat, find, pullAt, findIndex } from 'lodash'
import generateLevels from '../utils/generateLevels'
import payPlayer from '../utils/payPlayer'
import playerActions from '../utils/playerActions'

const STARTING_STACK = 1500
const TOTAL_PLAYERS = 9

const players = initializer(TOTAL_PLAYERS, STARTING_STACK)

const initialState = {
  communityCards: {}, // Object of dealt community cards
  currentLevel: 1, // Starting level
  dealerMessage: '', // Dealer message displayed to players on table
  deck: [], // Current deck of cards
  handHistory: [], // Empty hand history
  handWinners: null, // We haven't selected a winner yet
  level: generateLevels(),
  nextToAct: 0, // Player at index 0 starts (TODO)
  paused: false, // Game is not paused
  players, // Initialized players
  pot: 0, // Chips currently in the pot
  showdown: false, // Showdown means the round is over and all remaining players should reveal their hands.
  sidepot: [], // Array of sidepots
  started: false, // Game is not started
  street: 0, // {0: 'preflop', 1: 'flop', 2: 'turn', 3: 'river'} (TODO)
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
        nextToAct: nextToAct >= players.length -1 ? 0 : handHistory.length === 0 ? 0 : nextToAct + 1,
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
      const checkIfAnyoneIsBrokeAndReturnNewPlayerArray = () => {
        let newPlayers = players
        const playerWithoutChips = find(newPlayers, (player) => player.chips <= 0)

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
        const amountWon = pot/totalWinners

        payPlayer(playerThatWon, amountWon)
      })

      return {
        ...state,
        players: checkIfAnyoneIsBrokeAndReturnNewPlayerArray(),
        tournamentWinner: checkIfTournamentIsOver(),
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

    case 'PLAYER_ACTION': {
      // Player chose All-In
      if (action.actionString === playerActions.ALL_IN) {
        let player = players[nextToAct]
        let chipsToTake = player.chips
        player.chips = 0

        return {
          ...state,
          pot: pot + chipsToTake,
        }
      } else {
        break
      }
    }

    case 'WAITING_FOR_PLAYER_TO_ACT': {
      return {
        ...state,
        dealerMessage: `Waiting for ${players[nextToAct].name} to act.`
      }
    }

    default:
      return state
  }
}
