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

test('Second hand of tournament and UTG just acted', () => {
  let state = reducer(
    {
      players: [
        {
          chips: 1785,
          chipsCurrentlyInvested: 0,
          hasFolded: false,
          hasActed: false,
          isAllIn: false,
        },
        {
          chips: 1235,
          chipsCurrentlyInvested: 265,
          hasFolded: true,
          hasActed: true,
          isAllIn: false,
        },
        {
          chips: 1480,
          chipsCurrentlyInvested: 20,
          hasFolded: true,
          hasActed: false,
          isAllIn: false,
        },
        {
          chips: 1245,
          chipsCurrentlyInvested: 0,
          hasFolded: true,
          hasActed: false,
          isAllIn: false,
        },
        {
          chips: 1490,
          chipsCurrentlyInvested: 0,
          hasFolded: true,
          hasActed: false,
          isAllIn: false,
        },
        {
          chips: 1480,
          chipsCurrentlyInvested: 0,
          hasFolded: true,
          hasActed: false,
          isAllIn: false,
        },
      ],
      positions: { bb: 0, sb: 5, button: 4, cutoff: 3, mp: 2, utg: 1 },
      handHistory: [null],
      nextPlayerToAct: 1,
      whatPlayerIsDealer: null,
      highestCurrentBettor: {
        chips: 1235,
        chipsCurrentlyInvested: 265,
        hasFolded: true,
        hasActed: true,
        isAllIn: false,
      },
    },
    { type: 'GET_NEXT_PLAYER_TO_ACT' },
  )
  expect(state).toEqual({
    players: [
      {
        chips: 1785,
        chipsCurrentlyInvested: 0,
        hasFolded: false,
        hasActed: false,
        isAllIn: false,
      },
      {
        chips: 1235,
        chipsCurrentlyInvested: 265,
        hasFolded: true,
        hasActed: true,
        isAllIn: false,
      },
      {
        chips: 1480,
        chipsCurrentlyInvested: 20,
        hasFolded: true,
        hasActed: false,
        isAllIn: false,
      },
      {
        chips: 1245,
        chipsCurrentlyInvested: 0,
        hasFolded: true,
        hasActed: false,
        isAllIn: false,
      },
      {
        chips: 1490,
        chipsCurrentlyInvested: 0,
        hasFolded: true,
        hasActed: false,
        isAllIn: false,
      },
      {
        chips: 1480,
        chipsCurrentlyInvested: 0,
        hasFolded: true,
        hasActed: false,
        isAllIn: false,
      },
    ],
    positions: { bb: 0, sb: 5, button: 4, cutoff: 3, mp: 2, utg: 1 },
    handHistory: [null],
    nextPlayerToAct: 1,
    whatPlayerIsDealer: null,
    highestCurrentBettor: {
      chips: 1235,
      chipsCurrentlyInvested: 265,
      hasFolded: true,
      hasActed: true,
      isAllIn: false,
    },
  })
})

test('Tricky.', () => {
  let state = reducer(
    {
      players: [
        {
          chips: 1530,
          chipsCurrentlyInvested: 0,
          hasFolded: false,
          hasActed: false,
          isAllIn: false,
        },
        {
          chips: 1245,
          chipsCurrentlyInvested: 255,
          hasFolded: true,
          hasActed: true,
          isAllIn: false,
        },
        {
          chips: 1500,
          chipsCurrentlyInvested: 0,
          hasFolded: true,
          hasActed: false,
          isAllIn: false,
        },
        {
          chips: 1490,
          chipsCurrentlyInvested: 10,
          hasFolded: true,
          hasActed: false,
          isAllIn: false,
        },
        {
          chips: 1470,
          chipsCurrentlyInvested: 20,
          hasFolded: true,
          hasActed: false,
          isAllIn: false,
        },
        {
          chips: 1480,
          chipsCurrentlyInvested: 0,
          hasFolded: true,
          hasActed: false,
          isAllIn: false,
        },
      ],
      positions: { bb: 0, sb: 5, button: 4, cutoff: 3, mp: 2, utg: 1 },
      handHistory: [null],
      nextPlayerToAct: 1,
      whatPlayerIsDealer: null,
      highestCurrentBettor: {
        chips: 1245,
        chipsCurrentlyInvested: 255,
        hasFolded: true,
        hasActed: true,
        isAllIn: false,
      },
    },
    { type: 'GET_NEXT_PLAYER_TO_ACT' },
  )
  expect(state).toEqual({
    players: [
      {
        chips: 1530,
        chipsCurrentlyInvested: 0,
        hasFolded: false,
        hasActed: false,
        isAllIn: false,
      },
      {
        chipsCurrentlyInvested: 255,
        hasFolded: true,
        hasActed: true,
        isAllIn: false,
      },
      {
        chips: 1500,
        chipsCurrentlyInvested: 0,
        hasFolded: true,
        hasActed: false,
        isAllIn: false,
      },
      {
        chips: 1490,
        chipsCurrentlyInvested: 10,
        hasFolded: true,
        hasActed: false,
        isAllIn: false,
      },
      {
        chips: 1470,
        chipsCurrentlyInvested: 20,
        hasFolded: true,
        hasActed: false,
        isAllIn: false,
      },
      {
        chips: 1480,
        chipsCurrentlyInvested: 0,
        hasFolded: true,
        hasActed: false,
        isAllIn: false,
      },
    ],
    positions: { bb: 0, sb: 5, button: 4, cutoff: 3, mp: 2, utg: 1 },
    handHistory: [null],
    nextPlayerToAct: 2,
    whatPlayerIsDealer: null,
    highestCurrentBettor: {
      chips: 1245,
      chipsCurrentlyInvested: 255,
      hasFolded: true,
      hasActed: true,
      isAllIn: false,
    },
  })
})

