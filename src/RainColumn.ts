import { SETTINGS } from './_settings.js'
import { COLORS } from './colors.js'
import { RAINDROP_STATES } from './RaindropStates.js'
import { getRandomCharacter, getRandomNumber } from './helpers.js'
import { Raindrop } from './Raindrop.js'

/** I repesent a single vertical column in the matrix rain. */
export class RainColumn {
   private _raindropsToUpdate = 1
   private _raindrops: Raindrop[] = []

   /**
    * Initialize all the raindrops and prepare them for drawing.
    * @param startingXCoord - The X axis coordinate from where the raindrops should be drawn.
    * @param startingYCoord - The Y axis coordinate from where the raindrops should be drawn.
    * @param maxYCoord - The height of the canvas.
    * @param characterHeight - Font size.
    * @param characterGap - Gap (in pixels) between one raindrop's bottom and the other ones top.
    */
   init(startingXCoord: number, startingYCoord: number, maxYCoord: number, characterHeight: number, characterGap: number) {
      for (let currentYCoord = startingYCoord; currentYCoord <= maxYCoord; currentYCoord += characterHeight + characterGap) {
         const raindrop = new Raindrop(
            getRandomCharacter(),
            COLORS.DEAD,
            0,
            startingXCoord,
            currentYCoord,
            RAINDROP_STATES.INITIAL,
         )
         this._raindrops.push(raindrop)
      }
   }

   /**
    * Draw the raindrops in the column.
    */
   draw(context: CanvasRenderingContext2D) {
      const toInitializeCount = this._raindropsToUpdate > this._raindrops.length ? this._raindrops.length : this._raindropsToUpdate

      for (let i = 0; i < toInitializeCount; i++) {
         const raindrop = this._raindrops[i]!

         const doesNeedRedraw = RainColumn.updateRaindrop(raindrop)
         if (!doesNeedRedraw) {
            continue
         }

         RainColumn.clearRaindrop(raindrop, context)
         RainColumn.tryRandomizeCharacter(raindrop)
         RainColumn.drawRaindrop(raindrop, context)
      }

      this._raindropsToUpdate++
   }

   /**
    * @returns `true` if the raindrop needs to be redrawn, else - `false`
    */
   private static updateRaindropWhenInitialState(raindrop: Raindrop): boolean {
      raindrop.setState(RAINDROP_STATES.FADING_IN)
      raindrop.setColor(COLORS.NEW)
      raindrop.setGlowIntensity(SETTINGS.CHARACTERS.GLOW_INTENSITY)
      return true
   }

   /**
    * @returns `true` if the raindrop needs to be redrawn, else - `false`
    */
   private static updateRaindropWhenFadingInState(raindrop: Raindrop): boolean {
      switch (raindrop.color) {
         case COLORS.NEW:
            raindrop.setColor(COLORS.TO_ALIVE_4)
            break

         case COLORS.TO_ALIVE_1:
            raindrop.setState(RAINDROP_STATES.ALIVE)
            raindrop.setColor(COLORS.ALIVE)
            raindrop.setGlowIntensity(0)
            break

         case COLORS.TO_ALIVE_2:
            raindrop.setColor(COLORS.TO_ALIVE_1)
            break

         case COLORS.TO_ALIVE_3:
            raindrop.setColor(COLORS.TO_ALIVE_2)
            break

         case COLORS.TO_ALIVE_4:
            raindrop.setColor(COLORS.TO_ALIVE_3)
            break

         default:
            throw new Error(`Raindrop in state (${raindrop.state}) has an unknown color (${raindrop.color})!`)
      }

      return true
   }

   /**
    * @returns `true` if the raindrop needs to be redrawn, else - `false`
    */
   private static updateRaindropWhenAliveState(raindrop: Raindrop): boolean {
      if (raindrop.timeAlive < SETTINGS.CHARACTERS.TIME_ALIVE) {
         raindrop.setTimeAlive(raindrop.timeAlive + 1)
         return false
      }

      raindrop.setState(RAINDROP_STATES.FADING_OUT)
      raindrop.setColor(COLORS.TO_DEAD_1)
      raindrop.setGlowIntensity(0)
      raindrop.setTimeAlive(0)
      return true
   }

