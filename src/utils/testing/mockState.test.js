import mockState from './mockState'

test('Mock state should merge with initialState', () => {
  expect(mockState()).toEqual({
    communityCards: {},
    currentLevel: 1,
    currentStreet: 0,
    deck: [
      {
        rank: {
          symbol: '2',
          value: 2,
        },
        suit: {
          color: 'black',
          letter: 's',
          symbol: '♠',
        },
      },
      {
        rank: {
          symbol: '3',
          value: 3,
        },
        suit: {
          color: 'black',
          letter: 's',
          symbol: '♠',
        },
      },
      {
        rank: {
          symbol: '4',
          value: 4,
        },
        suit: {
          color: 'black',
          letter: 's',
          symbol: '♠',
        },
      },
      {
        rank: {
          symbol: '5',
          value: 5,
        },
        suit: {
          color: 'black',
          letter: 's',
          symbol: '♠',
        },
      },
      {
        rank: {
          symbol: '6',
          value: 6,
        },
        suit: {
          color: 'black',
          letter: 's',
          symbol: '♠',
        },
      },
      {
        rank: {
          symbol: '7',
          value: 7,
        },
        suit: {
          color: 'black',
          letter: 's',
          symbol: '♠',
        },
      },
      {
        rank: {
          symbol: '8',
          value: 8,
        },
        suit: {
          color: 'black',
          letter: 's',
          symbol: '♠',
        },
      },
      {
        rank: {
          symbol: '9',
          value: 9,
        },
        suit: {
          color: 'black',
          letter: 's',
          symbol: '♠',
        },
      },
      {
        rank: {
          symbol: 'T',
          value: 10,
        },
        suit: {
          color: 'black',
          letter: 's',
          symbol: '♠',
        },
      },
      {
        rank: {
          symbol: 'J',
          value: 11,
        },
        suit: {
          color: 'black',
          letter: 's',
          symbol: '♠',
        },
      },
      {
        rank: {
          symbol: 'Q',
          value: 12,
        },
        suit: {
          color: 'black',
          letter: 's',
          symbol: '♠',
        },
      },
      {
        rank: {
          symbol: 'K',
          value: 13,
        },
        suit: {
          color: 'black',
          letter: 's',
          symbol: '♠',
        },
      },
      {
        rank: {
          symbol: 'A',
          value: 14,
        },
        suit: {
          color: 'black',
          letter: 's',
          symbol: '♠',
        },
      },
      {
        rank: {
          symbol: '2',
          value: 2,
        },
        suit: {
          color: 'black',
          letter: 'c',
          symbol: '♣',
        },
      },
      {
        rank: {
          symbol: '3',
          value: 3,
        },
        suit: {
          color: 'black',
          letter: 'c',
          symbol: '♣',
        },
      },
      {
        rank: {
          symbol: '4',
          value: 4,
        },
        suit: {
          color: 'black',
          letter: 'c',
          symbol: '♣',
        },
      },
      {
        rank: {
          symbol: '5',
          value: 5,
        },
        suit: {
          color: 'black',
          letter: 'c',
          symbol: '♣',
        },
      },
      {
        rank: {
          symbol: '6',
          value: 6,
        },
        suit: {
          color: 'black',
          letter: 'c',
          symbol: '♣',
        },
      },
      {
        rank: {
          symbol: '7',
          value: 7,
        },
        suit: {
          color: 'black',
          letter: 'c',
          symbol: '♣',
        },
      },
      {
        rank: {
          symbol: '8',
          value: 8,
        },
        suit: {
          color: 'black',
          letter: 'c',
          symbol: '♣',
        },
      },
      {
        rank: {
          symbol: '9',
          value: 9,
        },
        suit: {
          color: 'black',
          letter: 'c',
          symbol: '♣',
        },
      },
      {
        rank: {
          symbol: 'T',
          value: 10,
        },
        suit: {
          color: 'black',
          letter: 'c',
          symbol: '♣',
        },
      },
      {
        rank: {
          symbol: 'J',
          value: 11,
        },
        suit: {
          color: 'black',
          letter: 'c',
          symbol: '♣',
        },
      },
      {
        rank: {
          symbol: 'Q',
          value: 12,
        },
        suit: {
          color: 'black',
          letter: 'c',
          symbol: '♣',
        },
      },
      {
        rank: {
          symbol: 'K',
          value: 13,
        },
        suit: {
          color: 'black',
          letter: 'c',
          symbol: '♣',
        },
      },
      {
        rank: {
          symbol: 'A',
          value: 14,
        },
        suit: {
          color: 'black',
          letter: 'c',
          symbol: '♣',
        },
      },
      {
        rank: {
          symbol: '2',
          value: 2,
        },
        suit: {
          color: 'red',
          letter: 'h',
          symbol: '♥',
        },
      },
      {
        rank: {
          symbol: '3',
          value: 3,
        },
        suit: {
          color: 'red',
          letter: 'h',
          symbol: '♥',
        },
      },
      {
        rank: {
          symbol: '4',
          value: 4,
        },
        suit: {
          color: 'red',
          letter: 'h',
          symbol: '♥',
        },
      },
      {
        rank: {
          symbol: '5',
          value: 5,
        },
        suit: {
          color: 'red',
          letter: 'h',
          symbol: '♥',
        },
      },
      {
        rank: {
          symbol: '6',
          value: 6,
        },
        suit: {
          color: 'red',
          letter: 'h',
          symbol: '♥',
        },
      },
      {
        rank: {
          symbol: '7',
          value: 7,
        },
        suit: {
          color: 'red',
          letter: 'h',
          symbol: '♥',
        },
      },
      {
        rank: {
          symbol: '8',
          value: 8,
        },
        suit: {
          color: 'red',
          letter: 'h',
          symbol: '♥',
        },
      },
      {
        rank: {
          symbol: '9',
          value: 9,
        },
        suit: {
          color: 'red',
          letter: 'h',
          symbol: '♥',
        },
      },
      {
        rank: {
          symbol: 'T',
          value: 10,
        },
        suit: {
          color: 'red',
          letter: 'h',
          symbol: '♥',
        },
      },
      {
        rank: {
          symbol: 'J',
          value: 11,
        },
        suit: {
          color: 'red',
          letter: 'h',
          symbol: '♥',
        },
      },
      {
        rank: {
          symbol: 'Q',
          value: 12,
        },
        suit: {
          color: 'red',
          letter: 'h',
          symbol: '♥',
        },
      },
      {
        rank: {
          symbol: 'K',
          value: 13,
        },
        suit: {
          color: 'red',
          letter: 'h',
          symbol: '♥',
        },
      },
      {
        rank: {
          symbol: 'A',
          value: 14,
        },
        suit: {
          color: 'red',
          letter: 'h',
          symbol: '♥',
        },
      },
      {
        rank: {
          symbol: '2',
          value: 2,
        },
        suit: {
          color: 'red',
          letter: 'd',
          symbol: '♦',
        },
      },
      {
        rank: {
          symbol: '3',
          value: 3,
        },
        suit: {
          color: 'red',
          letter: 'd',
          symbol: '♦',
        },
      },
      {
        rank: {
          symbol: '4',
          value: 4,
        },
        suit: {
          color: 'red',
          letter: 'd',
          symbol: '♦',
        },
      },
      {
        rank: {
          symbol: '5',
          value: 5,
        },
        suit: {
          color: 'red',
          letter: 'd',
          symbol: '♦',
        },
      },
      {
        rank: {
          symbol: '6',
          value: 6,
        },
        suit: {
          color: 'red',
          letter: 'd',
          symbol: '♦',
        },
      },
      {
        rank: {
          symbol: '7',
          value: 7,
        },
        suit: {
          color: 'red',
          letter: 'd',
          symbol: '♦',
        },
      },
      {
        rank: {
          symbol: '8',
          value: 8,
        },
        suit: {
          color: 'red',
          letter: 'd',
          symbol: '♦',
        },
      },
      {
        rank: {
          symbol: '9',
          value: 9,
        },
        suit: {
          color: 'red',
          letter: 'd',
          symbol: '♦',
        },
      },
      {
        rank: {
          symbol: 'T',
          value: 10,
        },
        suit: {
          color: 'red',
          letter: 'd',
          symbol: '♦',
        },
      },
      {
        rank: {
          symbol: 'J',
          value: 11,
        },
        suit: {
          color: 'red',
          letter: 'd',
          symbol: '♦',
        },
      },
      {
        rank: {
          symbol: 'Q',
          value: 12,
        },
        suit: {
          color: 'red',
          letter: 'd',
          symbol: '♦',
        },
      },
      {
        rank: {
          symbol: 'K',
          value: 13,
        },
        suit: {
          color: 'red',
          letter: 'd',
          symbol: '♦',
        },
      },
      {
        rank: {
          symbol: 'A',
          value: 14,
        },
        suit: {
          color: 'red',
          letter: 'd',
          symbol: '♦',
        },
      },
    ],
    handHistory: [],
    handWinners: [],
    highestCurrentBettor: null,
    levels: {
      '1': {
        bigBlind: 20,
        smallBlind: 10,
      },
      '10': {
        bigBlind: 1200,
        smallBlind: 600,
      },
      '11': {
        bigBlind: 2000,
        smallBlind: 1000,
      },
      '12': {
        bigBlind: 3000,
        smallBlind: 1500,
      },
      '13': {
        bigBlind: 4000,
        smallBlind: 2000,
      },
      '14': {
        bigBlind: 6000,
        smallBlind: 3000,
      },
      '15': {
        bigBlind: 8000,
        smallBlind: 4000,
      },
      '16': {
        bigBlind: 12000,
        smallBlind: 6000,
      },
      '17': {
        bigBlind: 20000,
        smallBlind: 10000,
      },
      '18': {
        bigBlind: 30000,
        smallBlind: 15000,
      },
      '19': {
        bigBlind: 40000,
        smallBlind: 20000,
      },
      '2': {
        bigBlind: 30,
        smallBlind: 15,
      },
      '3': {
        bigBlind: 50,
        smallBlind: 25,
      },
      '4': {
        bigBlind: 100,
        smallBlind: 50,
      },
      '5': {
        bigBlind: 150,
        smallBlind: 75,
      },
      '6': {
        bigBlind: 200,
        smallBlind: 100,
      },
      '7': {
        bigBlind: 400,
        smallBlind: 200,
      },
      '8': {
        bigBlind: 600,
        smallBlind: 300,
      },
      '9': {
        bigBlind: 800,
        smallBlind: 400,
      },
    },
    nextPlayerToAct: 0,
    players: [
      {
        chips: 1500,
        chipsCurrentlyInvested: 0,
        hand: [],
        hasActed: false,
        hasFolded: false,
        holeCards: [],
        index: 0,
        isAllIn: false,
        name: 'Fake_Player_1',
        id: 'Fake_Player_1',
      },
      {
        chips: 1500,
        chipsCurrentlyInvested: 0,
        hand: [],
        hasActed: false,
        hasFolded: false,
        holeCards: [],
        index: 1,
        isAllIn: false,
        name: 'Fake_Player_2',
        id: 'Fake_Player_2',
      },
      {
        chips: 1500,
        chipsCurrentlyInvested: 0,
        hand: [],
        hasActed: false,
        hasFolded: false,
        holeCards: [],
        index: 2,
        isAllIn: false,
        name: 'Fake_Player_3',
        id: 'Fake_Player_3',
      },
      {
        chips: 1500,
        chipsCurrentlyInvested: 0,
        hand: [],
        hasActed: false,
        hasFolded: false,
        holeCards: [],
        index: 3,
        isAllIn: false,
        name: 'Fake_Player_4',
        id: 'Fake_Player_4',
      },
      {
        chips: 1500,
        chipsCurrentlyInvested: 0,
        hand: [],
        hasActed: false,
        hasFolded: false,
        holeCards: [],
        index: 4,
        isAllIn: false,
        name: 'Fake_Player_5',
        id: 'Fake_Player_5',
      },
      {
        chips: 1500,
        chipsCurrentlyInvested: 0,
        hand: [],
        hasActed: false,
        hasFolded: false,
        holeCards: [],
        index: 5,
        isAllIn: false,
        name: 'Fake_Player_6',
        id: 'Fake_Player_6',
      },
    ],
    positions: {},
    pot: 0,
    showdown: false,
    whatPlayerIsDealer: null,
  })
})
