function generateID(length = 21) {
  let result = '';
  for (let i = 0; i < length; i++) {
    // Append a random digit (0–9)
    result += Math.floor(Math.random() * 10);
  }

  return result;
}

module.exports = generateID;
