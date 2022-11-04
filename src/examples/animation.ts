import { MorphAnimator } from "../animation";
import { BlinkSticks } from "../blinksticks";
import { Colors } from "../color";

const blinksticks = new BlinkSticks();
const blinkstick = blinksticks.findFirst()!;

new MorphAnimator(blinkstick.getChannel(0).getLed(0), Colors.green).animate();