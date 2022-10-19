import { BlinkStickChannel } from "./blinkstick-channel";
import { Color } from "./color";

export interface IBlinkStick {
    setColor(color: Color, index?: number, channel?: number): void;
    setColors(color: Color[], index?: number, channel?: number): void;

    getColor(index?: number, channel?: number): Color;
    getColors(count: number, index?: number, channel?: number): Color[];

    getChannel(channel?: number): BlinkStickChannel;
    
    close(): void;
}