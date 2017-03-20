import uuidV4 from 'uuid/v4'
import randomNameGenerator from '../randomNameGenerator'

const initalizePlayers = (totalPlayers, startingStack, generateRandomName = true, generateRandomId = true) =>
  Array.from({
    length: totalPlayers
  }, (_, index) => ({
      index,
      cards: [],
      hand: [],
      name: generateRandomName ? randomNameGenerator() : null,
      chips: startingStack,
      chipsInvested: 0,
      blindsPaid: 0,
      id: generateRandomId ? uuidV4() : null,
      facingRaise: false,
      hasFolded: false,
      hasActedThisTurn: false,
      shouldActThisTurn: true,
    })
  )

export default initalizePlayers
