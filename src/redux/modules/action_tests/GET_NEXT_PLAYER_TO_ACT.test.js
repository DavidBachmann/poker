import reducer, { GET_NEXT_PLAYER_TO_ACT } from '../gameManager'

test('UTG just acted', () => {
  let state
  state = reducer(
    {
      pot: 0,
      deck: [
        { rank: { value: 5, symbol: '5' }, suit: { symbol: '♦', letter: 'd', color: 'red' } },
        { rank: { value: 6, symbol: '6' }, suit: { symbol: '♣', letter: 'c', color: 'black' } },
        { rank: { value: 12, symbol: 'Q' }, suit: { symbol: '♣', letter: 'c', color: 'black' } },
        { rank: { value: 12, symbol: 'Q' }, suit: { symbol: '♥', letter: 'h', color: 'red' } },
        { rank: { value: 9, symbol: '9' }, suit: { symbol: '♥', letter: 'h', color: 'red' } },
        { rank: { value: 13, symbol: 'K' }, suit: { symbol: '♠', letter: 's', color: 'black' } },
        { rank: { value: 3, symbol: '3' }, suit: { symbol: '♠', letter: 's', color: 'black' } },
        { rank: { value: 8, symbol: '8' }, suit: { symbol: '♣', letter: 'c', color: 'black' } },
        { rank: { value: 7, symbol: '7' }, suit: { symbol: '♣', letter: 'c', color: 'black' } },
        { rank: { value: 6, symbol: '6' }, suit: { symbol: '♦', letter: 'd', color: 'red' } },
        { rank: { value: 12, symbol: 'Q' }, suit: { symbol: '♠', letter: 's', color: 'black' } },
        { rank: { value: 12, symbol: 'Q' }, suit: { symbol: '♦', letter: 'd', color: 'red' } },
        { rank: { value: 7, symbol: '7' }, suit: { symbol: '♦', letter: 'd', color: 'red' } },
        { rank: { value: 2, symbol: '2' }, suit: { symbol: '♣', letter: 'c', color: 'black' } },
        { rank: { value: 10, symbol: 'T' }, suit: { symbol: '♣', letter: 'c', color: 'black' } },
        { rank: { value: 8, symbol: '8' }, suit: { symbol: '♥', letter: 'h', color: 'red' } },
        { rank: { value: 11, symbol: 'J' }, suit: { symbol: '♦', letter: 'd', color: 'red' } },
        { rank: { value: 11, symbol: 'J' }, suit: { symbol: '♠', letter: 's', color: 'black' } },
        { rank: { value: 9, symbol: '9' }, suit: { symbol: '♦', letter: 'd', color: 'red' } },
        { rank: { value: 3, symbol: '3' }, suit: { symbol: '♥', letter: 'h', color: 'red' } },
        { rank: { value: 13, symbol: 'K' }, suit: { symbol: '♥', letter: 'h', color: 'red' } },
        { rank: { value: 4, symbol: '4' }, suit: { symbol: '♥', letter: 'h', color: 'red' } },
        { rank: { value: 2, symbol: '2' }, suit: { symbol: '♦', letter: 'd', color: 'red' } },
        { rank: { value: 14, symbol: 'A' }, suit: { symbol: '♠', letter: 's', color: 'black' } },
        { rank: { value: 2, symbol: '2' }, suit: { symbol: '♠', letter: 's', color: 'black' } },
        { rank: { value: 13, symbol: 'K' }, suit: { symbol: '♣', letter: 'c', color: 'black' } },
        { rank: { value: 11, symbol: 'J' }, suit: { symbol: '♥', letter: 'h', color: 'red' } },
        { rank: { value: 7, symbol: '7' }, suit: { symbol: '♥', letter: 'h', color: 'red' } },
      ],
      levels: {
        '1': { smallBlind: 10, bigBlind: 20 },
        '2': { smallBlind: 15, bigBlind: 30 },
        '3': { smallBlind: 25, bigBlind: 50 },
        '4': { smallBlind: 50, bigBlind: 100 },
        '5': { smallBlind: 75, bigBlind: 150 },
        '6': { smallBlind: 100, bigBlind: 200 },
        '7': { smallBlind: 200, bigBlind: 400 },
        '8': { smallBlind: 300, bigBlind: 600 },
        '9': { smallBlind: 400, bigBlind: 800 },
        '10': { smallBlind: 600, bigBlind: 1200 },
        '11': { smallBlind: 1000, bigBlind: 2000 },
        '12': { smallBlind: 1500, bigBlind: 3000 },
        '13': { smallBlind: 2000, bigBlind: 4000 },
        '14': { smallBlind: 3000, bigBlind: 6000 },
        '15': { smallBlind: 4000, bigBlind: 8000 },
        '16': { smallBlind: 6000, bigBlind: 12000 },
        '17': { smallBlind: 10000, bigBlind: 20000 },
        '18': { smallBlind: 15000, bigBlind: 30000 },
        '19': { smallBlind: 20000, bigBlind: 40000 },
      },
      players: [
        {
          index: 0,
          holeCards: [
            { rank: { value: 9, symbol: '9' }, suit: { symbol: '♠', letter: 's', color: 'black' } },
            { rank: { value: 4, symbol: '4' }, suit: { symbol: '♦', letter: 'd', color: 'red' } },
          ],
          hand: [],
          name: 'Viktor Dwan',
          chips: 1245,
          chipsCurrentlyInvested: 255,
          id: 'b04ac6c5-90fb-4177-9009-b136dd97871b',
          hasFolded: false,
          isAllIn: false,
        },
        {
          index: 1,
          holeCards: [
            { rank: { value: 14, symbol: 'A' }, suit: { symbol: '♦', letter: 'd', color: 'red' } },
            { rank: { value: 6, symbol: '6' }, suit: { symbol: '♠', letter: 's', color: 'black' } },
          ],
          hand: [],
          name: 'JC Selbst',
          chips: 1500,
          chipsCurrentlyInvested: 0,
          id: '52d293ae-1e9f-44fe-89cd-f4e18900e7f5',
          hasFolded: false,
          isAllIn: false,
        },
        {
          index: 2,
          holeCards: [
            { rank: { value: 9, symbol: '9' }, suit: { symbol: '♣', letter: 'c', color: 'black' } },
            { rank: { value: 8, symbol: '8' }, suit: { symbol: '♦', letter: 'd', color: 'red' } },
          ],
          hand: [],
          name: 'Vanessa Smith',
          chips: 1500,
          chipsCurrentlyInvested: 0,
          id: '897046ee-06e0-41b3-9f22-b42d606428cf',
          hasFolded: false,
          isAllIn: false,
        },
        {
          index: 3,
          holeCards: [
            {
              rank: { value: 11, symbol: 'J' },
              suit: { symbol: '♣', letter: 'c', color: 'black' },
            },
            { rank: { value: 10, symbol: 'T' }, suit: { symbol: '♦', letter: 'd', color: 'red' } },
          ],
          hand: [],
          name: 'JC Mercier',
          chips: 1500,
          chipsCurrentlyInvested: 0,
          id: 'a758c006-0903-4632-bea3-4e2d8f1cbc25',
          hasFolded: false,
          isAllIn: false,
        },
        {
          index: 4,
          holeCards: [
            { rank: { value: 4, symbol: '4' }, suit: { symbol: '♠', letter: 's', color: 'black' } },
            { rank: { value: 13, symbol: 'K' }, suit: { symbol: '♦', letter: 'd', color: 'red' } },
          ],
          hand: [],
          name: 'Dan Negreanu',
          chips: 1490,
          chipsCurrentlyInvested: 10,
          id: 'b7bdbd19-0e47-426d-b6de-b2f1817701c4',
          hasFolded: false,
          isAllIn: false,
        },
        {
          index: 5,
          holeCards: [
            { rank: { value: 7, symbol: '7' }, suit: { symbol: '♠', letter: 's', color: 'black' } },
            { rank: { value: 10, symbol: 'T' }, suit: { symbol: '♥', letter: 'h', color: 'red' } },
          ],
          hand: [],
          name: 'Daniel Seiver',
          chips: 1480,
          chipsCurrentlyInvested: 20,
          id: 'cb2228a0-7e6e-42be-9a0e-e7ae3bf840ee',
          hasFolded: false,
          isAllIn: false,
        },
      ],
      showdown: false,
      positions: { bb: 5, sb: 4, button: 3, cutoff: 2, mp: 1, utg: 0 },
      handHistory: [],
      handWinners: [],
      currentLevel: 1,
      currentStreet: 0,
      communityCards: {},
      nextPlayerToAct: 0,
      playersInTheHand: [
        {
          index: 0,
          holeCards: [],
          hand: [],
          name: 'Viktor Dwan',
          chips: 1500,
          chipsCurrentlyInvested: 0,
          id: 'b04ac6c5-90fb-4177-9009-b136dd97871b',
          hasFolded: false,
          isAllIn: false,
        },
        {
          index: 1,
          holeCards: [],
          hand: [],
          name: 'JC Selbst',
          chips: 1500,
          chipsCurrentlyInvested: 0,
          id: '52d293ae-1e9f-44fe-89cd-f4e18900e7f5',
          hasFolded: false,
          isAllIn: false,
        },
        {
          index: 2,
          holeCards: [],
          hand: [],
          name: 'Vanessa Smith',
          chips: 1500,
          chipsCurrentlyInvested: 0,
          id: '897046ee-06e0-41b3-9f22-b42d606428cf',
          hasFolded: false,
          isAllIn: false,
        },
        {
          index: 3,
          holeCards: [],
          hand: [],
          name: 'JC Mercier',
          chips: 1500,
          chipsCurrentlyInvested: 0,
          id: 'a758c006-0903-4632-bea3-4e2d8f1cbc25',
          hasFolded: false,
          isAllIn: false,
        },
        {
          index: 4,
          holeCards: [],
          hand: [],
          name: 'Dan Negreanu',
          chips: 1500,
          chipsCurrentlyInvested: 0,
          id: 'b7bdbd19-0e47-426d-b6de-b2f1817701c4',
          hasFolded: false,
          isAllIn: false,
        },
        {
          index: 5,
          holeCards: [],
          hand: [],
          name: 'Daniel Seiver',
          chips: 1500,
          chipsCurrentlyInvested: 0,
          id: 'cb2228a0-7e6e-42be-9a0e-e7ae3bf840ee',
          hasFolded: false,
          isAllIn: false,
        },
      ],
      whatPlayerIsDealer: null,
      highestCurrentBettor: {
        index: 0,
        holeCards: [
          { rank: { value: 9, symbol: '9' }, suit: { symbol: '♠', letter: 's', color: 'black' } },
          { rank: { value: 4, symbol: '4' }, suit: { symbol: '♦', letter: 'd', color: 'red' } },
        ],
        hand: [],
        name: 'Viktor Dwan',
        chips: 1245,
        chipsCurrentlyInvested: 255,
        id: 'b04ac6c5-90fb-4177-9009-b136dd97871b',
        hasFolded: false,
        isAllIn: false,
      },
    },
    { type: GET_NEXT_PLAYER_TO_ACT },
  )
  expect(state).toEqual({
    pot: 0,
    deck: [
      { rank: { value: 5, symbol: '5' }, suit: { symbol: '♦', letter: 'd', color: 'red' } },
      { rank: { value: 6, symbol: '6' }, suit: { symbol: '♣', letter: 'c', color: 'black' } },
      { rank: { value: 12, symbol: 'Q' }, suit: { symbol: '♣', letter: 'c', color: 'black' } },
      { rank: { value: 12, symbol: 'Q' }, suit: { symbol: '♥', letter: 'h', color: 'red' } },
      { rank: { value: 9, symbol: '9' }, suit: { symbol: '♥', letter: 'h', color: 'red' } },
      { rank: { value: 13, symbol: 'K' }, suit: { symbol: '♠', letter: 's', color: 'black' } },
      { rank: { value: 3, symbol: '3' }, suit: { symbol: '♠', letter: 's', color: 'black' } },
      { rank: { value: 8, symbol: '8' }, suit: { symbol: '♣', letter: 'c', color: 'black' } },
      { rank: { value: 7, symbol: '7' }, suit: { symbol: '♣', letter: 'c', color: 'black' } },
      { rank: { value: 6, symbol: '6' }, suit: { symbol: '♦', letter: 'd', color: 'red' } },
      { rank: { value: 12, symbol: 'Q' }, suit: { symbol: '♠', letter: 's', color: 'black' } },
      { rank: { value: 12, symbol: 'Q' }, suit: { symbol: '♦', letter: 'd', color: 'red' } },
      { rank: { value: 7, symbol: '7' }, suit: { symbol: '♦', letter: 'd', color: 'red' } },
      { rank: { value: 2, symbol: '2' }, suit: { symbol: '♣', letter: 'c', color: 'black' } },
      { rank: { value: 10, symbol: 'T' }, suit: { symbol: '♣', letter: 'c', color: 'black' } },
      { rank: { value: 8, symbol: '8' }, suit: { symbol: '♥', letter: 'h', color: 'red' } },
      { rank: { value: 11, symbol: 'J' }, suit: { symbol: '♦', letter: 'd', color: 'red' } },
      { rank: { value: 11, symbol: 'J' }, suit: { symbol: '♠', letter: 's', color: 'black' } },
      { rank: { value: 9, symbol: '9' }, suit: { symbol: '♦', letter: 'd', color: 'red' } },
      { rank: { value: 3, symbol: '3' }, suit: { symbol: '♥', letter: 'h', color: 'red' } },
      { rank: { value: 13, symbol: 'K' }, suit: { symbol: '♥', letter: 'h', color: 'red' } },
      { rank: { value: 4, symbol: '4' }, suit: { symbol: '♥', letter: 'h', color: 'red' } },
      { rank: { value: 2, symbol: '2' }, suit: { symbol: '♦', letter: 'd', color: 'red' } },
      { rank: { value: 14, symbol: 'A' }, suit: { symbol: '♠', letter: 's', color: 'black' } },
      { rank: { value: 2, symbol: '2' }, suit: { symbol: '♠', letter: 's', color: 'black' } },
      { rank: { value: 13, symbol: 'K' }, suit: { symbol: '♣', letter: 'c', color: 'black' } },
      { rank: { value: 11, symbol: 'J' }, suit: { symbol: '♥', letter: 'h', color: 'red' } },
      { rank: { value: 7, symbol: '7' }, suit: { symbol: '♥', letter: 'h', color: 'red' } },
    ],
    levels: {
      '1': { smallBlind: 10, bigBlind: 20 },
      '2': { smallBlind: 15, bigBlind: 30 },
      '3': { smallBlind: 25, bigBlind: 50 },
      '4': { smallBlind: 50, bigBlind: 100 },
      '5': { smallBlind: 75, bigBlind: 150 },
      '6': { smallBlind: 100, bigBlind: 200 },
      '7': { smallBlind: 200, bigBlind: 400 },
      '8': { smallBlind: 300, bigBlind: 600 },
      '9': { smallBlind: 400, bigBlind: 800 },
      '10': { smallBlind: 600, bigBlind: 1200 },
      '11': { smallBlind: 1000, bigBlind: 2000 },
      '12': { smallBlind: 1500, bigBlind: 3000 },
      '13': { smallBlind: 2000, bigBlind: 4000 },
      '14': { smallBlind: 3000, bigBlind: 6000 },
      '15': { smallBlind: 4000, bigBlind: 8000 },
      '16': { smallBlind: 6000, bigBlind: 12000 },
      '17': { smallBlind: 10000, bigBlind: 20000 },
      '18': { smallBlind: 15000, bigBlind: 30000 },
      '19': { smallBlind: 20000, bigBlind: 40000 },
    },
    players: [
      {
        index: 0,
        holeCards: [
          { rank: { value: 9, symbol: '9' }, suit: { symbol: '♠', letter: 's', color: 'black' } },
          { rank: { value: 4, symbol: '4' }, suit: { symbol: '♦', letter: 'd', color: 'red' } },
        ],
        hand: [],
        name: 'Viktor Dwan',
        chips: 1245,
        chipsCurrentlyInvested: 255,
        id: 'b04ac6c5-90fb-4177-9009-b136dd97871b',
        hasFolded: false,
        isAllIn: false,
      },
      {
        index: 1,
        holeCards: [
          { rank: { value: 14, symbol: 'A' }, suit: { symbol: '♦', letter: 'd', color: 'red' } },
          { rank: { value: 6, symbol: '6' }, suit: { symbol: '♠', letter: 's', color: 'black' } },
        ],
        hand: [],
        name: 'JC Selbst',
        chips: 1500,
        chipsCurrentlyInvested: 0,
        id: '52d293ae-1e9f-44fe-89cd-f4e18900e7f5',
        hasFolded: false,
        isAllIn: false,
      },
      {
        index: 2,
        holeCards: [
          { rank: { value: 9, symbol: '9' }, suit: { symbol: '♣', letter: 'c', color: 'black' } },
          { rank: { value: 8, symbol: '8' }, suit: { symbol: '♦', letter: 'd', color: 'red' } },
        ],
        hand: [],
        name: 'Vanessa Smith',
        chips: 1500,
        chipsCurrentlyInvested: 0,
        id: '897046ee-06e0-41b3-9f22-b42d606428cf',
        hasFolded: false,
        isAllIn: false,
      },
      {
        index: 3,
        holeCards: [
          { rank: { value: 11, symbol: 'J' }, suit: { symbol: '♣', letter: 'c', color: 'black' } },
          { rank: { value: 10, symbol: 'T' }, suit: { symbol: '♦', letter: 'd', color: 'red' } },
        ],
        hand: [],
        name: 'JC Mercier',
        chips: 1500,
        chipsCurrentlyInvested: 0,
        id: 'a758c006-0903-4632-bea3-4e2d8f1cbc25',
        hasFolded: false,
        isAllIn: false,
      },
      {
        index: 4,
        holeCards: [
          { rank: { value: 4, symbol: '4' }, suit: { symbol: '♠', letter: 's', color: 'black' } },
          { rank: { value: 13, symbol: 'K' }, suit: { symbol: '♦', letter: 'd', color: 'red' } },
        ],
        hand: [],
        name: 'Dan Negreanu',
        chips: 1490,
        chipsCurrentlyInvested: 10,
        id: 'b7bdbd19-0e47-426d-b6de-b2f1817701c4',
        hasFolded: false,
        isAllIn: false,
      },
      {
        index: 5,
        holeCards: [
          { rank: { value: 7, symbol: '7' }, suit: { symbol: '♠', letter: 's', color: 'black' } },
          { rank: { value: 10, symbol: 'T' }, suit: { symbol: '♥', letter: 'h', color: 'red' } },
        ],
        hand: [],
        name: 'Daniel Seiver',
        chips: 1480,
        chipsCurrentlyInvested: 20,
        id: 'cb2228a0-7e6e-42be-9a0e-e7ae3bf840ee',
        hasFolded: false,
        isAllIn: false,
      },
    ],
    showdown: false,
    positions: { bb: 5, sb: 4, button: 3, cutoff: 2, mp: 1, utg: 0 },
    handHistory: [],
    handWinners: [],
    currentLevel: 1,
    currentStreet: 0,
    communityCards: {},
    nextPlayerToAct: 1,
    playersInTheHand: [
      {
        index: 0,
        holeCards: [],
        hand: [],
        name: 'Viktor Dwan',
        chips: 1500,
        chipsCurrentlyInvested: 0,
        id: 'b04ac6c5-90fb-4177-9009-b136dd97871b',
        hasFolded: false,
        isAllIn: false,
      },
      {
        index: 1,
        holeCards: [],
        hand: [],
        name: 'JC Selbst',
        chips: 1500,
        chipsCurrentlyInvested: 0,
        id: '52d293ae-1e9f-44fe-89cd-f4e18900e7f5',
        hasFolded: false,
        isAllIn: false,
      },
      {
        index: 2,
        holeCards: [],
        hand: [],
        name: 'Vanessa Smith',
        chips: 1500,
        chipsCurrentlyInvested: 0,
        id: '897046ee-06e0-41b3-9f22-b42d606428cf',
        hasFolded: false,
        isAllIn: false,
      },
      {
        index: 3,
        holeCards: [],
        hand: [],
        name: 'JC Mercier',
        chips: 1500,
        chipsCurrentlyInvested: 0,
        id: 'a758c006-0903-4632-bea3-4e2d8f1cbc25',
        hasFolded: false,
        isAllIn: false,
      },
      {
        index: 4,
        holeCards: [],
        hand: [],
        name: 'Dan Negreanu',
        chips: 1500,
        chipsCurrentlyInvested: 0,
        id: 'b7bdbd19-0e47-426d-b6de-b2f1817701c4',
        hasFolded: false,
        isAllIn: false,
      },
      {
        index: 5,
        holeCards: [],
        hand: [],
        name: 'Daniel Seiver',
        chips: 1500,
        chipsCurrentlyInvested: 0,
        id: 'cb2228a0-7e6e-42be-9a0e-e7ae3bf840ee',
        hasFolded: false,
        isAllIn: false,
      },
    ],
    whatPlayerIsDealer: null,
    highestCurrentBettor: {
      index: 0,
      holeCards: [
        { rank: { value: 9, symbol: '9' }, suit: { symbol: '♠', letter: 's', color: 'black' } },
        { rank: { value: 4, symbol: '4' }, suit: { symbol: '♦', letter: 'd', color: 'red' } },
      ],
      hand: [],
      name: 'Viktor Dwan',
      chips: 1245,
      chipsCurrentlyInvested: 255,
      id: 'b04ac6c5-90fb-4177-9009-b136dd97871b',
      hasFolded: false,
      isAllIn: false,
    },
  })
})
