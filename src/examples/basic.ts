import { BlinkSticks } from "../blinksticks";
import { Colors } from "../color";

const blinksticks = new BlinkSticks();
const blinkstick = blinksticks.findFirst()!;

blinkstick.setColor(Colors.red, 0);

blinkstick.setColors([Colors.green, Colors.yellow, Colors.red]);

const shouldBeGreen = blinkstick.getColor(0);