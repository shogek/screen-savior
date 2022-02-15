document.ScreenSavior.Raindrop = (() => {

   const {
      RAINDROP_STATES,
      helpers: {
         assert
      },
   } = document.ScreenSavior

   /** I represent a single character in a rain column. */
   return class Raindrop {
      #character = ''
      #color = ''
      #glowIntensity = NaN
      #state = RAINDROP_STATES.INITIAL
      #xCoord = NaN
      #yCoord = NaN
      #timeAlive = NaN
      #timeDead = NaN

      /**
       * @param {string} character - The text character that it represents on the screen, ex.: 'A'.
       * @param {string} color - The color of the text character as it will be shown on the screen, ex.: '#FFFFFF'.
       * @param {number} glowIntensity - The intensity of the character's glow.
       * @param {number} xCoord - The X axis coordinate where it should be drawn.
       * @param {number} yCoord - The Y axis coordinate where it should be drawn.
       * @param {RAINDROP_STATES} raindropState - The state of the raindrop.
       */
      constructor({ character, color, glowIntensity, xCoord, yCoord, state, lifetime }) {
         assert({ value: character,     type: 'string', isRequired: true })
         assert({ value: color,         type: 'string', isRequired: true })
         assert({ value: glowIntensity, type: 'number', isRequired: true })
         assert({ value: xCoord,        type: 'number', isRequired: true })
         assert({ value: yCoord,        type: 'number', isRequired: true })
         assert({ value: state,         type: 'string', isRequired: true })

         this.#character = character
         this.#color = color
         this.#glowIntensity = glowIntensity
         this.#xCoord = xCoord
         this.#yCoord = yCoord
         this.#state = state
         this.#timeAlive = 0
         this.#timeDead = 0
      }

      /**
       * @returns {string} The text character that it represents on the screen, ex.: 'A'.
       */
      get character() {
         return this.#character

      }
      /**
       * @param {string} character - The text character that it represents on the screen, ex.: 'A'.
       */
      setCharacter(character) {
         this.#character = character
      }

      /**
       * @returns {string} The color of the text character as it will be shown on the screen, ex.: '#FFFFFF'.
       */
      get color() {
         return this.#color
      }
      /**
       * @param {string} color - The color of the text character as it will be shown on the screen, ex.: '#FFFFFF'.
       */
      setColor(color) {
         this.#color = color
      }

      /**
       * @returns {number} The intensity of the character's glow.
       */
      get glowIntensity() {
         return this.#glowIntensity
      }
      /**
       * @param {number} glowIntensity - The intensity of the character's glow.
       */
      setGlowIntensity(glowIntensity) {
         this.#glowIntensity = glowIntensity
      }

      /**
       * @returns {number} The X axis coordinate where it should be drawn.
       */
      get xCoord() {
         return this.#xCoord
      }

      /**
       * @returns {number} The Y axis coordinate where it should be drawn.
       */
      get yCoord() {
         return this.#yCoord
      }
      /**
       * @param {number} yCoord - The Y axis coordinate where it should be drawn.
       */
      setYCoord(yCoord) {
         this.#yCoord = yCoord
      }

      /**
       * @returns {RAINDROP_STATES} The state of the raindrop.
       */
      get state() {
         return this.#state
      }
      /**
       * @param {RAINDROP_STATES} raindropState - The state of the raindrop.
       */
      setState(raindropState) {
         this.#state = raindropState
      }

      /**
       * @returns {number} The amount of redraws the raindrop is in `RAINDROP_STATES.ALIVE`.
       */
      get timeAlive() {
         return this.#timeAlive
      }
      /**
       * @param {number} timeAlive
       */
      setTimeAlive(timeAlive) {
         this.#timeAlive = timeAlive
      }

      /**
       * @returns {number} The amount of redraws the raindrop is in `RAINDROP_STATES.DEAD`.
       */
      get timeDead() {
         return this.#timeDead
      }
      /**
       * @param {number} timeDead
       */
      setTimeDead(timeDead) {
         this.#timeDead = timeDead
      }
   }

})()