const zeroZidthChars = [
  '\u200C',
  '\u200D',
  '\uDB40\uDC61',
  '\uDB40\uDC62',
  '\uDB40\uDC63',
  '\uDB40\uDC64',
  '\uDB40\uDC65',
  '\uDB40\uDC66',
  '\uDB40\uDC67',
  '\uDB40\uDC68',
  '\uDB40\uDC69',
  '\uDB40\uDC6A',
  '\uDB40\uDC6B',
  '\uDB40\uDC6C',
  '\uDB40\uDC6D',
  '\uDB40\uDC6E',
  '\uDB40\uDC6F',
  '\uDB40\uDC70',
  '\uDB40\uDC71',
  '\uDB40\uDC72',
  '\uDB40\uDC73',
  '\uDB40\uDC74',
  '\uDB40\uDC75',
  '\uDB40\uDC76',
  '\uDB40\uDC77',
  '\uDB40\uDC78',
  '\uDB40\uDC79',
  '\uDB40\uDC7A',
  '\uDB40\uDC7F',
]

export function getRandomZeroWidthChar() {
  return zeroZidthChars[Math.floor(Math.random() * zeroZidthChars.length)]
}

export function getZeroWidthSlug(length: number) {
  return Array.from({ length }, () => getRandomZeroWidthChar()).join('');
}

export function getRandomAmogusSlug() {
  const alphabet = '⍝ඞ⣿.°•';
  const length = 20;
  let result = '';
  for (let i = 0; i < length; i++) {
    result += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  return result;
}
