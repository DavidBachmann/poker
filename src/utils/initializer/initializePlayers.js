import uuidV4 from 'uuid/v4'
import generateRandomName from '../generateRandomName'
import playerActions from '../playerActions'

const initalizePlayers = (totalPlayers, startingStack) =>
  Array.from({
    length: totalPlayers
  }, () => ({
      currentAction: playerActions.THINKING,
      cards: [],
      hand: [],
      name: generateRandomName(),
      chips: startingStack,
      id: uuidV4(),
    })
  )

export default initalizePlayers
