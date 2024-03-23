
# BlinkStick-TS

TypeScript implementation of BlinkStick. Also, a bit of a reimagination of the API.

# Installation

```npm install blinkstick-ts```

# Examples

See [Examples at GitHub](https://github.com/jkopcsek/blinkstick-ts/tree/main/src/examples)

Run with 

```npx ts-node src/examples/basic.ts```

# Object-Orientied API 

A BlinkStick provides access to multiple LEDs potentially organized in multiple channels (i.e. lines of LEDs). 
To make it easier to work with those constructs and not just arbitrary indexes, there is an LedLine and Led object.

```
const ledLine: LedLine = blinkstick.getChannel(0);
const led1: Led = channel.getLed(0);
const led2: Led = channel.getLed(1);
```

# Functional API 

An alternative to the object-oriented API is the functional API. Here, it's all functions, no objects. Simple to start with.

```
setColor(0, Colors.red);
setColors([Colors.red, Colors.green]);
```

## German version

There is also a german variant of the functional API.

```
setzeFarbe(0, Farben.Rot);
setzeFarben([Farben.Rot, Farben.Grün]);
```

## Simulator 

You can use simulated led lines and print to the terminal

```
████████████████████████████████
████████████████████████████████
████████████████████████████████
████████████████████████████████
████████████████████████████████
██
```