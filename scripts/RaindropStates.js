document.ScreenSavior.RAINDROP_STATES = (() => {

  return {
    /** Only used when initializing a variable - should be updated asap. */
    INITIAL: 'INITIAL',

    /** The character is transitioning from white to matrix green. */
    APPEARING: 'APPEARING',

    /** The character is staying in matrix green (until eol). */
    LIVING: 'LIVING',

    /** The character is transitioning from matrix green to black. */
    DISAPPEARING: 'DISAPPEARING',

    /** The character is no longer visible. */
    DEAD: 'DEAD',
  }

})()