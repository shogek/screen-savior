document.ScreenSavior.Raindrop = (() => {

    const {
        RAINDROP_STATES,
        helpers: {
            assert
        },
    } = document.ScreenSavior

    /** Represents a single character in the matrix rain. */
    return class Raindrop {
        #character = ''
        #color = ''
        #glowIntensity = NaN
        #state = RAINDROP_STATES.INITIAl
        #xCoord = NaN
        #yCoord = NaN
        #lifetime = NaN

        /**
         * @param {string} character - The text character that it represents on the screen, ex.: 'A'.
         * @param {string} color - The color of the text character as it will be shown on the screen, ex.: '#FFFFFF'. 
         * @param {number} glowIntensity - The intensity of the character's glow.
         * @param {number} xCoord - The X axis coordinate where it should be drawn.
         * @param {number} yCoord - The Y axis coordinate where it should be drawn.
         * @param {RAINDROP_STATES} raindropState - The state of the raindrop.
         * @param {number} lifetime - The lifetime in loops before it can start fading out.
         */
        constructor({ character, color, glowIntensity, xCoord, yCoord, state, lifetime }) {
            assert({ value: character, type: 'string', isRequired: true })
            assert({ value: color, type: 'string', isRequired: true })
            assert({ value: glowIntensity, type: 'number', isRequired: true })
            assert({ value: xCoord, type: 'number', isRequired: true })
            assert({ value: yCoord, type: 'number', isRequired: true })
            assert({ value: state, type: 'string', isRequired: true })
            assert({ value: lifetime, type: 'number', isRequired: true })

            this.#character = character
            this.#color = color
            this.#glowIntensity = glowIntensity
            this.#xCoord = xCoord
            this.#yCoord = yCoord
            this.#state = state
            this.#lifetime = lifetime
        }

        get character() { return this.#character }
        setCharacter(character) { this.#character = character }

        get color() { return this.#color }
        setColor(color) { this.#color = color }

        get glowIntensity() { return this.#glowIntensity }
        setGlowIntensity(glowIntensity) { this.#glowIntensity = glowIntensity }

        get xCoord() { return this.#xCoord }

        get yCoord() { return this.#yCoord }
        setYCoord(yCoord) { this.#yCoord = yCoord }

        get state() { return this.#state }
        setState(raindropState) { this.#state = raindropState }

        get lifetime() { return this.#lifetime }

        decreaseLifetime() {
            this.#lifetime -= 1
        }
    }

})()