   /**
    * @returns `true` if the raindrop needs to be redrawn, else - `false`
    */
   private static updateRaindropWhenFadingOutState(raindrop: Raindrop): boolean {
      switch (raindrop.color) {
         case COLORS.TO_DEAD_1:
            raindrop.setColor(COLORS.TO_DEAD_2)
            break

         case COLORS.TO_DEAD_2:
            raindrop.setColor(COLORS.TO_DEAD_3)
            break

         case COLORS.TO_DEAD_3:
            raindrop.setColor(COLORS.TO_DEAD_4)
            break

         case COLORS.TO_DEAD_4:
            raindrop.setState(RAINDROP_STATES.DEAD)
            raindrop.setColor(COLORS.DEAD)
            raindrop.setGlowIntensity(0)
            break

         default:
            throw new Error(`Raindrop in state (${raindrop.state}) has an unknown color (${raindrop.color})!`)
      }

      return true
   }

   /**
    * @returns `true` if the raindrop needs to be redrawn, else - `false`
    */
   private static updateRaindropWhenDeadState(raindrop: Raindrop): boolean {
      if (raindrop.timeDead < SETTINGS.CHARACTERS.TIME_DEAD) {
         raindrop.setTimeDead(raindrop.timeDead + 1)
         return false
      }

      raindrop.setTimeDead(0)
      raindrop.setState(RAINDROP_STATES.FADING_IN)
      raindrop.setColor(COLORS.NEW)
      raindrop.setGlowIntensity(SETTINGS.CHARACTERS.GLOW_INTENSITY)
      return true
   }

   /**
    * @returns `true` if the raindrop needs to be redrawn, else - `false`
    */
   private static updateRaindrop(raindrop: Raindrop): boolean {
      switch (raindrop.state) {
         case RAINDROP_STATES.INITIAL:    return RainColumn.updateRaindropWhenInitialState(raindrop)
         case RAINDROP_STATES.FADING_IN:  return RainColumn.updateRaindropWhenFadingInState(raindrop)
         case RAINDROP_STATES.ALIVE:      return RainColumn.updateRaindropWhenAliveState(raindrop)
         case RAINDROP_STATES.FADING_OUT: return RainColumn.updateRaindropWhenFadingOutState(raindrop)
         case RAINDROP_STATES.DEAD:       return RainColumn.updateRaindropWhenDeadState(raindrop)
         default: throw new Error(`Raindrop is in an unknown state (${raindrop.state})!`)
      }
   }

   /**
    * Change the raindrops displayed character if its lucky.
    */
   private static tryRandomizeCharacter(raindrop: Raindrop) {
      const randomNumber = getRandomNumber(100)
      if (randomNumber < SETTINGS.CHARACTERS.RANDOMIZE_CHANCE) {
         return
      }

      raindrop.setCharacter(getRandomCharacter())
   }

   /**
    * Draw a black square in the place of the raindrop.
    */
   private static clearRaindrop(raindrop: Raindrop, context: CanvasRenderingContext2D) {
      context.shadowColor = COLORS.DEAD
      context.shadowBlur = 0
      context.fillStyle = COLORS.DEAD

      const fontSize = SETTINGS.CHARACTERS.FONT_SIZE
      const glowIntensity = SETTINGS.CHARACTERS.GLOW_INTENSITY
      context.fillRect(
         raindrop.xCoord - glowIntensity * 3,
         raindrop.yCoord - glowIntensity * 3,
         fontSize + glowIntensity * 3,
         fontSize + glowIntensity * 3,
      )
   }

   private static drawRaindrop(raindrop: Raindrop, context: CanvasRenderingContext2D) {
      if (context.fillStyle !== raindrop.color) {
         context.fillStyle = raindrop.color
         context.shadowColor = raindrop.color
      }

      if (context.shadowBlur !== raindrop.glowIntensity) {
         context.shadowBlur = raindrop.glowIntensity
      }

      context.fillText(raindrop.character, raindrop.xCoord, raindrop.yCoord)
   }
}
