/**
 * ! IMPORTANT !
 * This is the entrypoint of the application!
 * If renaming this file - also rename it in index.html!
 */

import { SETTINGS } from './_settings.js'
import { RainColumn } from './RainColumn.js'
import { getRandomNumber } from './helpers.js'

function startApplication() {
   const canvas = document.getElementById('canvas') as HTMLCanvasElement
   const context = canvas.getContext('2d', { alpha: false })!

   resizeCanvasToFitScreen(context)
   configureCanvasFont(context)
   configureCanvasColors(context)
   initializeRainColumns(context)
}

function resizeCanvasToFitScreen(context: CanvasRenderingContext2D) {
   context.canvas.width = window.innerWidth
   context.canvas.height = window.innerHeight
}

function configureCanvasFont(context: CanvasRenderingContext2D) {
   context.font = `${SETTINGS.CHARACTERS.FONT_SIZE}px monospace`
   context.textAlign = 'start'
   context.textBaseline = 'top'
}

function configureCanvasColors(context: CanvasRenderingContext2D) {
   context.canvas.style.backgroundColor = SETTINGS.COLORS.DEAD
}

function initializeRainColumns(context: CanvasRenderingContext2D) {
   const verticalGap = SETTINGS.CHARACTERS.VERTICAL_GAP
   const horizontalGap = SETTINGS.CHARACTERS.HORIZONTAL_GAP
   const paddingLeft = SETTINGS.RAIN.PADDING_LEFT
   const paddingTop = SETTINGS.RAIN.PADDING_TOP

   const columnCount = Math.floor(context.canvas.width / 30)

   // Initialize the rain columns
   for (let i = 0; i < columnCount; i++) {
      const rainColumn = new RainColumn()
      rainColumn.init(
         i * horizontalGap + paddingLeft,
         paddingTop,
         context.canvas.height,
         SETTINGS.CHARACTERS.FONT_SIZE,
         verticalGap,
      )

      startRainColumn(rainColumn, context)
   }
}

/**
 * After a timeout, start the rain column and update it periodically
 */
function startRainColumn(rainColumn: RainColumn, context: CanvasRenderingContext2D) {
   const randomStartTime = getRandomNumber(SETTINGS.RAIN.RANDOMIZE_START)
   const randomRefreshTime = getRandomNumber(SETTINGS.RANDOMIZE_REFRESH_TIME) + 50

   setTimeout(() => {
      const draw = () => {
         rainColumn.draw(context)
         setTimeout(() => requestAnimationFrame(draw), randomRefreshTime)
      }

      requestAnimationFrame(draw)
   }, randomStartTime)
}

startApplication()
