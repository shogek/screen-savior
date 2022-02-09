document.ScreenSavior.RaindropSnake = (() => {

  const {
    COLORS,
    CHARACTERS,
    SETTINGS,
    RAINDROP_STATES,
    Raindrop,
    helpers: {
      assert,
      getRandomNumber,
    }
  } = document.ScreenSavior

  /** I repesent a single vertical column in the matrix rain. */
  return class RaindropSnake {
    #startingXCoord = NaN
    #currentYCoord = NaN
    #maxYCoord = NaN
    #verticalGap = NaN
    #raindrops = []

    /**
      * @param {number} startingXCoord - The X axis coordinate from which the snake will crawl. 
      * @param {number} maxYCoord - The Y axis coordinate which marks the end of the screen.
      * @param {number} verticalGap - The gap between characters drawn on screen.
      */
    constructor({ startingXCoord, maxYCoord, verticalGap }) {
      assert({ value: startingXCoord, type: 'number', isRequired: true })
      assert({ value: maxYCoord, type: 'number', isRequired: true })
      assert({ value: verticalGap, type: 'number', isRequired: true })

      this.#startingXCoord = startingXCoord
      this.#currentYCoord = 0
      this.#maxYCoord = maxYCoord
      this.#verticalGap = verticalGap
    }

    /**
     * Crawl the snake lower.
     * @param {CanvasRenderingContext2D} context Canvas context
     * @returns void
     */
    update(context) {
      for (let i = this.#raindrops.length - 1; i >= 0; i--) {
        const raindrop = this.#raindrops[i]

        if (raindrop.state === RAINDROP_STATES.LIVING) {
          raindrop.decreaseLifetime()
        }

        if (raindrop.state === RAINDROP_STATES.DEAD) {
          continue
        }

        this.#clearRaindrop(raindrop, context)
        this.#updateRaindropColorAndState(raindrop)
        this.#tryRandomizeCharacter(raindrop)
        this.#redrawRaindrop(raindrop, context)
      }

      if (this.#currentYCoord >= this.#maxYCoord) {
        this.#currentYCoord = 0
        this.#raindrops = this.#raindrops.filter(x => x.state !== RAINDROP_STATES.DEAD)
        return
      }

      const randomCharacter = CHARACTERS[getRandomNumber(CHARACTERS.length)]

      const newRaindrop = new Raindrop({
        character: randomCharacter,
        color: COLORS.LIGHTER5,
        glowIntensity: SETTINGS.CHARACTERS.GLOW_INTENSITY,
        xCoord: this.#startingXCoord,
        yCoord: this.#currentYCoord,
        state: RAINDROP_STATES.APPEARING,
        lifetime: SETTINGS.CHARACTERS.LIFETIME,
      })

      this.#currentYCoord += SETTINGS.CHARACTERS.FONT_SIZE + this.#verticalGap

      this.#raindrops.push(newRaindrop)
      this.#redrawRaindrop(newRaindrop, context)
    }

    #updateRaindropColorAndState(raindrop) {
      const [updatedColor, updatedState] = this.#getUpdatedRaindropColorAndState(raindrop)
      raindrop.setColor(updatedColor)
      raindrop.setState(updatedState)

      if (updatedState !== RAINDROP_STATES.APPEARING) {
        raindrop.setGlowIntensity(0)
      }
    }

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

    #clearRaindrop(raindrop, context) {
      context.shadowColor = COLORS.DARKER5
      context.shadowBlur = 0

      context.fillStyle = COLORS.DARKER5

      const fontSize = SETTINGS.CHARACTERS.FONT_SIZE
      const glowIntensity = SETTINGS.CHARACTERS.GLOW_INTENSITY
      context.fillRect(
        raindrop.xCoord - glowIntensity * 3,
        raindrop.yCoord - glowIntensity * 3,
        fontSize + glowIntensity * 3,
        fontSize + glowIntensity * 3,
      )
    }

    #redrawRaindrop(raindrop, context) {
      context.shadowColor = raindrop.color
      context.shadowBlur = raindrop.glowIntensity
      context.fillStyle = raindrop.color
      context.fillText(raindrop.character, raindrop.xCoord, raindrop.yCoord)
    }

    // TODO: Come up with a better name
    #getUpdatedRaindropColorAndState(raindrop) {
      switch (raindrop.color) {
        case COLORS.LIGHTER5: return [COLORS.LIGHTER4, RAINDROP_STATES.APPEARING]
        case COLORS.LIGHTER4: return [COLORS.LIGHTER3, RAINDROP_STATES.APPEARING]
        case COLORS.LIGHTER3: return [COLORS.LIGHTER2, RAINDROP_STATES.APPEARING]
        case COLORS.LIGHTER2: return [COLORS.LIGHTER1, RAINDROP_STATES.APPEARING]
        case COLORS.LIGHTER1: return [COLORS.PURE, RAINDROP_STATES.LIVING]

        case COLORS.PURE:
          return raindrop.lifetime > 0
            ? [COLORS.PURE, RAINDROP_STATES.LIVING]
            : [COLORS.DARKER1, RAINDROP_STATES.DISAPPEARING]

        case COLORS.DARKER1: return [COLORS.DARKER2, RAINDROP_STATES.DISAPPEARING]
        case COLORS.DARKER2: return [COLORS.DARKER3, RAINDROP_STATES.DISAPPEARING]
        case COLORS.DARKER3: return [COLORS.DARKER4, RAINDROP_STATES.DISAPPEARING]
        case COLORS.DARKER4: return [COLORS.DARKER5, RAINDROP_STATES.DISAPPEARING]
        case COLORS.DARKER5: return [COLORS.DARKER5, RAINDROP_STATES.DEAD]

        default:
          debugger
          throw new Error(`Unsupported value for COLORS: ${raindropColor}!`)
      }
    }
  }

})()