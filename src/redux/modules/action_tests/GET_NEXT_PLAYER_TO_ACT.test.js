import reducer, { GET_NEXT_PLAYER_TO_ACT } from '../gameManager'

test('First hand of tournament and UTG just acted', () => {
  let state = reducer(
    {
      players: [
        {
          chips: 1245,
          chipsCurrentlyInvested: 255,
          hasFolded: false,
          isAllIn: false,
        },
        {
          chips: 1500,
          chipsCurrentlyInvested: 0,
          hasFolded: false,
          isAllIn: false,
        },
        {
          chips: 1500,
          chipsCurrentlyInvested: 0,
          hasFolded: false,
          isAllIn: false,
        },
        {
          chips: 1500,
          chipsCurrentlyInvested: 0,
          hasFolded: false,
          isAllIn: false,
        },
        {
          chips: 1490,
          chipsCurrentlyInvested: 10,
          hasFolded: false,
          isAllIn: false,
        },
        {
          chips: 1480,
          chipsCurrentlyInvested: 20,
          hasFolded: false,
          isAllIn: false,
        },
      ],
      positions: { bb: 5, sb: 4, button: 3, cutoff: 2, mp: 1, utg: 0 },
      handHistory: [],
      nextPlayerToAct: 0,
      whatPlayerIsDealer: null,
      highestCurrentBettor: {
        chips: 1245,
        chipsCurrentlyInvested: 255,
        hasFolded: false,
        isAllIn: false,
      },
    },
    { type: GET_NEXT_PLAYER_TO_ACT },
  )
  expect(state).toEqual({
    players: [
      {
        chips: 1245,
        chipsCurrentlyInvested: 255,
        hasFolded: false,
        isAllIn: false,
      },
      {
        chips: 1500,
        chipsCurrentlyInvested: 0,
        hasFolded: false,
        isAllIn: false,
      },
      {
        chips: 1500,
        chipsCurrentlyInvested: 0,
        hasFolded: false,
        isAllIn: false,
      },
      {
        chips: 1500,
        chipsCurrentlyInvested: 0,
        hasFolded: false,
        isAllIn: false,
      },
      {
        chips: 1490,
        chipsCurrentlyInvested: 10,
        hasFolded: false,
        isAllIn: false,
      },
      {
        chips: 1480,
        chipsCurrentlyInvested: 20,
        hasFolded: false,
        isAllIn: false,
      },
    ],
    positions: { bb: 5, sb: 4, button: 3, cutoff: 2, mp: 1, utg: 0 },
    handHistory: [],
    nextPlayerToAct: 1,
    whatPlayerIsDealer: null,
    highestCurrentBettor: {
      chips: 1245,
      chipsCurrentlyInvested: 255,
      hasFolded: false,
      isAllIn: false,
    },
  })
})

test('First hand of tournament. Player in last seat acts when UTG is facing a raise', () => {
  let state = reducer(
    {
      players: [
        {
          chips: 1245,
          chipsCurrentlyInvested: 255,
          hasFolded: false,
          isAllIn: false,
        },
        {
          chips: 1500,
          chipsCurrentlyInvested: 0,
          hasFolded: true,
          isAllIn: false,
        },
        {
          chips: 0,
          chipsCurrentlyInvested: 1500,
          hasFolded: false,
          isAllIn: true,
        },
        {
          chips: 1500,
          chipsCurrentlyInvested: 0,
          hasFolded: true,
          isAllIn: false,
        },
        {
          chips: 1490,
          chipsCurrentlyInvested: 10,
          hasFolded: true,
          isAllIn: false,
        },
        {
          chips: 1480,
          chipsCurrentlyInvested: 20,
          hasFolded: true,
          isAllIn: false,
        },
      ],
      positions: { bb: 5, sb: 4, button: 3, cutoff: 2, mp: 1, utg: 0 },
      handHistory: [],
      nextPlayerToAct: 5,
      whatPlayerIsDealer: null,
      highestCurrentBettor: {
        chips: 0,
        chipsCurrentlyInvested: 1500,
        hasFolded: false,
        isAllIn: true,
      },
    },
    { type: 'GET_NEXT_PLAYER_TO_ACT' },
  )
  expect(state).toEqual({
    players: [
      {
        chips: 1245,
        chipsCurrentlyInvested: 255,
        hasFolded: false,
        isAllIn: false,
      },
      {
        chips: 1500,
        chipsCurrentlyInvested: 0,
        hasFolded: true,
        isAllIn: false,
      },
      {
        chips: 0,
        chipsCurrentlyInvested: 1500,
        hasFolded: false,
        isAllIn: true,
      },
      {
        chips: 1500,
        chipsCurrentlyInvested: 0,
        hasFolded: true,
        isAllIn: false,
      },
      {
        chips: 1490,
        chipsCurrentlyInvested: 10,
        hasFolded: true,
        isAllIn: false,
      },
      {
        chips: 1480,
        chipsCurrentlyInvested: 20,
        hasFolded: true,
        isAllIn: false,
      },
    ],
    positions: { bb: 5, sb: 4, button: 3, cutoff: 2, mp: 1, utg: 0 },
    handHistory: [],
    nextPlayerToAct: 0,
    whatPlayerIsDealer: null,
    highestCurrentBettor: {
      chips: 0,
      chipsCurrentlyInvested: 1500,
      hasFolded: false,
      isAllIn: true,
    },
  })
})
