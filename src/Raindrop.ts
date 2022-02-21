import { RAINDROP_STATES } from './RaindropStates.js'

/** I represent a single character in a rain column. */
export class Raindrop {
   private _character = ''
   private _color = ''
   private _glowIntensity = NaN
   private _state = RAINDROP_STATES.INITIAL
   private _xCoord = NaN
   private _yCoord = NaN
   private _timeAlive = NaN
   private _timeDead = NaN

   /**
    * @param character - The text character that it represents on the screen, ex.: 'A'.
    * @param color - The color of the text character as it will be shown on the screen, ex.: '#FFFFFF'.
    * @param glowIntensity - The intensity of the character's glow.
    * @param xCoord - The X axis coordinate where it should be drawn.
    * @param yCoord - The Y axis coordinate where it should be drawn.
    * @param raindropState - The state of the raindrop.
    */
   constructor(
      character: string,
      color: string,
      glowIntensity: number,
      xCoord: number,
      yCoord: number,
      state: RAINDROP_STATES,
   ) {
      this._character = character
      this._color = color
      this._glowIntensity = glowIntensity
      this._xCoord = xCoord
      this._yCoord = yCoord
      this._state = state
      this._timeAlive = 0
      this._timeDead = 0
   }

   /**
    * The text character that it represents on the screen, ex.: `'A'`.
    */
   get character(): string {
      return this._character
   }
   /**
    * @param character - The text character that it represents on the screen, ex.: `'A'`.
    */
   setCharacter(character: string) {
      this._character = character
   }

   /**
    * The color of the text character as it will be shown on the screen, ex.: `'#FFFFFF'`.
    */
   get color(): string {
      return this._color
   }
   /**
    * @param color - The color of the text character as it will be shown on the screen, ex.: `'#FFFFFF'`.
    */
   setColor(color: string) {
      this._color = color
   }

   /**
    * The intensity of the character's glow.
    */
   get glowIntensity(): number {
      return this._glowIntensity
   }
   /**
    * @param glowIntensity - The intensity of the character's glow.
    */
   setGlowIntensity(glowIntensity: number) {
      this._glowIntensity = glowIntensity
   }

   /**
    * The X axis coordinate where it should be drawn.
    */
   get xCoord(): number {
      return this._xCoord
   }

   /**
    * The Y axis coordinate where it should be drawn.
    */
   get yCoord(): number {
      return this._yCoord
   }
   /**
    * @param yCoord - The Y axis coordinate where it should be drawn.
    */
   setYCoord(yCoord: number) {
      this._yCoord = yCoord
   }

   /**
    * The state of the raindrop.
    */
   get state(): RAINDROP_STATES {
      return this._state
   }
   /**
    * @param raindropState - The state of the raindrop.
    */
   setState(raindropState: RAINDROP_STATES) {
      this._state = raindropState
   }

   /**
    * The amount of redraws the raindrop is in `RAINDROP_STATES.ALIVE`.
    */
   get timeAlive(): number {
      return this._timeAlive
   }
   /**
    * @param timeAlive - The amount of redraws the raindrop is in `RAINDROP_STATES.ALIVE`.
    */
   setTimeAlive(timeAlive: number) {
      this._timeAlive = timeAlive
   }

   /**
    * The amount of redraws the raindrop is in `RAINDROP_STATES.DEAD`.
    */
   get timeDead() {
      return this._timeDead
   }
   /**
    * @param timeDead - The amount of redraws the raindrop is in `RAINDROP_STATES.DEAD`.
    */
   setTimeDead(timeDead: number) {
      this._timeDead = timeDead
   }
}
