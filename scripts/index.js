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
      const context = canvas.getContext('2d', { alpha: false })
      
      resizeCanvasToFitScreen(context)
      configureCanvasFont(context)
      configureCanvasColors(context)
      initializeRainColumns(context)
   }
   
   function resizeCanvasToFitScreen(context) {
      context.canvas.width = window.innerWidth
      context.canvas.height = window.innerHeight
   }
   
   function configureCanvasFont(context) {
      context.font = `${SETTINGS.CHARACTERS.FONT_SIZE}px monospace`
      context.textAlign = 'start'
      context.textBaseline = 'top'
   }
   
   function configureCanvasColors(context) {
      context.canvas.style.backgroundColor = SETTINGS.COLORS.DEAD
   }
   
   function configureCanvasFont(context) {
      context.font = `${SETTINGS.CHARACTERS.FONT_SIZE}px monospace`
      context.textAlign = 'start'
      context.textBaseline = 'top'
   }
   
   function initializeRainColumns(context) {
      const verticalGap = SETTINGS.CHARACTERS.VERTICAL_GAP
      const horizontalGap = SETTINGS.CHARACTERS.HORIZONTAL_GAP
      const paddingLeft = SETTINGS.RAIN.PADDING_LEFT
      const paddingTop = SETTINGS.RAIN.PADDING_TOP
      
      const columnCount = Math.floor(context.canvas.width / 30)
      
      // Initialize the rain columns
      for (let i = 0; i < columnCount; i++) {
         const rainColumn = new RainColumn()
         rainColumn.init({
            startingXCoord: i * horizontalGap + paddingLeft,
            startingYCoord: paddingTop,
            maxYCoord: context.canvas.height,
            characterHeight: SETTINGS.CHARACTERS.FONT_SIZE,
            characterGap: verticalGap,
         })
         
         startRainColumn({ rainColumn, context })
      }
   }
   
   /**
    * After a timeout, start the rain column and update it periodically 
    * @param {RainColumn} rainColumn 
    * @param {CanvasRenderingContext2D} context 
    */
   function startRainColumn({ rainColumn, context }) {
      const randomStartTime = getRandomNumber(SETTINGS.RAIN.RANDOMIZE_START)
      const randomRefreshTime = getRandomNumber(SETTINGS.RANDOMIZE_REFRESH_TIME) + 50
      
      setTimeout(
         () => {
            const draw = () => {
               rainColumn.draw(context)
            
               setTimeout(
                  () => requestAnimationFrame(draw),
                  randomRefreshTime
               )
            }
   
            requestAnimationFrame(draw)
         },
         randomStartTime
      )
   }

   init()

})()