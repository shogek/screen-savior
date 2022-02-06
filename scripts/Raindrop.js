document.ScreenSavior.Raindrop = (() => {

    const {
        assert
    } = document.ScreenSavior.helpers

    /** Represents a single character in the matrix rain. */
    return class Raindrop {
        #character = ''
        #xCoord = NaN
        #yCoord = NaN
        #lifetime = NaN

        /**
         * @param {string} character The text character that it represents on the screen, ex.: 'A'. 
         * @param {number} xCoord The X axis coordinate where it should be drawn.
         * @param {number} yCoord The Y axis coordinate where it should be drawn.
         * @param {number} lifetime The lifetime in loops before it can start fading out.
         */
        constructor(character, xCoord, yCoord, lifetime) {
            assert(character, 'string', true)
            assert(xCoord, 'number', true)
            assert(yCoord, 'number', true)
            assert(lifetime, 'number', true)

            this.#character = character
            this.#xCoord = xCoord
            this.#yCoord = yCoord
            this.#lifetime = lifetime
        }
    }

})()