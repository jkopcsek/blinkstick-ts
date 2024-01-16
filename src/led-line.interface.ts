import { Color } from "./color";
import { Led } from "./led.interface";

export interface LedLine {
    setColor(color: Color, index: number): void;
    setColors(colors: Color[]): void;

    getColor(index: number): Color;
    getColors(count: number, index?: number): Color[];

    getLed(index: number): Led;
}