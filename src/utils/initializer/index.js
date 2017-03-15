import uuidV4 from 'uuid/v4'
import generateRandomName from '../generateRandomName'

const initalizer = (totalPlayers, startingStack) =>
  Array.from({
    length: totalPlayers
  }, () => ({
      cards: [],
      hand: [],
      name: generateRandomName(),
      chips: startingStack,
      id: uuidV4(),
    })
  )

export default initalizer
