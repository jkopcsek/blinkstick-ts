
# BlinkStick-TS

TypeScript implementation of BlinkStick. Also, a bit of a reimagination of the API.

# Installation

```npm install blinkstick-ts```

# Examples

See [Examples at GitHub](https://github.com/jkopcsek/blinkstick-ts/tree/main/src/examples)

# Object-Orientied API 

A BlinkStick provides access to multiple LEDs potentially organized in multiple channels (i.e. lines of LEDs). 
To make it easier to work with those constructs and not just arbitrary indexes, there is an LedLine and Led object.

```
const ledLine: LedLine = blinkstick.getChannel(0);
const led1: Led = channel.getLed(0);
const led2: Led = channel.getLed(1);
```

