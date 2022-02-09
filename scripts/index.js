(() => {
 
    const {
        SETTINGS,
        RainColumn,
        helpers: {
            getRandomNumber,
        }
    } = document.ScreenSavior

    function init() {
        const canvas = document.getElementById('canvas')
        const context = canvas.getContext('2d')
    
        resizeCanvas(context)
        configureCanvasFont(context)
        drawScreenSaver(context)
    }

    /**
     * @param {CanvasRenderingContext2D} context - The canvas context.
     */
    function configureCanvasFont(context) {
        context.font = `${SETTINGS.CHARACTERS.FONT_SIZE}px monospace`
        context.textAlign = 'start'
        context.textBaseline = 'top'
    }

    /**
     * @param {CanvasRenderingContext2D} context - The canvas context.
     */
    function resizeCanvas(context) {
        const canvas = context.canvas
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
    }

    /**
     * @param {CanvasRenderingContext2D} context - The canvas context.
     */
    function drawScreenSaver(context) {
        const verticalGap = SETTINGS.CHARACTERS.VERTICAL_GAP
        const horizontalGap = SETTINGS.CHARACTERS.HORIZONTAL_GAP
        const paddingLeft = SETTINGS.RAIN.PADDING_LEFT

        const columnCount = Math.floor(canvas.width / 30)

        // Initialize the rain columns
        for (let i = 0; i < columnCount; i++) {
            const rainColumn = new RainColumn({
                startingXCoord: i * horizontalGap + paddingLeft,
                maxYCoord: canvas.height,
                verticalGap: verticalGap,
            })

            initializeRainColumn({
                rainColumn: rainColumn,
                context: context,
            })
        }
    }

    /**
     * After a timeout, start the rain column and update it periodically 
     * @param {RainColumn} rainColumn 
     * @param {CanvasRenderingContext2D} context 
     */
    function initializeRainColumn({ rainColumn, context }) {
        const randomTimeout = getRandomNumber(SETTINGS.RAIN.RANDOMIZE_START)
        
        setTimeout(() => {
            setInterval(
                    () => rainColumn.update(context),
                    SETTINGS.REFRESH_TIME
                )
            },
            randomTimeout,
        )
    }

    init()

})();