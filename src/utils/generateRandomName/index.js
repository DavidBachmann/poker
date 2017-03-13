const random = (arr) => arr[Math.floor(Math.random() * arr.length)]

const generateRandomName = () => {
  let adjectives = ['holy', 'jive', 'lido', 'drab', 'tome', 'fancy', 'done', 'fart', 'long', 'moss', 'stub', 'old', 'new', 'mass', 'hair', 'born', 'bums', 'butt', 'tax', 'into', 'out', 'in']

  let nouns = ['dab', 'men', 'sip', 'too', 'zoo', 'burr', 'kay', 'zune', 'ick', 'hum', 'data']

  let numbers = ['', '', '', '', '', '', '', '', '00', '01', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '13', '69', '247', '1337', '2017', '3000', '6969', '9999']

  let seperators = ['', '-', '_', '_', '_', 'X']

  return `${random(adjectives)}${random(seperators)}${random(nouns)}${random(numbers)}`
}

export default generateRandomName
