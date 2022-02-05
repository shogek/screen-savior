(() => {
 
    const CHARACTERS = {
        /** https://en.wikipedia.org/wiki/Half-width_kana */
        'KATAKANA': [
            "ｦ", "ｧ", "ｨ", "ｩ", "ｪ", "ｫ", "ｬ", "ｭ", "ｮ", "ｯ", "ｱ", "ｲ", "ｳ", "ｴ",
            "ｵ", "ｶ", "ｷ", "ｸ", "ｹ", "ｺ", "ｻ", "ｼ", "ｽ", "ｾ", "ｿ", "ﾀ", "ﾁ", "ﾂ",
            "ﾃ", "ﾄ", "ﾅ", "ﾆ", "ﾇ", "ﾈ", "ﾉ", "ﾊ", "ﾋ", "ﾌ", "ﾍ", "ﾎ", "ﾏ", "ﾐ",
            "ﾑ", "ﾒ", "ﾓ", "ﾔ", "ﾕ", "ﾖ", "ﾗ", "ﾘ", "ﾙ", "ﾚ", "ﾛ", "ﾜ", "ﾝ"
        ],
        'LATIN': [
            "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D",
            "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"
        ],
        'DIGITS': ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    }

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
        context.fillText('ｦ', 30, 40)

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