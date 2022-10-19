/**
 * Provides access to BlinkStick devices
 *
 * @module blinkstick
 */

import { BlinkStickChannel } from './blinkstick-channel';
import { Color } from './color';
import { Led } from './led.interface';
 
 export class BlinkStickLed implements Led {
     private readonly channel: BlinkStickChannel; 
     private readonly index: number;
 
     public constructor(blinkStickChannel: BlinkStickChannel, index: number) {
         this.channel = blinkStickChannel;
         this.index = index;
     }
 
     public setColor(color: Color): void {
         this.channel.setColor(color, this.index);
     }
     
     public getColor(): Color {
         return this.channel.getColor(this.index);
     }
 }