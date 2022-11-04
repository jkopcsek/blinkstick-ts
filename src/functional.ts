import { setTimeout } from "timers/promises";
import { BlinkSticks } from "./blinksticks";
import { Color } from "./color";

export const blinkStick = new BlinkSticks().findFirst();

export function setColor(position: number, color: Color) {
    blinkStick?.setColor(color, position);
}

export function setColors(colors: Color[]) {
    blinkStick?.setColors(colors);
}

export function getColor(position: number): Color | undefined {
    return blinkStick?.getColor(position);
}

export function getColors(count: number): Color[] | undefined {
    return blinkStick?.getColors(count);
}

export async function wait(milliseconds: number): Promise<void> {
    await setTimeout(milliseconds);
}
