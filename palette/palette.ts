namespace palette {
    /**
     * The default palette buffer for the project
     */
    export const defaultPalette = hex`__palette`;
    let userColors: Buffer;

    /**
     * A color in RGB format
     */
    export interface RGB {
        r: number;
        b: number;
        g: number;
    }

    /**
     * A collection of colors
     */
    export class Palette {
        buf: Buffer;

        constructor(length: number) {
            this.buf = control.createBuffer((length | 0) * 3);
        }

        get length() {
            return this.buf.length / 3;
        }

        setColor(index: number, color: number) {
            index = index | 0;
            if (index < 0 || index >= this.length) return;

            const start = index * 3;
            this.buf[start] = _r(color);
            this.buf[start + 1] = _g(color);
            this.buf[start + 2] = _b(color);
        }

        getColor(index: number) {
            index = index | 0;
            if (index < 0 || index >= this.length) return -1;

            const start = index * 3;
            return toColor(this.buf[start], this.buf[start + 1], this.buf[start + 2]);
        }
    }

    /**
     * Dynamically set all or part of the game's current palette
     *
     * @param palette The colors to set (not including black or transparency)
     * @param start The index to start setting colors at (not including black or transparency)
     * @param length The number of colors to copy
     * @param pOffset The offset to start copying from the palette
     */
    export function setUserColors(palette: Palette, start = 0, length = 0, pOffset = 0) {
        if (!userColors) userColors = defaultPalette.slice();
        if (!length) length = palette.length;

        const fromStart = pOffset * 3;
        const toStart = (start + 1) * 3;

        const copyLength = Math.min(Math.max(length | 0, 0), Math.min(availableColors(), palette.length)) * 3;
        for (let i = 0; i < copyLength; i++) {
            userColors[toStart + i] = palette.buf[fromStart + i];
        }

        image.setPalette(userColors);
    }

    /**
     * Returns the number of colors available in the palette not
     * including transparency or black
     */
    export function availableColors(): number {
        return (defaultPalette.length / 3) - 2;
    }

    /**
     * Converts an array of RGB colors into a palette buffer
     */
    export function rgbToPalette(colors: RGB[]): Palette {
        return hexToPalette(colors && colors.map(rgbToNumber));
    }

    /**
     * Converts an array color strings into a palette buffer
     */
    export function stringToPalette(colors: string[]): Palette {
        return hexToPalette(colors && colors.map(parseColorString));
    }

    /**
     * Converts an array of colors into a palette buffer
     */
    export function hexToPalette(colors: number[]): Palette {
        const numColors = Math.min(colors.length, availableColors());
        const p = new Palette(numColors);

        if (colors && colors.length) {
            for (let i = 0; i < numColors; i++) {
                p.setColor(i, colors[i]);
            }
        }
        return p;
    }

    /**
     * Creates a palette from a gradient between two colors.
     *
     * @param start The start color (rgb format)
     * @param end The end color (rgb format)
     * @param steps The number of colors to generate;
     */
    export function gradient(start: number, end: number, steps: number): Palette {
        steps = steps | 0;
        if (steps <= 2) return undefined;

        const r1 = _r(start);
        const g1 = _g(start);
        const b1 = _b(start);

        const rSlope = (r1 - _r(end)) / steps;
        const gSlope = (g1 - _g(end)) / steps;
        const bSlope = (b1 - _b(end)) / steps;

        const grad = new Palette(steps);

        grad.setColor(0, start);
        grad.setColor(steps - 1, end);
        for (let i = 1; i < steps - 1; i++) {
            grad.setColor(i, toColor(r1 - i * rSlope, g1 - i * gSlope, b1 - i * bSlope));
        }

        return grad;
    }

    /**
     * Creates a palette from a gradient between two colors.
     *
     * @param start The start color string
     * @param end The end color string
     * @param steps The number of colors to generate;
     */
    export function strGradient(start: string, end: string, steps: number): Palette {
        return gradient(parseColorString(start), parseColorString(end), steps);
    }

    /**
     * Converts an RGB to a number (rgb format)
     */
    export function rgbToNumber(rgb: RGB) {
        return toColor(rgb.r, rgb.g, rgb.b);
    }

    /**
     * Converts a string to a number (rgb format)
     */
    export function parseColorString(color: string) {
        if (color) {
            if (color.length === 6) {
                return parseInt("0x" + color);
            }
            else if (color.length === 7) {
                return parseInt("0x" + color.substr(1));
            }
        }
        return 0;
    }

    function _r(color: number) { return (color >> 16) & 0xff }
    function _g(color: number) { return (color >> 8) & 0xff }
    function _b(color: number) { return color & 0xff }
    function toColor(r: number, g: number, b: number) {
        return ((r & 0xff) << 16) | ((g & 0xff) << 8) | (b & 0xff)
    }
}