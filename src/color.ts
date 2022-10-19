

export class Color {
    public readonly red: number;
    public readonly green: number;
    public readonly blue: number;

    public constructor(red: number, green: number, blue: number) {
        this.red = Math.max(Math.min(red, 255), 0);
        this.green = Math.max(Math.min(green, 255), 0);
        this.blue = Math.max(Math.min(blue, 255), 0);
    }

    public static fromHex(hex: string) {
        const red = parseInt(hex.substr(1, 2), 16);
        const green = parseInt(hex.substr(3, 2), 16);
        const blue = parseInt(hex.substr(5, 2), 16);

        return new Color(red, green, blue);
    }

    public toHex(): string {
        return '#' + decimalToHex(this.red, 2) + decimalToHex(this.green, 2) + decimalToHex(this.blue, 2);
    }

    public inverse(): Color {
        return new Color(255 - this.red, 255 - this.green, 255 - this.blue);
    }
}


/**
 * Converts decimal number to hex with zero padding
 *
 * @private
 * @method decimalToHex
 * @param {Number} d Decimal number to convert
 * @param {Number} padding How many zeros to use for padding
 * @return {String} Decimal number converted to hex string
*/
function decimalToHex(d: number, padding: number = 2): string {
    return Number(d).toString(16).padStart(padding, "0");
}


