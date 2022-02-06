document.ScreenSavior.RaindropColumn = (() => {

    const {
        CHARACTERS,
        COLORS,
        helpers: {
            assert,
            getRandomNumber,
        }
    } = document.ScreenSavior

    return class RaindropColumn {
        #xCoord = NaN

        constructor(xCoord) {
            assert(xCoord, 'number', true)

            this.#xCoord = xCoord
        }

        draw(canvas) {
            const context = canvas.getContext('2d')
            const characterCount = CHARACTERS.length
            const x = this.#xCoord
            let y = 0
            const verticalGap = 30
            const horizontalGap = 30

            const intervalId = setInterval(() => {
                if (y >= canvas.height) {
                    clearInterval(intervalId)
                    return
                }
    
                const number = getRandomNumber(characterCount);
                const character = CHARACTERS[number]
    
                console.log(number)
    
                context.fillStyle = COLORS.LIGHTEST
                context.fillText(character, x, y)
    
                y += verticalGap
            }, 100)
        }
    }

})()