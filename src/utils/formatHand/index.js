export const formatHand = cards => {
  const formattedHand = cards.map(
    card => `${card.rank.symbol}${card.suit.letter}`,
  )

  return formattedHand
}
