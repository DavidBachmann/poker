const random = arr => arr[Math.floor(Math.random() * arr.length)]

export default function randomNameGenerator() {
  let first = [
    'Daniel',
    'Phil',
    'Ole',
    'Jason',
    'Tom',
    'Phil',
    'Viktor',
    'Vanessa',
    'JC',
    'Vanessa',
    'Dan',
    'Scott',
    'Liv',
  ]

  let last = [
    'Negreanu',
    'Ivey',
    'Schemion',
    'Mercier',
    'Dwan',
    'Hellmuth',
    'Blom',
    'Selbst',
    'Tran',
    'Rousso',
    'Smith',
    'Seiver',
    'Boeree',
  ]

  return `${random(first)} ${random(last)}`
}
