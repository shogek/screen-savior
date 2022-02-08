document.ScreenSavior.RAINDROP_STATES = (() => {

  return {
    /** The character is transitioning from white to matrix green. */
    APPEARING: 'APPEARING',

    /** The character is staying in matrix green (until eol). */
    LIVING: 'LIVING',

    /** The character is transitioning from matrix green to black. */
    DISAPPEARING: 'DISAPPEARING',
  }

})()