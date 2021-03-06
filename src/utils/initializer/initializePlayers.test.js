import initializePlayers from './initializePlayers'

test('9 initialized players', () => {
  const nineInitializedPlayers = initializePlayers(9, 1500, false, false)
  expect(nineInitializedPlayers).toEqual([
    {
      chips: 1500,
      chipsCurrentlyInvested: 0,
      hand: [],
      hasActed: false,
      hasFolded: false,
      holeCards: [],
      id: null,
      index: 0,
      isAllIn: false,
      name: null,
    },
    {
      chips: 1500,
      chipsCurrentlyInvested: 0,
      hand: [],
      hasActed: false,
      hasFolded: false,
      holeCards: [],
      id: null,
      index: 1,
      isAllIn: false,
      name: null,
    },
    {
      chips: 1500,
      chipsCurrentlyInvested: 0,
      hand: [],
      hasActed: false,
      hasFolded: false,
      holeCards: [],
      id: null,
      index: 2,
      isAllIn: false,
      name: null,
    },
    {
      chips: 1500,
      chipsCurrentlyInvested: 0,
      hand: [],
      hasActed: false,
      hasFolded: false,
      holeCards: [],
      id: null,
      index: 3,
      isAllIn: false,
      name: null,
    },
    {
      chips: 1500,
      chipsCurrentlyInvested: 0,
      hand: [],
      hasActed: false,
      hasFolded: false,
      holeCards: [],
      id: null,
      index: 4,
      isAllIn: false,
      name: null,
    },
    {
      chips: 1500,
      chipsCurrentlyInvested: 0,
      hand: [],
      hasActed: false,
      hasFolded: false,
      holeCards: [],
      id: null,
      index: 5,
      isAllIn: false,
      name: null,
    },
    {
      chips: 1500,
      chipsCurrentlyInvested: 0,
      hand: [],
      hasActed: false,
      hasFolded: false,
      holeCards: [],
      id: null,
      index: 6,
      isAllIn: false,
      name: null,
    },
    {
      chips: 1500,
      chipsCurrentlyInvested: 0,
      hand: [],
      hasActed: false,
      hasFolded: false,
      holeCards: [],
      id: null,
      index: 7,
      isAllIn: false,
      name: null,
    },
    {
      chips: 1500,
      chipsCurrentlyInvested: 0,
      hand: [],
      hasActed: false,
      hasFolded: false,
      holeCards: [],
      id: null,
      index: 8,
      isAllIn: false,
      name: null,
    },
  ])
  expect(nineInitializedPlayers).toHaveLength(9)
})
