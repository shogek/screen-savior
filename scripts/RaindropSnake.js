document.ScreenSavior.RaindropSnake = (() => {

  const {
    COLORS,
    CHARACTERS,
    Raindrop,
    helpers: {
      assert,
      getRandomNumber,
    }
  } = document.ScreenSavior

  /** I repesent a single vertical column in the matrix rain. */
  return class RaindropSnake {
    #startingXCoord = NaN
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

        this.#updateRaindropColor(raindrop)
        this.#clearRaindrop(raindrop, context)
        this.#updateCharacter(raindrop)
        this.#redrawRaindrop(raindrop, context)
      }

      // TODO: Fix the snake going beyond the visible screen
      const randomCharacter = CHARACTERS[getRandomNumber(CHARACTERS.length)]
      const yCoords = this.#raindrops.length * this.#verticalGap

      const newRaindrop = new Raindrop({
        character: randomCharacter,
        color: COLORS.LIGHTER5,
        xCoord: this.#startingXCoord,
        yCoord: yCoords,
        // TODO: Get this value from configuration
        lifetime: 10,
      })

      this.#raindrops.push(newRaindrop)
      this.#redrawRaindrop(newRaindrop, context)
    }

    #updateRaindropColor(raindrop) {
      const updatedColor = this.#getUpdatedRaindropColor(raindrop)
      raindrop.setColor(updatedColor)
    }

    #updateCharacter(raindrop) {
      const isTrue =
        raindrop.color === COLORS.LIGHTER5
        || raindrop.color === COLORS.LIGHTER4
        || raindrop.color === COLORS.LIGHTER3
      if (isTrue) {
        return
      }

      const randomNumber = getRandomNumber(100)
      // TODO: Move hardcoded value to config
      if (randomNumber < 95) {
        return
      }

      const randomCharacter = CHARACTERS[getRandomNumber(CHARACTERS.length)]
      raindrop.setCharacter(randomCharacter)
    }

    #clearRaindrop(raindrop, context) {
        context.shadowColor = COLORS.DARKER5; // string
        // Horizontal distance of the shadow, in relation to the text.
        context.shadowOffsetX = 0; // integer
        // Vertical distance of the shadow, in relation to the text.
        context.shadowOffsetY = 0; // integer
        // Blurring effect to the shadow, the larger the value, the greater the blur.
        context.shadowBlur = 5; // integer

      // TODO: Remove these hardcoded values
      context.fillStyle = COLORS.DARKER5
      context.fillRect(raindrop.xCoord, raindrop.yCoord, 30, 30)
    }

    #redrawRaindrop(raindrop, context) {
      const isTrue =
        raindrop.color === COLORS.LIGHTER5
        || raindrop.color === COLORS.LIGHTER4
        || raindrop.color === COLORS.LIGHTER3
      
      if (isTrue) {
        // Color of the shadow;  RGB, RGBA, HSL, HEX, and other inputs are valid.
        context.shadowColor = raindrop.color; // string
        // Horizontal distance of the shadow, in relation to the text.
        context.shadowOffsetX = 0; // integer
        // Vertical distance of the shadow, in relation to the text.
        context.shadowOffsetY = 0; // integer
        // Blurring effect to the shadow, the larger the value, the greater the blur.
        context.shadowBlur = 5; // integer
      }

      context.fillStyle = raindrop.color
      context.fillText(raindrop.character, raindrop.xCoord, raindrop.yCoord)

      if (isTrue) {
        context.shadowColor = "black"
        context.shadowBlur = 0; // integer
      }
    }

    #getUpdatedRaindropColor(raindrop) {
      switch (raindrop.color) {
        case COLORS.LIGHTER5: return COLORS.LIGHTER4
        case COLORS.LIGHTER4: return COLORS.LIGHTER3
        case COLORS.LIGHTER3: return COLORS.LIGHTER2
        case COLORS.LIGHTER2: return COLORS.LIGHTER1
        case COLORS.LIGHTER1: return COLORS.PURE

        case COLORS.PURE:
          if (raindrop.lifetime < 1) {
            return COLORS.DARKER1
          }

          raindrop.decreaseLifetime()
          return COLORS.PURE

        case COLORS.DARKER1: return COLORS.DARKER2
        case COLORS.DARKER2: return COLORS.DARKER3
        case COLORS.DARKER3: return COLORS.DARKER4
        case COLORS.DARKER4: return COLORS.DARKER5
        case COLORS.DARKER5: return COLORS.DARKER5

        default:
          debugger
          throw new Error(`Unsupported value for COLORS: ${raindropColor}!`)
      }
    }
  }

})()