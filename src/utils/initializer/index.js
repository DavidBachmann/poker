import guid from '../guid'

const initalizer = (totalPlayers, startingStack) =>
  Array.from({
    length: totalPlayers
  }, () => ({
      cards: [],
      hand: [],
      name: Math.random().toString(36).substr(2, 5),
      chips: startingStack,
      id: guid(),
    })
  )

export default initalizer
