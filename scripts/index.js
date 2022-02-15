(() => {

   const {
      SETTINGS,
      RainColumn,
      helpers: {
         getRandomNumber,
      }
   } = document.ScreenSavior

   function init() {
      const canvases = createCanvases()
      initializeNewRainColumns(canvases)
   }

   function createCanvases() {
      const canvases = []
      let currentLeftCoord = SETTINGS.RAIN.PADDING_LEFT
      let index = 0
      while (currentLeftCoord <= document.body.clientWidth) {
         const canvas = document.createElement('canvas')
         canvas.id = `canvas-${index}`
         canvas.style.position = 'absolute'
         canvas.width = SETTINGS.CHARACTERS.FONT_SIZE
         canvas.height = window.innerHeight
         canvas.style.top = `${SETTINGS.RAIN.PADDING_TOP}px`
         canvas.style.left = `${currentLeftCoord}px`

         const context = canvas.getContext('2d', { alpha: false })
         configureCanvasFont(context)
         configureCanvasColors(context)

         document.body.appendChild(canvas)
         canvases.push(canvas)

         index++
         currentLeftCoord += SETTINGS.CHARACTERS.FONT_SIZE + SETTINGS.CHARACTERS.HORIZONTAL_GAP
      }

      return canvases
   }

   function configureCanvasFont(context) {
      context.font = `${SETTINGS.CHARACTERS.FONT_SIZE}px monospace`
      context.textAlign = 'start'
      context.textBaseline = 'top'
   }

   function configureCanvasColors(context) {
      context.canvas.style.backgroundColor = SETTINGS.COLORS.DEAD
   }

   function initializeNewRainColumns(canvases) {
      const paddingTop = SETTINGS.RAIN.PADDING_TOP
      const verticalGap = SETTINGS.CHARACTERS.VERTICAL_GAP

      for (let i = 0; i < canvases.length; i++) {
         const canvas = canvases[i]
         const context = canvas.getContext('2d', { alpha: false })

         const rainColumn = new RainColumn()
         rainColumn.init({
            startingXCoord: 0,
            startingYCoord: 0,
            maxYCoord: canvas.height,
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