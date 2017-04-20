export default function handleSettingHighestCurrentBettor(players) {
  const highestCurrentBettor = players.reduce(
    (prev, current) =>
      (prev.chipsCurrentlyInvested > current.chipsCurrentlyInvested ? prev : current),
  )

  return highestCurrentBettor
}
