export default function handleGettingNextStreet(currentStreet) {
  return currentStreet > 3 ? 0 : currentStreet + 1
}
