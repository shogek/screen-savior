document.ScreenSavior.RAINDROP_STATES = (() => {
   
   return {
      /** Only used when initializing a variable - should be updated asap. */
      INITIAL: 'INITIAL',
      
      /** The character is transitioning from white to matrix green. */
      FADING_IN: 'FADING_IN',
      
      /** The character is staying in matrix green (until eol). */
      ALIVE: 'ALIVE',
      
      /** The character is transitioning from matrix green to black. */
      FADING_OUT: 'FADING_OUT',
      
      /** The character is no longer visible. */
      DEAD: 'DEAD',
   }
   
})()