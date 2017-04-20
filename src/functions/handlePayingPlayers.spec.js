import handlePayingPlayers from './handlePayingPlayers'
test('Paying a single winner', () => {
  // Takes players, handWinners, pot
  // Holecards removed for brevity
  expect(
    handlePayingPlayers(
      [
        {
          index: 0,
          holeCards: [],
          hand: [],
          name: 'Phil Dwan',
          chips: 735,
          chipsCurrentlyInvested: 0,
          id: 'da91075c-7d3a-4d83-8ad6-71bf95209f33',
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
          id: 'd64bce2a-965d-4fa7-8c6b-7f5034a8b8e5',
          hasFolded: true,
          isAllIn: false,
        },
        {
          index: 2,
          holeCards: [],
          hand: [],
          name: 'Ole Smith',
          chips: 735,
          chipsCurrentlyInvested: 0,
          id: '86e7628c-b1b9-46d2-9485-0b42d79b84b3',
          hasFolded: false,
          isAllIn: false,
        },
        {
          index: 3,
          holeCards: [],
          hand: [],
          name: 'Liv Smith',
          chips: 1500,
          chipsCurrentlyInvested: 0,
          id: '1751fe1c-40dd-423a-8424-bcbe381ac871',
          hasFolded: true,
          isAllIn: false,
        },
        {
          index: 4,
          holeCards: [],
          hand: [],
          name: 'Phil Hellmuth',
          chips: 1490,
          chipsCurrentlyInvested: 0,
          id: 'ec8f55e1-5fd3-4ffa-a4e4-36ae9ac7d91e',
          hasFolded: true,
          isAllIn: false,
        },
        {
          index: 5,
          holeCards: [],
          hand: [],
          name: 'Liv Negreanu',
          chips: 1480,
          chipsCurrentlyInvested: 0,
          id: 'fefa3535-989a-41ac-8e88-c26f2c615926',
          hasFolded: true,
          isAllIn: false,
        },
      ],
      [
        {
          place: 1,
          id: '86e7628c-b1b9-46d2-9485-0b42d79b84b3',
          name: 'Ole Smith',
          hand: ['As', 'Td', 'Tc', '5h', '5c', '6c', '8s'],
        },
      ],
      2000,
    ),
  ).toEqual([
    {
      index: 0,
      holeCards: [],
      hand: [],
      name: 'Phil Dwan',
      chips: 735,
      chipsCurrentlyInvested: 0,
      id: 'da91075c-7d3a-4d83-8ad6-71bf95209f33',
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
      id: 'd64bce2a-965d-4fa7-8c6b-7f5034a8b8e5',
      hasFolded: true,
      isAllIn: false,
    },
    {
      index: 2,
      holeCards: [],
      hand: [],
      name: 'Ole Smith',
      chips: 2735,
      chipsCurrentlyInvested: 0,
      id: '86e7628c-b1b9-46d2-9485-0b42d79b84b3',
      hasFolded: false,
      isAllIn: false,
    },
    {
      index: 3,
      holeCards: [],
      hand: [],
      name: 'Liv Smith',
      chips: 1500,
      chipsCurrentlyInvested: 0,
      id: '1751fe1c-40dd-423a-8424-bcbe381ac871',
      hasFolded: true,
      isAllIn: false,
    },
    {
      index: 4,
      holeCards: [],
      hand: [],
      name: 'Phil Hellmuth',
      chips: 1490,
      chipsCurrentlyInvested: 0,
      id: 'ec8f55e1-5fd3-4ffa-a4e4-36ae9ac7d91e',
      hasFolded: true,
      isAllIn: false,
    },
    {
      index: 5,
      holeCards: [],
      hand: [],
      name: 'Liv Negreanu',
      chips: 1480,
      chipsCurrentlyInvested: 0,
      id: 'fefa3535-989a-41ac-8e88-c26f2c615926',
      hasFolded: true,
      isAllIn: false,
    },
  ])
})

