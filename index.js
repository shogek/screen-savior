(() => {
 
    /* https://cssgradient.io/ */
    const COLOR_GREEN = {
        /** Pure white */
        'LIGHTEST': '#ffffff',
        'LIGHTER':  '#bad6ba',
        'MEDIUM':   '#7cb07c',
        'DARK':     '#4d934d',
        'DARKER':   '#197319',
        /** Matrix green */
        'DARKEST':  '#006300',
    }

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

    function drawScreenSaver(canvas) {
        const context = canvas.getContext('2d');
        context.font = '50px monospace'

        context.fillStyle = COLOR_GREEN.DARKEST
        context.fillText('A', 30, 40)

        context.fillStyle = COLOR_GREEN.DARKEST
        context.fillText('B', 30, 80)

        context.fillStyle = COLOR_GREEN.DARKEST
        context.fillText('C', 30, 120)

        context.fillStyle = COLOR_GREEN.DARKEST
        context.fillText('D', 30, 160)

        context.fillStyle = COLOR_GREEN.DARKER
        context.fillText('F', 30, 200)

        context.fillStyle = COLOR_GREEN.DARK
        context.fillText('G', 30, 240)

        context.fillStyle = COLOR_GREEN.MEDIUM
        context.fillText('H', 30, 280)

        context.fillStyle = COLOR_GREEN.LIGHTER
        context.fillText('J', 30, 320)

        context.fillStyle = COLOR_GREEN.LIGHTEST
        context.fillText('K', 30, 360)
    }

    init()

})();