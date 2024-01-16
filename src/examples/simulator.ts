import { Colors } from "../color";
import { Simulation } from "../simulation/simulation";

const blinkstick = Simulation.createBlinkStickWithLedLine(16);

console.log(blinkstick.getChannel(0).toString());

blinkstick.setColor(Colors.red, 0);

console.log(blinkstick.getChannel(0).toString());

blinkstick.setColors([Colors.green, Colors.yellow, Colors.red]);

console.log(blinkstick.getChannel(0).toString());

const shouldBeGreen = blinkstick.getColor(0);