test('Paying two winners', () => {
  // Takes players, handWinners, pot
  // Holecards removed for brevity
  expect(
    handlePayingPlayers(
      [
        {
          index: 0,
          holeCards: [],
          hand: [],
          name: 'Phil Dwan',
          chips: 735,
          chipsCurrentlyInvested: 0,
          id: 'da91075c-7d3a-4d83-8ad6-71bf95209f33',
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
          id: 'd64bce2a-965d-4fa7-8c6b-7f5034a8b8e5',
          hasFolded: true,
          isAllIn: false,
        },
        {
          index: 2,
          holeCards: [],
          hand: [],
          name: 'Ole Smith',
          chips: 735,
          chipsCurrentlyInvested: 0,
          id: '86e7628c-b1b9-46d2-9485-0b42d79b84b3',
          hasFolded: false,
          isAllIn: false,
        },
        {
          index: 3,
          holeCards: [],
          hand: [],
          name: 'Liv Smith',
          chips: 1500,
          chipsCurrentlyInvested: 0,
          id: '1751fe1c-40dd-423a-8424-bcbe381ac871',
          hasFolded: true,
          isAllIn: false,
        },
        {
          index: 4,
          holeCards: [],
          hand: [],
          name: 'Phil Hellmuth',
          chips: 1490,
          chipsCurrentlyInvested: 0,
          id: 'ec8f55e1-5fd3-4ffa-a4e4-36ae9ac7d91e',
          hasFolded: true,
          isAllIn: false,
        },
        {
          index: 5,
          holeCards: [],
          hand: [],
          name: 'Liv Negreanu',
          chips: 1480,
          chipsCurrentlyInvested: 0,
          id: 'fefa3535-989a-41ac-8e88-c26f2c615926',
          hasFolded: true,
          isAllIn: false,
        },
      ],
      [
        {
          place: 1,
          id: '86e7628c-b1b9-46d2-9485-0b42d79b84b3',
          name: 'Ole Smith',
          hand: ['As', 'Td', 'Tc', '5h', '5c', '6c', '8s'],
        },
        {
          place: 1,
          id: 'ec8f55e1-5fd3-4ffa-a4e4-36ae9ac7d91e',
          name: 'Phil Hellmuth',
          hand: ['Ad', 'Tc', 'Th', '5d', '5s', '6s', '8d'],
        },
      ],
      2000,
    ),
  ).toEqual([
    {
      index: 0,
      holeCards: [],
      hand: [],
      name: 'Phil Dwan',
      chips: 735,
      chipsCurrentlyInvested: 0,
      id: 'da91075c-7d3a-4d83-8ad6-71bf95209f33',
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
      id: 'd64bce2a-965d-4fa7-8c6b-7f5034a8b8e5',
      hasFolded: true,
      isAllIn: false,
    },
    {
      index: 2,
      holeCards: [],
      hand: [],
      name: 'Ole Smith',
      chips: 1735,
      chipsCurrentlyInvested: 0,
      id: '86e7628c-b1b9-46d2-9485-0b42d79b84b3',
      hasFolded: false,
      isAllIn: false,
    },
    {
      index: 3,
      holeCards: [],
      hand: [],
      name: 'Liv Smith',
      chips: 1500,
      chipsCurrentlyInvested: 0,
      id: '1751fe1c-40dd-423a-8424-bcbe381ac871',
      hasFolded: true,
      isAllIn: false,
    },
    {
      index: 4,
      holeCards: [],
      hand: [],
      name: 'Phil Hellmuth',
      chips: 2490,
      chipsCurrentlyInvested: 0,
      id: 'ec8f55e1-5fd3-4ffa-a4e4-36ae9ac7d91e',
      hasFolded: true,
      isAllIn: false,
    },
    {
      index: 5,
      holeCards: [],
      hand: [],
      name: 'Liv Negreanu',
      chips: 1480,
      chipsCurrentlyInvested: 0,
      id: 'fefa3535-989a-41ac-8e88-c26f2c615926',
      hasFolded: true,
      isAllIn: false,
    },
  ])
})
