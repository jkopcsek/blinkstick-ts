import { IBlinkStick } from "../blinkstick.interface";
import { LedLine } from "../led-line.interface";
import { Led } from "../led.interface";
import { SimulatedBlinkStick } from "./simulated-blinkstick";
import { SimulatedLed } from "./simulated-led";
import { SimulatedLedLine } from "./simulated-led-line";

export class Simulation {
    public static createLed(): Led {
        return new SimulatedLed();
    }

    public static createLedLine(count: number): LedLine {
        return new SimulatedLedLine(count);
    }

    public static createBlinkStickWithLedLine(count: number): IBlinkStick {
        return new SimulatedBlinkStick([new SimulatedLedLine(count)]);
    }
}