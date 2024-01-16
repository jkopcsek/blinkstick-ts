import { Color } from "./color";
import { LedLine } from "./led-line.interface";

export interface IBlinkStick {
    setColor(color: Color, index?: number, channel?: number): void;
    setColors(color: Color[], index?: number, channel?: number): void;

    getColor(index?: number, channel?: number): Color;
    getColors(count: number, index?: number, channel?: number): Color[];

    getChannel(channel?: number): LedLine;
    
    close(): void;
}