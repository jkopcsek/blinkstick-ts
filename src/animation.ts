import { setInterval } from "timers/promises";
import { Color, Colors } from "./color";
import { Led } from "./led.interface";

export interface IAnimator {

}

/**
 * Blinks specified RGB color.
 *
 * Function supports the following overloads:
 *
 * @example
 *     //Available overloads
 *     blink(red, green, blue, [options], [callback]); // use [0..255] ranges for intensity
 *
 *     blink(color, [options], [callback]); // use '#rrggbb' format
 *
 *     blink(color_name, [options], [callback]); // use 'random', 'red', 'green', 'yellow' and other CSS supported names
 *
 * Options can contain the following parameters for object:
 *
 * - channel=0: Channel is represented as 0=R, 1=G, 2=B
 * - index=0: The index of the LED
 * - repeats=1: How many times to blink
 * - delay=1: Delay between on/off cycles in milliseconds
 *
 * @param {Led} led The led to blink
 * @param {Color} color The Color to blink
 * @param {Number} [repeats] How many times to blink
 * @param {Number} [delay] Delay between on/off cycles in milliseconds, defaults to 10
 */
export class BlinkAnimator {
    private readonly led: Led;
    private readonly color: Color;
    private readonly repeats: number;
    private readonly delay: number;

    private enabled: boolean = false;
    private count: number = 0;

    public constructor(led: Led, color: Color, repeats: number = 1, delay: number = 10) {
        this.led = led;
        this.color = color;
        this.repeats = repeats;
        this.delay = delay;
    }

    public async animate(): Promise<void> {
        for await (const startTime of setInterval(this.delay)) {
            const color = this.count % 1 == 1 ? Colors.black : this.color;
            this.led.setColor(color);

            if (!this.enabled || this.count == this.repeats - 1) {
                return;
            }

            this.count++;
        }
    }
};



/**
 * Morphs to specified RGB color from current color.
 *
 * Function supports the following overloads:
 *
 * @example
 *     //Available overloads
 *     morph(red, green, blue, [options], [callback]); // use [0..255] ranges for intensity
 *
 *     morph(color, [options], [callback]); // use '#rrggbb' format
 *
 *     morph(color_name, [options], [callback]); // use 'random', 'red', 'green', 'yellow' and other CSS supported names
 *
 * @param {Led} led The led to morph
 * @param {Color} color The Color to morph to
 * @param {Number} [duration] How long should the morph animation last in milliseconds, defaults to 1000
 * @param {Number} [steps] How many steps for color changes, defaults to 50
 */
export class MorphAnimator {
    private readonly led: Led;
    private readonly color: Color;
    private readonly duration: number;
    private readonly steps: number;

    private enabled: boolean = false;
    private count: number = 0;

    public constructor(led: Led, color: Color, duration: number = 1000, steps: number = 50) {
        this.led = led;
        this.color = color;
        this.duration = duration;
        this.steps = steps;
    }

    public async animate(): Promise<void> {
        const startColor = this.led.getColor();
        for await (const startTime of setInterval(this.duration / this.steps)) {
            const factor = this.steps * this.count;
            const color = new Color(
                startColor.red + (this.color.red - startColor.red) / factor,
                startColor.green + (this.color.green - startColor.green) / factor,
                startColor.blue + (this.color.blue - startColor.blue) / factor);

            this.led.setColor(color);

            if (!this.enabled || this.count >= this.steps) {
                return;
            }

            this.count++;
        }
    }
};

/**
 * Pulses specified RGB color.
 *
 * Function supports the following overloads:
 *
 * @example
 *     //Available overloads
 *     pulse(red, green, blue, [options], [callback]); // use [0..255] ranges for intensity
 *
 *     pulse(color, [options], [callback]); // use '#rrggbb' format
 *
 *     pulse(color_name, [options], [callback]); // use 'random', 'red', 'green', 'yellow' and other CSS supported names
 *
 * @param {Led} led The led to pulse
 * @param {Color} color The Color to pulse to first
 * @param {Color} color The Color to pulse to afterwards, defaults to black
 * @param {Number} [duration] How long should the pulse animation last in milliseconds, defaults to 1000
 * @param {Number} [steps] How many steps for color changes, defaults to 50
 */
export class PulseAnimator {
    private readonly led: Led;
    private readonly color1: Color;
    private readonly color2: Color;
    private readonly duration: number;
    private readonly steps: number;

    public constructor(led: Led, color1: Color, color2: Color = Colors.black, duration: number = 1000, steps: number = 50) {
        this.led = led;
        this.color1 = color1;
        this.color2 = color2;
        this.duration = duration;
        this.steps = steps;
    }

    public async animate(): Promise<void> {
        await new MorphAnimator(this.led, this.color1, this.duration / 2, this.steps).animate();
        await new MorphAnimator(this.led, this.color2, this.duration / 2, this.steps).animate();
    }
};
