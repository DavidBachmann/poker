export const formatHand = (hand) => {
  const formattedHand = hand.map(
    (card) => `${card.rank.symbol}${card.suit.letter}`
  )

  return formattedHand
}
