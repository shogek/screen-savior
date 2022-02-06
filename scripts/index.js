(() => {
 
    const {
        CHARACTERS,
        COLORS,
    } = document.ScreenSavior

    function init() {
        const canvas = document.getElementById('canvas')
    
        resizeCanvas(canvas)
        drawScreenSaver(canvas)
        
        window.addEventListener('resize', () => {
            resizeCanvas(canvas)
            drawScreenSaver(canvas)
        })
    }

    function resizeCanvas(canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
    }

    function getRandomNumber(max) {
        return Math.floor(Math.random() * max);
    }

    function drawScreenSaver(canvas) {
        const context = canvas.getContext('2d');
        context.font = '30px monospace'
        context.textAlign = 'start'
        context.textBaseline = 'top'

        context.fillStyle = COLORS.PURE
        context.fillText('0', 0, 0)

        context.fillStyle = COLORS.PURE
        context.fillText('A', 0, 30)

        context.fillStyle = COLORS.PURE
        context.fillText('B', 0, 60)

        context.fillStyle = COLORS.PURE
        context.fillText('C', 0, 90)

        context.fillStyle = COLORS.PURE
        context.fillText('D', 0, 120)

        context.fillStyle = COLORS.DARKER
        context.fillText('F', 0, 150)

        context.fillStyle = COLORS.DARK
        context.fillText('G', 0, 180)

        context.fillStyle = COLORS.MEDIUM
        context.fillText('H', 0, 210)

        context.fillStyle = COLORS.LIGHTER
        context.fillText('J', 0, 240)

        context.fillStyle = COLORS.LIGHTEST
        context.fillText('K', 0, 270)

        const characterCount = CHARACTERS.length

        const x = 30
        let y = 0
        const verticalGap = 30

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

    init()

})();