import { IBlinkStick } from "../blinkstick.interface";
import { Color } from "../color";
import { LedLine } from "../led-line.interface";

export class SimulatedBlinkStick implements IBlinkStick {

    public constructor(private readonly channels: LedLine[]) {
    }

    public setColor(color: Color, index: number = 0, channel: number = 0): void {
        this.channels[channel].setColor(color, index);
    }

    public setColors(colors: Color[], channel: number = 0): void {
        this.channels[channel].setColors(colors);
    }

    public getColor(index: number = 0, channel: number = 0): Color {
        return this.channels[channel].getColor(index);
    }

    public getColors(count: number, index: number = 0, channel: number = 0): Color[] {
        return this.channels[channel].getColors(count, index);
    }

    public getChannel(channel: number): LedLine {
        return this.channels[channel];
    }

    public close(): void {
    }
}