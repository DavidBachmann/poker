export default function delay(amount) {
  return new Promise(resolve => setTimeout(resolve, amount))
}
