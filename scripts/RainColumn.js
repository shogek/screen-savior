document.ScreenSavior.RainColumn = (() => {

   const {
      CHARACTERS,
      SETTINGS,
      COLORS,
      RAINDROP_STATES,
      Raindrop,
      helpers: {
         assert,
         getRandomNumber,
      }
   } = document.ScreenSavior

   /** I repesent a single vertical column in the matrix rain. */
   return class RainColumn {
      #raindropsToUpdate = 1
      #raindrops = []

      /**
       * Initialize all the raindrops and prepare them for drawing.
       * @param {string} startingXCoord - The X axis coordinate from where the raindrops should be drawn.
       * @param {string} startingYCoord - The Y axis coordinate from where the raindrops should be drawn.
       * @param {number} maxYCoord - The height of the canvas.
       * @param {number} characterHeight - Font size.
       * @param {number} characterGap - Gap (in pixels) between one raindrop's bottom and the other ones top.
       */
      init({ startingXCoord, startingYCoord, maxYCoord, characterHeight, characterGap }) {
         assert({ value: startingXCoord,  type: 'number', isRequired: true })
         assert({ value: startingYCoord,  type: 'number', isRequired: true })
         assert({ value: maxYCoord,       type: 'number', isRequired: true })
         assert({ value: characterHeight, type: 'number', isRequired: true })
         assert({ value: characterGap,    type: 'number', isRequired: true })

         for (let currentYCoord = startingYCoord; currentYCoord <= maxYCoord; currentYCoord += characterHeight + characterGap) {
            const raindrop = new Raindrop({
               character: CHARACTERS[getRandomNumber(CHARACTERS.length)],
               color: COLORS.DEAD,
               glowIntensity: 0,
               xCoord: startingXCoord,
               yCoord: currentYCoord,
               state: RAINDROP_STATES.INITIAL,
            })
            this.#raindrops.push(raindrop)
         }
      }

      /**
       * Draw the raindrops in the column.
       * @param {CanvasRenderingContext2D} context
       */
      draw(context) {
         const toInitializeCount = this.#raindropsToUpdate > this.#raindrops.length
         ? this.#raindrops.length
         : this.#raindropsToUpdate

         for (let i = 0; i < toInitializeCount; i++) {
            const raindrop = this.#raindrops[i]

            const doesNeedRedraw = this.#updateRaindrop(raindrop)
            if (!doesNeedRedraw) {
               continue
            }

            this.#clearRaindrop(raindrop, context)
            this.#tryRandomizeCharacter(raindrop)
            this.#drawRaindrop(raindrop, context)
         }

         this.#raindropsToUpdate++
      }

      /**
       * @param {Raindrop} raindrop
       * @returns {boolean} `true` if the raindrop needs to be redrawn, else - `false`
       */
      static #updateRaindropWhenInitialState(raindrop) {
         raindrop.setState(RAINDROP_STATES.FADING_IN)
         raindrop.setColor(COLORS.NEW)
         raindrop.setGlowIntensity(SETTINGS.CHARACTERS.GLOW_INTENSITY)
         return true
      }

      /**
       * @param {Raindrop} raindrop
       * @returns {boolean} `true` if the raindrop needs to be redrawn, else - `false`
       */
      static #updateRaindropWhenFadingInState(raindrop) {
         switch (raindrop.color) {
            case COLORS.NEW:
               raindrop.setColor(COLORS.TO_ALIVE_4)
               break

            case COLORS.TO_ALIVE_1:
               raindrop.setState(RAINDROP_STATES.ALIVE)
               raindrop.setColor(COLORS.ALIVE)
               raindrop.setGlowIntensity(0)
               break

            case COLORS.TO_ALIVE_2:
               raindrop.setColor(COLORS.TO_ALIVE_1)
               break

            case COLORS.TO_ALIVE_3:
               raindrop.setColor(COLORS.TO_ALIVE_2)
               break

            case COLORS.TO_ALIVE_4:
               raindrop.setColor(COLORS.TO_ALIVE_3)
               break

            default:
               debugger
               throw new Error(`Raindrop in state (${raindrop.state}) has an unknown color (${raindrop.color})!`)
         }

         return true
      }

      /**
       * @param {Raindrop} raindrop
       * @returns {boolean} `true` if the raindrop needs to be redrawn, else - `false`
       */
      static #updateRaindropWhenAliveState(raindrop) {
         if (raindrop.timeAlive < SETTINGS.CHARACTERS.TIME_ALIVE) {
            raindrop.setTimeAlive(raindrop.timeAlive + 1)
            return false
         }

         raindrop.setState(RAINDROP_STATES.FADING_OUT)
         raindrop.setColor(COLORS.TO_DEAD_1)
         raindrop.setGlowIntensity(0)
         raindrop.setTimeAlive(0)
         return true
      }

      /**
       * @param {Raindrop} raindrop
       * @returns {boolean} `true` if the raindrop needs to be redrawn, else - `false`
       */
      static #updateRaindropWhenFadingOutState(raindrop) {
         switch (raindrop.color) {
            case COLORS.TO_DEAD_1:
               raindrop.setColor(COLORS.TO_DEAD_2)
               break

            case COLORS.TO_DEAD_2:
               raindrop.setColor(COLORS.TO_DEAD_3)
               break

            case COLORS.TO_DEAD_3:
               raindrop.setColor(COLORS.TO_DEAD_4)
               break

            case COLORS.TO_DEAD_4:
               raindrop.setState(RAINDROP_STATES.DEAD)
               raindrop.setColor(COLORS.DEAD)
               raindrop.setGlowIntensity(0)
               break

            default:
               debugger
               throw new Error(`Raindrop in state (${raindrop.state}) has an unknown color (${raindrop.color})!`)
         }

         return true
      }

      /**
       * @param {Raindrop} raindrop
       * @returns {boolean} `true` if the raindrop needs to be redrawn, else - `false`
       */
      static #updateRaindropWhenDeadState(raindrop) {
         if (raindrop.timeDead < SETTINGS.CHARACTERS.TIME_DEAD) {
            raindrop.setTimeDead(raindrop.timeDead + 1)
            return false
         }

         raindrop.setTimeDead(0)
         raindrop.setState(RAINDROP_STATES.FADING_IN)
         raindrop.setColor(COLORS.NEW)
         raindrop.setGlowIntensity(SETTINGS.CHARACTERS.GLOW_INTENSITY)
         return true
      }

      /**
       * @param {Raindrop} raindrop
       * @returns {boolean} `true` if the raindrop needs to be redrawn, else - `false`
       */
      #updateRaindrop(raindrop) {
         switch (raindrop.state) {
            case RAINDROP_STATES.INITIAL:    return RainColumn.#updateRaindropWhenInitialState(raindrop)
            case RAINDROP_STATES.FADING_IN:  return RainColumn.#updateRaindropWhenFadingInState(raindrop)
            case RAINDROP_STATES.ALIVE:      return RainColumn.#updateRaindropWhenAliveState(raindrop)
            case RAINDROP_STATES.FADING_OUT: return RainColumn.#updateRaindropWhenFadingOutState(raindrop)
            case RAINDROP_STATES.DEAD:       return RainColumn.#updateRaindropWhenDeadState(raindrop)
            default:
            debugger
            throw new Error(`Raindrop is in an unknown state (${raindrop.state})!`)
         }
      }

      /**
       * Change the raindrops displayed character if its lucky.
       * @param {Raindrop} raindrop
       * @returns {void}
       */
      #tryRandomizeCharacter(raindrop) {
         const randomNumber = getRandomNumber(100)
         if (randomNumber < SETTINGS.CHARACTERS.RANDOMIZE_CHANCE) {
            return
         }

         const randomCharacter = CHARACTERS[getRandomNumber(CHARACTERS.length)]
         raindrop.setCharacter(randomCharacter)
      }

      /**
       * Draw a black square in the place of the raindrop.
       * @param {Raindrop} raindrop
       * @param {CanvasRenderingContext2D} context
       * @returns {void}
       */
      #clearRaindrop(raindrop, context) {
         context.shadowColor = COLORS.DEAD
         context.shadowBlur = 0
         context.fillStyle = COLORS.DEAD

         const fontSize = SETTINGS.CHARACTERS.FONT_SIZE
         const glowIntensity = SETTINGS.CHARACTERS.GLOW_INTENSITY
         context.fillRect(
            raindrop.xCoord - glowIntensity * 3,
            raindrop.yCoord - glowIntensity * 3,
            fontSize + glowIntensity * 3,
            fontSize + glowIntensity * 3,
         )
      }

      /**
       * @param {Raindrop} raindrop
       * @param {CanvasRenderingContext2D} context
       * @returns {void}
       */
      #drawRaindrop(raindrop, context) {
         if (context.fillStyle !== raindrop.color) {
            context.fillStyle = raindrop.color
            context.shadowColor = raindrop.color
         }

         if (context.shadowBlur !== raindrop.glowIntensity) {
            context.shadowBlur = raindrop.glowIntensity
         }

         context.fillText(raindrop.character, raindrop.xCoord, raindrop.yCoord)
      }
   }

})()