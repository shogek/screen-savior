document.ScreenSavior.SETTINGS = (() => {

  return {
    REFRESH_TIME: 100,

    COLORS: {
      /** The fade-out color. When a character is close to disappearing, it uses this color. */
      DEAD: '#000000',
      /** The color the characters use between fade-in and fade-out. */
      LIVING: '#006300',
      /** The fade-in color. When a character appears on screen, it uses this color. */
      NEW: '#ffffff',
    },

    RAIN: {
      /** The space between the left most column and the screen side (in pixels). */
      PADDING_TOP: 15,
      /** The space between the top of the column and the screen top (in pixels). */
      PADDING_LEFT: 15,
      /** A range from 0 to X (in miliseconds) from which a column of rain may begin. */
      RANDOMIZE_START: 2000,
    },

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