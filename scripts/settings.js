document.ScreenSavior.SETTINGS = (() => {

  return {
    CHARACTERS: {
      /** The character font size (in pixels). */
      FONT_SIZE: 30,
      /** The space between characters in a single column (in pixels). */
      VERTICAL_GAP: 30,
      /** The space between character columns (in pixels). */
      HORIZONTAL_GAP: 30,
      /** How long the character has the matrix green color before fading out (in screen updates). */
      LIFETIME: 10,
      /** The chance for a character to be substituted with another one (0-100). */
      RANDOMIZE_CHANCE: 95,
    }
  }

})()