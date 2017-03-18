import initializePlayerPots from './initializePlayerPots'

test('Empty Player Pots', () => {
  const EmptyPlayerPots = initializePlayerPots(9)

  expect(EmptyPlayerPots).toEqual([0,0,0,0,0,0,0,0,0])
  expect(EmptyPlayerPots).toHaveLength(9)
})
