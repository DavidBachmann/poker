import handlePayingPlayers from './handlePayingPlayers'

test('Paying a player', () => {
  // Takes players, handWinners, pot
  expect(
    handlePayingPlayers(
      [
        {
          index: 0,
          holeCards: [
            {
              rank: {
                value: 8,
                symbol: '8',
              },
              suit: {
                symbol: '♣',
                letter: 'c',
                color: 'black',
              },
            },
            {
              rank: {
                value: 12,
                symbol: 'Q',
              },
              suit: {
                symbol: '♦',
                letter: 'd',
                color: 'red',
              },
            },
          ],
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
          holeCards: [
            {
              rank: {
                value: 14,
                symbol: 'A',
              },
              suit: {
                symbol: '♠',
                letter: 's',
                color: 'black',
              },
            },
            {
              rank: {
                value: 10,
                symbol: 'T',
              },
              suit: {
                symbol: '♦',
                letter: 'd',
                color: 'red',
              },
            },
          ],
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
          handDetails: {
            cardPool: [
              {
                value: 'A',
                suit: 's',
                rank: 13,
                wildValue: 'A',
              },
              {
                value: 'T',
                suit: 'd',
                rank: 9,
                wildValue: 'T',
              },
              {
                value: 'T',
                suit: 'c',
                rank: 9,
                wildValue: 'T',
              },
              {
                value: '8',
                suit: 's',
                rank: 7,
                wildValue: '8',
              },
              {
                value: '6',
                suit: 'c',
                rank: 5,
                wildValue: '6',
              },
              {
                value: '5',
                suit: 'h',
                rank: 4,
                wildValue: '5',
              },
              {
                value: '5',
                suit: 'c',
                rank: 4,
                wildValue: '5',
              },
            ],
            cards: [
              {
                value: 'T',
                suit: 'd',
                rank: 9,
                wildValue: 'T',
              },
              {
                value: 'T',
                suit: 'c',
                rank: 9,
                wildValue: 'T',
              },
              {
                value: '5',
                suit: 'h',
                rank: 4,
                wildValue: '5',
              },
              {
                value: '5',
                suit: 'c',
                rank: 4,
                wildValue: '5',
              },
              {
                value: 'A',
                suit: 's',
                rank: 13,
                wildValue: 'A',
              },
            ],
            suits: {
              s: [
                {
                  value: 'A',
                  suit: 's',
                  rank: 13,
                  wildValue: 'A',
                },
                {
                  value: '8',
                  suit: 's',
                  rank: 7,
                  wildValue: '8',
                },
              ],
              d: [
                {
                  value: 'T',
                  suit: 'd',
                  rank: 9,
                  wildValue: 'T',
                },
              ],
              c: [
                {
                  value: 'T',
                  suit: 'c',
                  rank: 9,
                  wildValue: 'T',
                },
                {
                  value: '6',
                  suit: 'c',
                  rank: 5,
                  wildValue: '6',
                },
                {
                  value: '5',
                  suit: 'c',
                  rank: 4,
                  wildValue: '5',
                },
              ],
              h: [
                {
                  value: '5',
                  suit: 'h',
                  rank: 4,
                  wildValue: '5',
                },
              ],
            },
            values: [
              [
                {
                  value: 'A',
                  suit: 's',
                  rank: 13,
                  wildValue: 'A',
                },
              ],
              null,
              null,
              null,
              [
                {
                  value: 'T',
                  suit: 'd',
                  rank: 9,
                  wildValue: 'T',
                },
                {
                  value: 'T',
                  suit: 'c',
                  rank: 9,
                  wildValue: 'T',
                },
              ],
              null,
              [
                {
                  value: '8',
                  suit: 's',
                  rank: 7,
                  wildValue: '8',
                },
              ],
              null,
              [
                {
                  value: '6',
                  suit: 'c',
                  rank: 5,
                  wildValue: '6',
                },
              ],
              [
                {
                  value: '5',
                  suit: 'h',
                  rank: 4,
                  wildValue: '5',
                },
                {
                  value: '5',
                  suit: 'c',
                  rank: 4,
                  wildValue: '5',
                },
              ],
              null,
              null,
              null,
              null,
            ],
            wilds: [],
            name: 'Two Pair',
            game: {
              descr: 'standard',
              cardsInHand: 5,
              handValues: [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
              ],
              wildValue: null,
              wildStatus: 1,
              wheelStatus: 0,
              sfQualify: 5,
              lowestQualified: null,
              noKickers: false,
            },
            sfLength: 0,
            alwaysQualifies: true,
            rank: 3,
            descr: "Two Pair, 10's & 5's",
            isPossible: true,
          },
        },
      ],
      2000,
    ),
  ).toBe([])
})
