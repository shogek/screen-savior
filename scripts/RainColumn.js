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
    #startingXCoord = NaN
    #maxYCoord = NaN
    #verticalGap = NaN

    #raindropsToUpdate = 1
    #raindrops = []

    init({ startingXCoord, startingYCoord, maxYCoord, characterHeight, characterGap }) {
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

    updateNew(context) {
      const toInitializeCount = this.#raindropsToUpdate > this.#raindrops.length
        ? this.#raindrops.length
        : this.#raindropsToUpdate

      for (let i = 0; i < toInitializeCount; i++) {
        const raindrop = this.#raindrops[i]        
        if (raindrop === undefined) {
          debugger
        }
        this.#clearRaindrop(raindrop, context)
        this.#updateRaindrop(raindrop)
        this.#tryRandomizeCharacter(raindrop)
        this.#drawRaindrop(raindrop, context)
      }

      this.#raindropsToUpdate++
    }

    #updateRaindrop(raindrop) {
      if (raindrop.state === RAINDROP_STATES.INITIAL) {
        raindrop.setState(RAINDROP_STATES.APPEARING)
        raindrop.setColor(COLORS.NEW)
        raindrop.setGlowIntensity(SETTINGS.CHARACTERS.GLOW_INTENSITY)
        return
      }

      if (raindrop.state === RAINDROP_STATES.APPEARING) {
        if (raindrop.color === COLORS.TO_NEW_1) {
          raindrop.setState(RAINDROP_STATES.LIVING)
          raindrop.setColor(COLORS.LIVING)
          raindrop.setGlowIntensity(0)
        }

        if (raindrop.color === COLORS.TO_NEW_2) {
          raindrop.setColor(COLORS.TO_NEW_1)
        }

        if (raindrop.color === COLORS.TO_NEW_3) {
          raindrop.setColor(COLORS.TO_NEW_2)
        }

        if (raindrop.color === COLORS.TO_NEW_4) {
          raindrop.setColor(COLORS.TO_NEW_3)
        }

        if (raindrop.color === COLORS.NEW) {
          raindrop.setColor(COLORS.TO_NEW_4)
        }

        return
      }

      if (raindrop.state === RAINDROP_STATES.LIVING) {
        if (raindrop.timeAlive >= SETTINGS.CHARACTERS.TIME_ALIVE) {
          raindrop.setState(RAINDROP_STATES.DISAPPEARING)
          raindrop.setColor(COLORS.TO_DEAD_1)
          raindrop.setGlowIntensity(0)
          raindrop.setTimeAlive(0)
        } else {
          raindrop.setTimeAlive(raindrop.timeAlive + 1)
        }

        return
      }

      if (raindrop.state === RAINDROP_STATES.DISAPPEARING) {
        if (raindrop.color === COLORS.TO_DEAD_1) {
          raindrop.setColor(COLORS.TO_DEAD_2)
        }

        if (raindrop.color === COLORS.TO_DEAD_2) {
          raindrop.setColor(COLORS.TO_DEAD_3)
        }

        if (raindrop.color === COLORS.TO_DEAD_3) {
          raindrop.setColor(COLORS.TO_DEAD_4)
        }

        if (raindrop.color === COLORS.TO_DEAD_4) {
          raindrop.setState(RAINDROP_STATES.DEAD)
          raindrop.setColor(COLORS.DEAD)
          raindrop.setGlowIntensity(0)
        }
        
        return
      }

      if (raindrop.state === RAINDROP_STATES.DEAD) {
        if (raindrop.timeDead >= SETTINGS.CHARACTERS.TIME_DEAD) {
          raindrop.setTimeDead(0)
          raindrop.setState(RAINDROP_STATES.APPEARING)
          raindrop.setColor(COLORS.NEW)
          raindrop.setGlowIntensity(SETTINGS.CHARACTERS.GLOW_INTENSITY)
        } else {
          raindrop.setTimeDead(raindrop.timeDead + 1)
        }
      }
    }

    /**
     * Crawl the snake lower.
     * @param {CanvasRenderingContext2D} context Canvas context
     * @returns {void}
     */
    update(context) {
      for (let i = this.#raindrops.length - 1; i >= 0; i--) {
        const raindrop = this.#raindrops[i]        

        this.#updateRaindropLifetime(raindrop)
        this.#clearRaindrop(raindrop, context)
        this.#updateRaindropColorAndState(raindrop)
        this.#tryRandomizeCharacter(raindrop)
        this.#drawRaindrop(raindrop, context)
      }

      const latestRaindrop = this.#raindrops.length > 0
        ? this.#raindrops[this.#raindrops.length - 1]
        : null

      const yCoordForNextRaindrop = latestRaindrop === null
        ? SETTINGS.RAIN.PADDING_TOP
        : latestRaindrop.yCoord + SETTINGS.CHARACTERS.FONT_SIZE + this.#verticalGap

      if (yCoordForNextRaindrop >= this.#maxYCoord) {
        this.#raindrops = this.#raindrops.filter(x => x.state !== RAINDROP_STATES.DEAD)
        return
      }

      const newRaindrop = new Raindrop({
        character: CHARACTERS[getRandomNumber(CHARACTERS.length)],
        color: COLORS.NEW,
        glowIntensity: SETTINGS.CHARACTERS.GLOW_INTENSITY,
        xCoord: this.#startingXCoord,
        yCoord: yCoordForNextRaindrop,
        state: RAINDROP_STATES.APPEARING,
        lifetime: SETTINGS.CHARACTERS.LIFETIME,
      })

      this.#raindrops.push(newRaindrop)
      this.#drawRaindrop(newRaindrop, context)
    }

    /**
     * @param {Raindrop} raindrop
     * @returns {void} 
     */
    #updateRaindropLifetime(raindrop) {
      if (raindrop.state === RAINDROP_STATES.LIVING) {
        raindrop.decreaseLifetime()
      }
    }

    /**
     * @param {Raindrop} raindrop
     * @returns {void} 
     */
    #updateRaindropColorAndState(raindrop) {
      const [updatedColor, updatedState] = this.#getUpdatedRaindropColorAndState(raindrop)
      raindrop.setColor(updatedColor)
      raindrop.setState(updatedState)

      if (updatedState !== RAINDROP_STATES.APPEARING) {
        raindrop.setGlowIntensity(0)
      }
    }

    /**
     * Change the raindrops displayed character if its lucky.
     * @param {Raindrop} raindrop 
     * @returns {void}
     */
    #tryRandomizeCharacter(raindrop) {
      if (raindrop.state === RAINDROP_STATES.APPEARING) {
        return
      }

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
      context.shadowColor = raindrop.color
      context.shadowBlur = raindrop.glowIntensity
      context.fillStyle = raindrop.color
      context.fillText(raindrop.character, raindrop.xCoord, raindrop.yCoord)
    }

    /**
     * TODO: Come up with a better name
     * @param {Raindrop} raindrop 
     * @returns {[COLORS, RAINDROP_STATES]}
     */
    #getUpdatedRaindropColorAndState(raindrop) {
      const {
        DEAD,
      
        TO_DEAD_4,
        TO_DEAD_3,
        TO_DEAD_2,
        TO_DEAD_1,

        LIVING,

        TO_NEW_1,
        TO_NEW_2,
        TO_NEW_3,
        TO_NEW_4,

        NEW,
      } = COLORS

      switch (raindrop.color) {
        case NEW:      return [TO_NEW_4, RAINDROP_STATES.APPEARING]
        case TO_NEW_4: return [TO_NEW_3, RAINDROP_STATES.APPEARING]
        case TO_NEW_3: return [TO_NEW_2, RAINDROP_STATES.APPEARING]
        case TO_NEW_2: return [TO_NEW_1, RAINDROP_STATES.APPEARING]
        case TO_NEW_1: return [LIVING,   RAINDROP_STATES.LIVING]

        case LIVING:
          return raindrop.lifetime > 0
            ? [LIVING, RAINDROP_STATES.LIVING]
            : [TO_DEAD_1, RAINDROP_STATES.DISAPPEARING]

        case TO_DEAD_1: return [TO_DEAD_2, RAINDROP_STATES.DISAPPEARING]
        case TO_DEAD_2: return [TO_DEAD_3, RAINDROP_STATES.DISAPPEARING]
        case TO_DEAD_3: return [TO_DEAD_4, RAINDROP_STATES.DISAPPEARING]
        case TO_DEAD_4: return [DEAD,      RAINDROP_STATES.DISAPPEARING]
        case DEAD:      return [DEAD,      RAINDROP_STATES.DEAD]

        default:
          debugger
          throw new Error(`Unsupported value for COLORS: ${raindropColor}!`)
      }
    }
  }

})()