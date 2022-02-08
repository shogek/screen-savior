(() => {
 
    const {
        RaindropSnake,
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

        // TODO: Move values to config
        const x = 30
        let y = 0
        const verticalGap = 30
        const horizontalGap = 30

        const canvasWidth = canvas.width
        const characterWidth = 30
        const columnCount = Math.floor(canvasWidth / 30)

        const raindropSnakes = []

        for (let i = 0; i < columnCount; i++) {
            const raindropSnake = new RaindropSnake({
                startingXCoord: i * horizontalGap,
                maxYCoord: canvas.height,
                verticalGap: 30,
            })
            raindropSnakes.push(raindropSnake)
        }

        for (let i = 0; i < raindropSnakes.length; i++) {
            const randomTimeout = getRandomNumber(5000)
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