import { Color } from "./color";
import { Led } from "./led.interface";

export interface LedLine {
    setColor(color: Color, index: number): void;
    getColor(index: number): Color;

    getLed(index: number): Led;
}