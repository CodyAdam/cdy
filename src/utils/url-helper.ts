import { amogusChars, emojiAnimalChars, emojiFoodChars, emojiHandChars, emojiHeadChars, emojiHeartChars, zeroZidthChars } from './chars-helpers';


function getRandomFromArray(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)] as string;
}

function getMultipleRandomFromArray(arr: string[], length: number): string {
  return Array.from({ length }, () => getRandomFromArray(arr)).join('');
}

export function getZeroWidthSlug(length: number) {
  return getMultipleRandomFromArray(zeroZidthChars, length);
}

export function getRandomAmogusSlug(length: number) {
  return getMultipleRandomFromArray(amogusChars, length);
}

export function getRandomHandSlug(length: number) {
  return getMultipleRandomFromArray(emojiHandChars, length);
}

export function getRandomHeadSlug(length: number) {
  return getMultipleRandomFromArray(emojiHeadChars, length);
}

export function getRandomHeartSlug(length: number) {
  return getMultipleRandomFromArray(emojiHeartChars, length);
}

export function getRandomAnimalSlug(length: number) {
  return getMultipleRandomFromArray(emojiAnimalChars, length);
}

export function getRandomFoodSlug(length: number) {
  return getMultipleRandomFromArray(emojiFoodChars, length);
}

export function getRandomEmojiSlug(length: number) {
  return getMultipleRandomFromArray([...emojiAnimalChars, ...emojiFoodChars, ...emojiHandChars, ...emojiHeadChars, ...emojiHeartChars], length);
}