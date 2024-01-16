import chalk from 'chalk';
import { Color, Colors } from "../color";
import { Led } from "../led.interface";

export class SimulatedLed implements Led {
    private color: Color;

    constructor() {
        this.color = Colors.black;
    }

    public setColor(color: Color): void {
        this.color = color;
    }

    public getColor(): Color {
        return this.color;
    }

    public toString(): string {
        return chalk.rgb(this.color.red, this.color.green, this.color.blue)("█");
    }    
} 