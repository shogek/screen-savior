document.ScreenSavior.Raindrop = (() => {

    const {
        assert
    } = document.ScreenSavior.helpers

    /** Represents a single character in the matrix rain. */
    return class Raindrop {
        #character = ''
        #color = ''
        #xCoord = NaN
        #yCoord = NaN
        #lifetime = NaN

        /**
         * @param {string} character - The text character that it represents on the screen, ex.: 'A'.
         * @param {string} color - The color of the text character as it will be shown on the screen, ex.: '#FFFFFF'. 
         * @param {number} xCoord - The X axis coordinate where it should be drawn.
         * @param {number} yCoord - The Y axis coordinate where it should be drawn.
         * @param {number} lifetime - The lifetime in loops before it can start fading out.
         */
        constructor({ character, color, xCoord, yCoord, lifetime }) {
            assert({ value: character, type: 'string', isRequired: true })
            assert({ value: color, type: 'string', isRequired: true })
            assert({ value: xCoord, type: 'number', isRequired: true })
            assert({ value: yCoord, type: 'number', isRequired: true })
            assert({ value: lifetime, type: 'number', isRequired: true })

            this.#character = character
            this.#color = color
            this.#xCoord = xCoord
            this.#yCoord = yCoord
            this.#lifetime = lifetime
        }

        get character() { return this.#character }
        setCharacter(character) { this.#character = character }

        get color() { return this.#color }
        setColor(color) { this.#color = color }

        get xCoord() { return this.#xCoord }

        get yCoord() { return this.#yCoord }
        setYCoord(yCoord) { this.#yCoord = yCoord }

        get lifetime() { return this.#lifetime }

        decreaseLifetime() {
            this.#lifetime -= 1
        }
    }

})()