export const Colors: Record<string, Color> = {
    "aqua": Color.fromHex("#00ffff"),
    "aliceblue": Color.fromHex("#f0f8ff"),
    "antiquewhite": Color.fromHex("#faebd7"),
    "black": Color.fromHex("#000000"),
    "blue": Color.fromHex("#0000ff"),
    "cyan": Color.fromHex("#00ffff"),
    "darkblue": Color.fromHex("#00008b"),
    "darkcyan": Color.fromHex("#008b8b"),
    "darkgreen": Color.fromHex("#006400"),
    "darkturquoise": Color.fromHex("#00ced1"),
    "deepskyblue": Color.fromHex("#00bfff"),
    "green": Color.fromHex("#008000"),
    "lime": Color.fromHex("#00ff00"),
    "mediumblue": Color.fromHex("#0000cd"),
    "mediumspringgreen": Color.fromHex("#00fa9a"),
    "navy": Color.fromHex("#000080"),
    "springgreen": Color.fromHex("#00ff7f"),
    "teal": Color.fromHex("#008080"),
    "midnightblue": Color.fromHex("#191970"),
    "dodgerblue": Color.fromHex("#1e90ff"),
    "lightseagreen": Color.fromHex("#20b2aa"),
    "forestgreen": Color.fromHex("#228b22"),
    "seagreen": Color.fromHex("#2e8b57"),
    "darkslategray": Color.fromHex("#2f4f4f"),
    "darkslategrey": Color.fromHex("#2f4f4f"),
    "limegreen": Color.fromHex("#32cd32"),
    "mediumseagreen": Color.fromHex("#3cb371"),
    "turquoise": Color.fromHex("#40e0d0"),
    "royalblue": Color.fromHex("#4169e1"),
    "steelblue": Color.fromHex("#4682b4"),
    "darkslateblue": Color.fromHex("#483d8b"),
    "mediumturquoise": Color.fromHex("#48d1cc"),
    "indigo": Color.fromHex("#4b0082"),
    "darkolivegreen": Color.fromHex("#556b2f"),
    "cadetblue": Color.fromHex("#5f9ea0"),
    "cornflowerblue": Color.fromHex("#6495ed"),
    "mediumaquamarine": Color.fromHex("#66cdaa"),
    "dimgray": Color.fromHex("#696969"),
    "dimgrey": Color.fromHex("#696969"),
    "slateblue": Color.fromHex("#6a5acd"),
    "olivedrab": Color.fromHex("#6b8e23"),
    "slategray": Color.fromHex("#708090"),
    "slategrey": Color.fromHex("#708090"),
    "lightslategray": Color.fromHex("#778899"),
    "lightslategrey": Color.fromHex("#778899"),
    "mediumslateblue": Color.fromHex("#7b68ee"),
    "lawngreen": Color.fromHex("#7cfc00"),
    "aquamarine": Color.fromHex("#7fffd4"),
    "chartreuse": Color.fromHex("#7fff00"),
    "gray": Color.fromHex("#808080"),
    "grey": Color.fromHex("#808080"),
    "maroon": Color.fromHex("#800000"),
    "olive": Color.fromHex("#808000"),
    "purple": Color.fromHex("#800080"),
    "lightskyblue": Color.fromHex("#87cefa"),
    "skyblue": Color.fromHex("#87ceeb"),
    "blueviolet": Color.fromHex("#8a2be2"),
    "darkmagenta": Color.fromHex("#8b008b"),
    "darkred": Color.fromHex("#8b0000"),
    "saddlebrown": Color.fromHex("#8b4513"),
    "darkseagreen": Color.fromHex("#8fbc8f"),
    "lightgreen": Color.fromHex("#90ee90"),
    "mediumpurple": Color.fromHex("#9370db"),
    "darkviolet": Color.fromHex("#9400d3"),
    "palegreen": Color.fromHex("#98fb98"),
    "darkorchid": Color.fromHex("#9932cc"),
    "yellowgreen": Color.fromHex("#9acd32"),
    "sienna": Color.fromHex("#a0522d"),
    "brown": Color.fromHex("#a52a2a"),
    "darkgray": Color.fromHex("#a9a9a9"),
    "darkgrey": Color.fromHex("#a9a9a9"),
    "greenyellow": Color.fromHex("#adff2f"),
    "lightblue": Color.fromHex("#add8e6"),
    "paleturquoise": Color.fromHex("#afeeee"),
    "lightsteelblue": Color.fromHex("#b0c4de"),
    "powderblue": Color.fromHex("#b0e0e6"),
    "firebrick": Color.fromHex("#b22222"),
    "darkgoldenrod": Color.fromHex("#b8860b"),
    "mediumorchid": Color.fromHex("#ba55d3"),
    "rosybrown": Color.fromHex("#bc8f8f"),
    "darkkhaki": Color.fromHex("#bdb76b"),
    "silver": Color.fromHex("#c0c0c0"),
    "mediumvioletred": Color.fromHex("#c71585"),
    "indianred": Color.fromHex("#cd5c5c"),
    "peru": Color.fromHex("#cd853f"),
    "chocolate": Color.fromHex("#d2691e"),
    "tan": Color.fromHex("#d2b48c"),
    "lightgray": Color.fromHex("#d3d3d3"),
    "lightgrey": Color.fromHex("#d3d3d3"),
    "thistle": Color.fromHex("#d8bfd8"),
    "goldenrod": Color.fromHex("#daa520"),
    "orchid": Color.fromHex("#da70d6"),
    "palevioletred": Color.fromHex("#db7093"),
    "crimson": Color.fromHex("#dc143c"),
    "gainsboro": Color.fromHex("#dcdcdc"),
    "plum": Color.fromHex("#dda0dd"),
    "burlywood": Color.fromHex("#deb887"),
    "lightcyan": Color.fromHex("#e0ffff"),
    "lavender": Color.fromHex("#e6e6fa"),
    "darksalmon": Color.fromHex("#e9967a"),
    "palegoldenrod": Color.fromHex("#eee8aa"),
    "violet": Color.fromHex("#ee82ee"),
    "azure": Color.fromHex("#f0ffff"),
    "honeydew": Color.fromHex("#f0fff0"),
    "khaki": Color.fromHex("#f0e68c"),
    "lightcoral": Color.fromHex("#f08080"),
    "sandybrown": Color.fromHex("#f4a460"),
    "beige": Color.fromHex("#f5f5dc"),
    "mintcream": Color.fromHex("#f5fffa"),
    "wheat": Color.fromHex("#f5deb3"),
    "whitesmoke": Color.fromHex("#f5f5f5"),
    "ghostwhite": Color.fromHex("#f8f8ff"),
    "lightgoldenrodyellow": Color.fromHex("#fafad2"),
    "linen": Color.fromHex("#faf0e6"),
    "salmon": Color.fromHex("#fa8072"),
    "oldlace": Color.fromHex("#fdf5e6"),
    "bisque": Color.fromHex("#ffe4c4"),
    "blanchedalmond": Color.fromHex("#ffebcd"),
    "coral": Color.fromHex("#ff7f50"),
    "cornsilk": Color.fromHex("#fff8dc"),
    "darkorange": Color.fromHex("#ff8c00"),
    "deeppink": Color.fromHex("#ff1493"),
    "floralwhite": Color.fromHex("#fffaf0"),
    "fuchsia": Color.fromHex("#ff00ff"),
    "gold": Color.fromHex("#ffd700"),
    "hotpink": Color.fromHex("#ff69b4"),
    "ivory": Color.fromHex("#fffff0"),
    "lavenderblush": Color.fromHex("#fff0f5"),
    "lemonchiffon": Color.fromHex("#fffacd"),
    "lightpink": Color.fromHex("#ffb6c1"),
    "lightsalmon": Color.fromHex("#ffa07a"),
    "lightyellow": Color.fromHex("#ffffe0"),
    "magenta": Color.fromHex("#ff00ff"),
    "mistyrose": Color.fromHex("#ffe4e1"),
    "moccasin": Color.fromHex("#ffe4b5"),
    "navajowhite": Color.fromHex("#ffdead"),
    "orange": Color.fromHex("#ffa500"),
    "orangered": Color.fromHex("#ff4500"),
    "papayawhip": Color.fromHex("#ffefd5"),
    "peachpuff": Color.fromHex("#ffdab9"),
    "pink": Color.fromHex("#ffc0cb"),
    "red": Color.fromHex("#ff0000"),
    "seashell": Color.fromHex("#fff5ee"),
    "snow": Color.fromHex("#fffafa"),
    "tomato": Color.fromHex("#ff6347"),
    "white": Color.fromHex("#ffffff"),
    "yellow": Color.fromHex("#ffff00"),
    "warmwhite": Color.fromHex("fdf5e6")	// Non-standard. Added to support CheerLights.
};

