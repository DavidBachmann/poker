import determineWinner from './'
import generateNewDeck from '../generateNewDeck'
import shuffleDeck from '../shuffleDeck'

test('Determine winner with 2 players', () => {
  let players = [
    [
      {
        rank: { value: 12, symbol: 'Q' },
        suit: { symbol: '♠', letter: 's', name: 'spade', color: 'black' }
      },
      {
        rank: { value: 7, symbol: '7' },
        suit: { symbol: '♥', letter: 'h', name: 'heart', color: 'red' }
      }
    ],
    [
      { rank: { value: 9, symbol: '9' },
        suit: { symbol: '♠', letter: 's', name: 'spade', color: 'black' }
      },
      {
        rank: { value: 13, symbol: 'K' },
        suit: { symbol: '♣', letter: 'c', name: 'club', color: 'black' }
      }
    ]
  ]

  let communityCards = [
    {
      rank: { value: 8, symbol: '8' },
      suit: { symbol: '♣', letter: 'c', name: 'club', color: 'black' }
    },
    {
      rank: { value: 11, symbol: 'J' },
      suit: { symbol: '♦', letter: 'd', name: 'diamond', color: 'red' }
    },
    {
      rank: { value: 13, symbol: 'K' },
      suit: { symbol: '♦', letter: 'd', name: 'diamond', color: 'red' }
    },
    {
      rank: { value: 9, symbol: '9' },
      suit: { symbol: '♥', letter: 'h', name: 'heart', color: 'red' }
    },
    {
      rank: { value: 11, symbol: 'J' },
      suit: { symbol: '♥', letter: 'h', name: 'heart', color: 'red' }
    }
  ]


  expect(determineWinner(players, communityCards).hand).toEqual([ '9s', 'Kc', '8c', 'Jd', 'Kd', '9s', 'Jh' ])
  expect(determineWinner(players, communityCards).handDetails.name).toBe('Two Pair')
})


test('Determine winner with 3 players', () => {
  let players = [
    [
      {
        rank: { value: 14, symbol: 'A' },
        suit: { symbol: '♠', letter: 's', name: 'spade', color: 'black' }
      },
      {
        rank: { value: 14, symbol: 'A' },
        suit: { symbol: '♥', letter: 'h', name: 'heart', color: 'red' }
      }
    ],
    [
      { rank: { value: 12, symbol: 'Q' },
        suit: { symbol: '♠', letter: 's', name: 'spade', color: 'black' }
      },
      {
        rank: { value: 10, symbol: '10' },
        suit: { symbol: '♣', letter: 'c', name: 'club', color: 'black' }
      }
    ],
    [
      { rank: { value: 13, symbol: 'K' },
        suit: { symbol: '♠', letter: 's', name: 'spade', color: 'black' }
      },
      {
        rank: { value: 13, symbol: 'K' },
        suit: { symbol: '♣', letter: 'c', name: 'club', color: 'black' }
      }
    ]
  ]

  let communityCards = [
    {
      rank: { value: 8, symbol: '8' },
      suit: { symbol: '♣', letter: 'c', name: 'club', color: 'black' }
    },
    {
      rank: { value: 11, symbol: 'J' },
      suit: { symbol: '♦', letter: 'd', name: 'diamond', color: 'red' }
    },
    {
      rank: { value: 13, symbol: 'K' },
      suit: { symbol: '♦', letter: 'd', name: 'diamond', color: 'red' }
    },
    {
      rank: { value: 9, symbol: '9' },
      suit: { symbol: '♠', letter: 's', name: 'spade', color: 'black' }
    },
    {
      rank: { value: 11, symbol: 'J' },
      suit: { symbol: '♥', letter: 'h', name: 'heart', color: 'red' }
    }
  ]

  expect((determineWinner(players, communityCards).name)).toBe('Player 3')
  expect((determineWinner(players, communityCards).handDetails.descr)).toBe("Full House, K's over J's")
  expect((determineWinner(players, communityCards).allHands.length)).toBe(3)
})

test('Determine a winner in a game with 9 players', () => {
  let players = []
  let communityCards = []

  const totalPlayers = 9
  const totalCommunityCards = 5
  const shuffledDeck = shuffleDeck(generateNewDeck())

  for (let i = 0; i < totalPlayers; i++) {
    players[i] = shuffledDeck.splice(0, 2)
  }

  for (let i = 0; i < totalCommunityCards; i++) {
    communityCards = shuffledDeck.splice(0, 5)
  }

  expect((determineWinner(players, communityCards).allHands.length)).toBe(9)

})
