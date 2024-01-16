import { Color } from "../color";
import { LedLine } from "../led-line.interface";
import { Led } from "../led.interface";
import { SimulatedLed } from "./simulated-led";

export class SimulatedLedLine implements LedLine {
    private leds: SimulatedLed[];

    constructor(count: number) {
        const leds = new Array<SimulatedLed>(count);
        for (let i = 0; i < count; i++) {
            leds[i] = new SimulatedLed();
        }
        this.leds = leds;
    }

    public setColor(color: Color, index: number): void {
        this.leds[index].setColor(color);
    }

    public setColors(colors: Color[]): void {
        colors.forEach((c, i) => this.leds[i].setColor(c));
    }

    public getColor(index: number): Color {
        return this.leds[index].getColor();
    }

    public getColors(count: number, index: number = 0): Color[] {
        return this.leds.slice(index, index + count).map((l) => l.getColor());
    }

    public getLed(index: number): Led {
        return this.leds[index];
    }

    public toString(): string {
        return this.leds.map((l) => l.toString()).join("");
    }
}