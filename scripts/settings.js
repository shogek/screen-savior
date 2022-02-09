document.ScreenSavior.SETTINGS = (() => {

  return {
    CHARACTERS: {
      /** The character font size (in pixels). */
      FONT_SIZE: 30,
      /** The space between characters in a single column (in pixels). */
      VERTICAL_GAP: 15,
      /** The space between character columns (in pixels). */
      HORIZONTAL_GAP: 35,
      /** How long the character has the matrix green color before fading out (in screen updates). */
      LIFETIME: 8,
      /** The chance for a character to be substituted with another one (0-100). */
      RANDOMIZE_CHANCE: 95,
      /** Add a glow to the most recent characters (0-100). */
      GLOW_INTENSITY: 5,
    }
  }

})()