test('Tricky jr', () => {
  let state = reducer(
    {
      players: [
        {
          chips: 1530,
          chipsCurrentlyInvested: 0,
          hasFolded: false,
          hasActed: false,
          isAllIn: false,
        },
        {
          chips: 1245,
          chipsCurrentlyInvested: 255,
          hasFolded: true,
          hasActed: true,
          isAllIn: false,
        },
        {
          chips: 1500,
          chipsCurrentlyInvested: 0,
          hasFolded: true,
          hasActed: false,
          isAllIn: false,
        },
        {
          chips: 1490,
          chipsCurrentlyInvested: 10,
          hasFolded: true,
          hasActed: false,
          isAllIn: false,
        },
        {
          chips: 1470,
          chipsCurrentlyInvested: 20,
          hasFolded: true,
          hasActed: false,
          isAllIn: false,
        },
        {
          chips: 1480,
          chipsCurrentlyInvested: 0,
          hasFolded: true,
          hasActed: false,
          isAllIn: false,
        },
      ],
      positions: { bb: 0, sb: 5, button: 4, cutoff: 3, mp: 2, utg: 1 },
      handHistory: [null, null],
      nextPlayerToAct: 2,
      whatPlayerIsDealer: null,
      highestCurrentBettor: {
        chips: 1245,
        chipsCurrentlyInvested: 255,
        hasFolded: true,
        hasActed: true,
        isAllIn: false,
      },
    },
    { type: 'GET_NEXT_PLAYER_TO_ACT' },
  )
  expect(state).toEqual({
    players: [
      {
        chips: 1530,
        chipsCurrentlyInvested: 0,
        hasFolded: false,
        hasActed: false,
        isAllIn: false,
      },
      {
        chips: 1245,
        chipsCurrentlyInvested: 255,
        hasFolded: true,
        hasActed: true,
        isAllIn: false,
      },
      {
        chips: 1500,
        chipsCurrentlyInvested: 0,
        hasFolded: true,
        hasActed: false,
        isAllIn: false,
      },
      {
        chips: 1490,
        chipsCurrentlyInvested: 10,
        hasFolded: true,
        hasActed: false,
        isAllIn: false,
      },
      {
        holeCards: [
          { rank: { value: 9, symbol: '9' }, suit: { symbol: '♦', letter: 'd', color: 'red' } },
          { rank: { value: 2, symbol: '2' }, suit: { symbol: '♥', letter: 'h', color: 'red' } },
        ],
        hand: [],
        chips: 1470,
        chipsCurrentlyInvested: 20,
        hasFolded: true,
        hasActed: false,
        isAllIn: false,
      },
      {
        chips: 1480,
        chipsCurrentlyInvested: 0,
        hasFolded: true,
        hasActed: false,
        isAllIn: false,
      },
    ],
    positions: { bb: 0, sb: 5, button: 4, cutoff: 3, mp: 2, utg: 1 },
    handHistory: [null, null],
    nextPlayerToAct: 3,
    whatPlayerIsDealer: null,
    highestCurrentBettor: {
      chips: 1245,
      chipsCurrentlyInvested: 255,
      hasFolded: true,
      hasActed: true,
      isAllIn: false,
    },
  })
})
