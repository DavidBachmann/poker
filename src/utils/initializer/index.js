const initalizer = (totalPlayers, startingStack) =>
  Array.from({
    length: totalPlayers
  }, () => ({
      cards: [],
      chips: startingStack
    })
  )

export default initalizer
