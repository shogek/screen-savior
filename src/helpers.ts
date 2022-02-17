import { CHARACTERS } from './characters'

/**
 * Generate a random number between zero and provided max value.
 * @param max - Upper limit.
 */
export function getRandomNumber(max: number) {
   return Math.floor(Math.random() * max)
}

export function getRandomCharacter() {
   return CHARACTERS[getRandomNumber(CHARACTERS.length)] ?? 'X'
}
