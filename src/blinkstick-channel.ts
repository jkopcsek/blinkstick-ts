/**
 * Provides access to BlinkStick devices
 *
 * @module blinkstick
 */

import { BlinkStick } from './blinkstick';
import { BlinkStickLed } from './blinkstick-led';
import { Color } from './color';
import { LedLine } from './led-line.interface';
import { Led } from './led.interface';

export class BlinkStickChannel implements LedLine {
    private readonly blinkStick: BlinkStick; 
    private readonly channel: number;

    public constructor(blinkStick: BlinkStick, channel: number = 0) {
        this.blinkStick = blinkStick;
        this.channel = channel;
    }

    public setColor(color: Color, index?: number): void {
        this.blinkStick.setColor(color, index, this.channel);
    }
    
    public setColors(colors: Color[]): void {
        this.blinkStick.setColors(colors, this.channel);
    }

    public getColor(index?: number): Color {
        return this.blinkStick.getColor(index, this.channel);
    }

    public getColors(count: number, index?: number): Color[] {
        return this.blinkStick.getColors(count, index, this.channel);
    }

    public getLed(index: number): Led {
        return new BlinkStickLed(this, index);
    }
}