import { Color } from "./color";

export interface Led {
    setColor(color: Color): void;
    getColor(): Color;
}