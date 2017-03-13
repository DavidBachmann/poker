import guid from '../guid'
import generateRandomName from '../generateRandomName'

const initalizer = (totalPlayers, startingStack) =>
  Array.from({
    length: totalPlayers
  }, () => ({
      cards: [],
      hand: [],
      name: generateRandomName(),
      chips: startingStack,
      id: guid(),
    })
  )

export default initalizer
