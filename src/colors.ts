import { SETTINGS } from './_settings.js'

/**
 * Calculate a hex color in specific stop between two colors.
 * (`'#000000'`, `'#ffffff'`, `0.5`) => `'#808080'`
 * (black,         white,      0.5)  => gray
 * @param startColor - Example: `'#fa42c5'`.
 * @param endColor - Example: `'#fa42c5'`.
 * @param stop - Example: `0.2`
 * @returns Color in hex, example: `'#fa42c5'`.
 */
function getColorBetween(startColor: string, endColor: string, stop: number): string {
   const [startRed, startGreen, startBlue] = getAsRgb(startColor)
   const [endRed, endGreen, endBlue] = getAsRgb(endColor)

   const stopRed = Math.ceil(startRed! * stop + endRed! * (1 - stop))
   const stopGreen = Math.ceil(startGreen! * stop + endGreen! * (1 - stop))
   const stopBlue = Math.ceil(startBlue! * stop + endBlue! * (1 - stop))

   return '#' + getAsHex(stopRed) + getAsHex(stopGreen) + getAsHex(stopBlue)
}

/**
 * Convert a hex color to its representation in RGB.
 * @param hexColor - Example: `'#fa42c5'`
 * @returns Example: `[250, 66, 197]`
 */
function getAsRgb(hexColor: string): number[] {
   const color = hexColor.replace('#', '')
   return [
      parseInt(color.substring(0, 2), 16),
      parseInt(color.substring(2, 4), 16),
      parseInt(color.substring(4, 6), 16)
   ]
}

/**
 * Converts from decimal to hexadecimal.
 * (`197`) => `'C5'`
 */
function getAsHex(number: number): string {
   const hex = number.toString(16)
   return hex.length === 1 ? '0' + hex : hex
}

/** Used by the rain to color the characters inside. */
export const COLORS = {
   /** Used when the character's lifetime ends (it's the background color). */
   DEAD: SETTINGS.COLORS.DEAD,

   /** [Fade-out] A generated color between `DEAD` and `ALIVE`. Closer to `DEAD`. */
   TO_DEAD_4: getColorBetween(SETTINGS.COLORS.DEAD, SETTINGS.COLORS.ALIVE, 0.8),
   /** [Fade-out] A generated color between `DEAD` and `ALIVE`. Closer to `DEAD`. */
   TO_DEAD_3: getColorBetween(SETTINGS.COLORS.DEAD, SETTINGS.COLORS.ALIVE, 0.6),
   /** [Fade-out] A generated color between `DEAD` and `ALIVE`. Closer to `ALIVE`. */
   TO_DEAD_2: getColorBetween(SETTINGS.COLORS.DEAD, SETTINGS.COLORS.ALIVE, 0.4),
   /** [Fade-out] A generated color between `DEAD` and `ALIVE`. Closer to `ALIVE`. */
   TO_DEAD_1: getColorBetween(SETTINGS.COLORS.DEAD, SETTINGS.COLORS.ALIVE, 0.2),

   /** Used when the characters lifetime begins (between fade-in and fade-out). */
   ALIVE: SETTINGS.COLORS.ALIVE,

   /** [Fade-in] A generated color between `ALIVE` and `NEW`. Closer to `ALIVE`. */
   TO_ALIVE_1: getColorBetween(SETTINGS.COLORS.NEW, SETTINGS.COLORS.ALIVE, 0.2),
   /** [Fade-in] A generated color between `ALIVE` and `NEW`. Closer to `ALIVE`. */
   TO_ALIVE_2: getColorBetween(SETTINGS.COLORS.NEW, SETTINGS.COLORS.ALIVE, 0.4),
   /** [Fade-in] A generated color between `ALIVE` and `NEW`. Closer to `NEW`. */
   TO_ALIVE_3: getColorBetween(SETTINGS.COLORS.NEW, SETTINGS.COLORS.ALIVE, 0.6),
   /** [Fade-in] A generated color between `ALIVE` and `NEW`. Closer to `NEW`. */
   TO_ALIVE_4: getColorBetween(SETTINGS.COLORS.NEW, SETTINGS.COLORS.ALIVE, 0.8),

   /** Used when a character is drawn on the screen for the first time. */
   NEW: SETTINGS.COLORS.NEW,
}
