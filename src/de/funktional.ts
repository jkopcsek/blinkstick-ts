import { setTimeout } from "timers/promises";
import { Simulation } from "../simulation/simulation";
import { Farbe } from "./farbe";

export { Farbe, Farben } from "./farbe";

type Zahl = number;
type Nichts = undefined;

//export const blinkStick = new BlinkSticks().findFirst();
export const blinkStick = Simulation.createBlinkStickWithLedLine(32);

export function setzeFarbe(position: Zahl, farbe: Farbe) {
    blinkStick.setColor(farbe, position);
}

export function setzeFarben(farben: Farbe[]) {
    blinkStick.setColors(farben);
}

export function liefereFarbe(position: Zahl): Farbe | Nichts {
    return blinkStick?.getColor(position);
}

export function liefereFarben(anzahl: Zahl): Farbe[] | Nichts {
    return blinkStick?.getColors(anzahl);
}

export async function warte(millisekunden: Zahl): Promise<void> {
    await setTimeout(millisekunden);
}
