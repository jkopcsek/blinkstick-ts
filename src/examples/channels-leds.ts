import { setTimeout } from "timers/promises";
import { BlinkSticks } from "../blinksticks";
import { Colors } from "../color";
import { LedLine } from "../led-line.interface";
import { Led } from "../led.interface";

const blinksticks = new BlinkSticks();
const blinkstick = blinksticks.findFirst()!;

async function doSomethingWithLed(led: Led): Promise<void> {
    led.setColor(Colors.green);
    await setTimeout(1000);
    led.setColor(Colors.black);
}

const channel: LedLine = blinkstick.getChannel(0);
const led1: Led = channel.getLed(0);
const led2: Led = channel.getLed(1);

doSomethingWithLed(led1);
doSomethingWithLed(led2);