(() => {
 
    const CHARACTERS = {
        /** https://en.wikipedia.org/wiki/Half-width_kana */
        'KATAKANA': [
            'ｦ', 'ｧ', 'ｨ', 'ｩ', 'ｪ', 'ｫ', 'ｬ', 'ｭ', 'ｮ', 'ｯ', 'ｱ', 'ｲ', 'ｳ', 'ｴ',
            'ｵ', 'ｶ', 'ｷ', 'ｸ', 'ｹ', 'ｺ', 'ｻ', 'ｼ', 'ｽ', 'ｾ', 'ｿ', 'ﾀ', 'ﾁ', 'ﾂ',
            'ﾃ', 'ﾄ', 'ﾅ', 'ﾆ', 'ﾇ', 'ﾈ', 'ﾉ', 'ﾊ', 'ﾋ', 'ﾌ', 'ﾍ', 'ﾎ', 'ﾏ', 'ﾐ',
            'ﾑ', 'ﾒ', 'ﾓ', 'ﾔ', 'ﾕ', 'ﾖ', 'ﾗ', 'ﾘ', 'ﾙ', 'ﾚ', 'ﾛ', 'ﾜ', 'ﾝ'
        ],
        'LATIN': [
            'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D',
            'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'
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

    function getRandomNumber(max) {
        return Math.floor(Math.random() * max);
    }

    function drawScreenSaver(canvas) {
        const context = canvas.getContext('2d');
        context.font = '30px monospace'
        context.textAlign = 'start'
        context.textBaseline = 'top'

        context.fillStyle = COLOR_GREEN.DARKEST
        context.fillText('0', 0, 0)

        context.fillStyle = COLOR_GREEN.DARKEST
        context.fillText('A', 0, 30)

        context.fillStyle = COLOR_GREEN.DARKEST
        context.fillText('B', 0, 60)

        context.fillStyle = COLOR_GREEN.DARKEST
        context.fillText('C', 0, 90)

        context.fillStyle = COLOR_GREEN.DARKEST
        context.fillText('D', 0, 120)

        context.fillStyle = COLOR_GREEN.DARKER
        context.fillText('F', 0, 150)

        context.fillStyle = COLOR_GREEN.DARK
        context.fillText('G', 0, 180)

        context.fillStyle = COLOR_GREEN.MEDIUM
        context.fillText('H', 0, 210)

        context.fillStyle = COLOR_GREEN.LIGHTER
        context.fillText('J', 0, 240)

        context.fillStyle = COLOR_GREEN.LIGHTEST
        context.fillText('K', 0, 270)

        const characters = [
            ...CHARACTERS.KATAKANA,
            ...CHARACTERS.DIGITS,
            ...CHARACTERS.LATIN,
        ]
        const characterCount = characters.length

        const x = 30
        let y = 0
        const verticalGap = 30

        const intervalId = setInterval(() => {
            if (y >= canvas.height) {
                clearInterval(intervalId)
                return
            }

            const number = getRandomNumber(characterCount);
            const character = characters[number]

            console.log(number)

            context.fillStyle = COLOR_GREEN.LIGHTEST
            context.fillText(character, x, y)

            y += verticalGap
        }, 100)
    }

    init()

})();