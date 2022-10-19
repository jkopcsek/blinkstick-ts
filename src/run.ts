
import { transpile } from "typescript";

const input = `
import { Farbe, Farben, setzeFarben, warte } from "./functional.de";

console.log("I'm in!");
(async () => {
    setzeFarben(new Array<Farbe>(8).fill(Farben.Rot))
    await warte(500);
    setzeFarben(new Array<Farbe>(16).fill(Farben["Tiefes Himmelblau"]))
    await warte(500);
    setzeFarben(new Array<Farbe>(32).fill(Farben.Türkis))
    await warte(500);
    //setzeFarben(new Array<Farbe>(16).fill(Farben.red))
    //await warte(500);
    setzeFarben(new Array<Farbe>(8).fill(Farben.Grün))
    await warte(500);
    setzeFarben(new Array<Farbe>(1).fill(Farben.Gainsboro))
    await warte(500);
    
})();
`;

const code = transpile(input);
console.log(code);
eval(code);
