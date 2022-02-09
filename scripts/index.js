(() => {
 
    const {
        RaindropSnake,
        SETTINGS,
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
        context.font = `${SETTINGS.CHARACTERS.FONT_SIZE}px monospace`
        context.textAlign = 'start'
        context.textBaseline = 'top'

        const horizontalGap = SETTINGS.CHARACTERS.HORIZONTAL_GAP

        const canvasWidth = canvas.width
        const columnCount = Math.floor(canvasWidth / 30)

        const raindropSnakes = []

        for (let i = 0; i < columnCount; i++) {
            const raindropSnake = new RaindropSnake({
                startingXCoord: i * horizontalGap,
                maxYCoord: canvas.height,
                verticalGap: SETTINGS.CHARACTERS.VERTICAL_GAP,
            })
            raindropSnakes.push(raindropSnake)
        }

        for (let i = 0; i < raindropSnakes.length; i++) {
            const randomTimeout = getRandomNumber(4000)
            setTimeout(
                (i) => {
                    setInterval(
                        () => {
                            const raindropSnake = raindropSnakes[i]
                            raindropSnake.update(context)
                        },
                        100
                    )
                    
                },
                randomTimeout,
                i
            )
        }
    }

    init()

})();