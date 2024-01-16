import { BlinkSticks } from "../blinksticks";
import { BlinkStick } from "../blinkstick";
import { Colors } from "../color";

// const blinksticks = new BlinkSticks();
// console.log(blinksticks.findAll());
// const blinkstick = blinksticks.findFirst()!;

const blinkstick = new BlinkStick('DevSrvsID:4295873602', 'BS048131-3.1', 'Agile Innovative Ltd', 'BlinkStick Flex');

blinkstick.setColor(Colors.red, 0);

blinkstick.setColors([Colors.green, Colors.yellow, Colors.red]);

const shouldBeGreen = blinkstick.getColor(0);
