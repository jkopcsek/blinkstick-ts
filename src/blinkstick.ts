/**
 * Provides access to BlinkStick devices
 *
 * @module blinkstick
 */

import * as usb from 'node-hid';
import { BlinkStickChannel } from './blinkstick-channel';
import { IBlinkStick } from './blinkstick.interface';
import { Color } from './color';

export class BlinkStick implements IBlinkStick {
    public readonly device: usb.HID;

    /**
     * The serial number of device.
     *
     * <pre>
     * BSnnnnnn-1.0
     * ||  |    | |- Software minor version
     * ||  |    |--- Software major version
     * ||  |-------- Denotes sequential number
     * ||----------- Denotes BlinkStick device
     * </pre>
     *
     * Software version defines the capabilities of the device
     */
    public readonly serial?: string;
    public readonly manufacturer?: string;
    public readonly product?: string;

    /** inverse mode for IKEA DIODER in conjunction with BlinkStick v1.0 */
    private inverse: boolean;
    private requiresSoftwareColorPatch: boolean;

    /**
   * Initialize new BlinkStick device
   *
   * @class BlinkStick
   * @constructor
   * @param {Object} device The USB device as returned from "usb" package.
   * @param {String} [serialNumber] Serial number of the device. Used only in Windows.
   * @param {String} [manufacturer] Manufacturer of the device. Used only in Windows.
   * @param {String} [product] Product name of the device. Used only in Windows.
   */
    constructor(device: any, serialNumber?: string, manufacturer?: string, product?: string) {
        this.device = new usb.HID(device);
        this.serial = serialNumber;
        this.manufacturer = manufacturer;
        this.product = product;

        this.inverse = false;

        const major = this.versionMajor;
        const minor = this.versionMinor;
        this.requiresSoftwareColorPatch = !!(major && minor && major == 1 && minor >= 1 && minor <= 3);
    }

    /**
     * Close BlinkStick device and stop all animations
     *
     * @method close
     */
    public close() {
        try {
            this.device.close();
        } catch (ex) {
            console.log(ex);
        }
    };

    /**
     * Get the major version from serial number
     *
     * @method getVersionMajor
     * @return {Number} Major version number from serial
     */
    public get versionMajor(): number | undefined {
        if (!this.serial) {
            return undefined;
        }
        return parseInt(this.serial.substring(this.serial.length - 3, this.serial.length - 2));
    };

    /**
     * Get the minor version from serial number
     *
     * @method getVersionMinor
     * @return {Number} Minor version number from serial
     */
    public get versionMinor(): number | undefined {
        if (!this.serial) {
            return undefined;
        }
        return parseInt(this.serial.substring(this.serial.length - 1, this.serial.length));
    };

    public setRandomColor() {
        this.setColor(new Color(randomIntInc(0, 255), randomIntInc(0, 255), randomIntInc(0, 255)));
    }

    public sendColorInternal(color: Color, channel: number, index: number): void {
        if (channel === 0 && index === 0) {
            this.setFeatureReport(1, [1, color.red, color.green, color.blue]);
        } else {
            this.setFeatureReport(5, [5, channel, index, color.red, color.green, color.blue]);
        }
    }

    /**
     * Set the color of LEDs
     *
     * @example
     *     //Available overloads
     *     setColor(red, green, blue, [options], [callback]); // use [0..255] ranges for intensity
     *
     *     setColor(color, [options], [callback]); // use '#rrggbb' format
     *
     *     setColor(color_name, [options], [callback]); // use 'random', 'red', 'green', 'yellow' and other CSS supported names
     *
     * @method setColor
     * @param {Color} index The index to set
     * @param {Color} color The color to set
     * @param {Object}   [options] additional options {"channel": 0, "index": 0}. Channel is represented as 0=R, 1=G, 2=B
     * @param {Function} [callback] Callback, called when complete.
     */
    public setColor(color: Color, index: number = 0, channel: number = 0): void {
        if (this.inverse) {
            color = color.inverse();
        }

        if (this.requiresSoftwareColorPatch) {
            var current = this.getColor();

            if (color == current) {
                current = new Color(current.red > 0 ? current.red - 1 : 0, current.green > 0 ? current.green - 1 : 0, current.blue);

                this.sendColorInternal(current, channel, index);
                this.sendColorInternal(color, channel, index);
            } else {
                this.sendColorInternal(color, channel, index);
            }
        } else {
            this.sendColorInternal(color, channel, index);
        }
    };


    /**
     * Set mode for BlinkStick Pro
     *
     * - 0 = Normal
     * - 1 = Inverse
     * - 2 = WS2812
     *
     * You can read more about BlinkStick modes by following this link:
     *
     * http://www.blinkstick.com/help/tutorials/blinkstick-pro-modes
     *
     * @method setMode
     * @param {Number} mode Set the desired mode for BlinkStick Pro
     */
    public setMode(mode: number) {
        this.setFeatureReport(0x0004, [4, mode]);
    };




    /**
     * Get mode for BlinkStick Pro
     *
     * - 0 = Normal
     * - 1 = Inverse
     * - 2 = WS2812
     *
     * You can read more about BlinkStick modes by following this link:
     *
     * http://www.blinkstick.com/help/tutorials/blinkstick-pro-modes
     *
     * Usage:
     *
     * @example
     *     getMode(function(err, data) {
     *         console.log(data);
     *     });
     *
     * @method getMode
     */
    public async getMode(): Promise<number | undefined> {
        const buffer = await this.getFeatureReport(4, 33);
        return buffer ? buffer[1] : undefined;
    };




    /**
     * Get the current color visible on BlinkStick
     *
     * Function supports the following overloads:
     *
     * @example
     *     //Available overloads
     *     getColor(callback); //index defaults to 0
     *
     *     getColor(index, callback);
     *
     * @example
     *     getColor(0, function(err, r, g, b) {
     *         console.log(r, g, b);
     *     });
     *
     * @method getColor
     * @param {Number=0} index The index of the LED 
     * @param {Function} callback Callback to which to pass the color values.
     * @return {Number, Number, Number} Callback returns three numbers: R, G and B [0..255].
     */
    public getColor(index: number = 0, channel: number = 0): Color {
        if (index === 0) {
            // TODO unify with get colors
            const buffer = this.getFeatureReport(1, 3);
            return new Color(buffer[1], buffer[2], buffer[3]);
        } else {
            const colors = this.getColors(1, index, channel);
            return colors[0];
        }
    };




    /**
     * Get the current color frame on BlinkStick Pro
     *
     * @method getColors
     * @param {Number} index Where to start
     * @param {Number} count How many LEDs should return
     * @return {Array} Callback returns an array of LED data in the following format: [g0, r0, b0, g1, r1, b1...]
     */
    public getColors(count: number, index: number = 0, channel: number = 0): Color[] {
        const params = this.determineReportId(index + count);

        var buffer = this.getFeatureReport(params.reportId, params.maxLeds * 3 + 2);
        buffer = buffer.slice(2, buffer.length - 1); // cut of header
        buffer = buffer.slice(index * 3, buffer.length - 1); // cut off until index

        const result = [];
        for (var i = 0; i < count; i++) {
            result.push(new Color(buffer[i * 3 + 1], buffer[i * 3], buffer[i * 3 + 2]));
        }
        return result;
    };




    /**
     * Set the color frame on BlinkStick Pro
     *
     * @example
     *     var data = [255, 0, 0, 0, 255, 0];
     *
     *     setColors(0, data, function(err) {
     *     });
     *
     * @method setColors
     * @param {Number} channel Channel is represented as 0=R, 1=G, 2=B
     * @param {Array} data LED data in the following format: [g0, r0, b0, g1, r1, b1...]
     * @param {Function} callback Callback when the operation completes
     */
    public setColors(data: Color[], channel: number = 0) {
        const params = this.determineReportId(data.length);

        const report = [params.reportId, channel];

        for (var j = 0; j < params.maxLeds; j++) {
            if (j >= data.length) {
                report.push(0, 0, 0);
            } else {
                report.push(data[j].red, data[j].green, data[j].blue);
            }
        }

        this.setFeatureReport(params.reportId, report);
    };

    public getChannel(channel?: number): BlinkStickChannel {
        return new BlinkStickChannel(this, channel);
    }


    /**
    * Get an infoblock from a device.
    *
    * @private
    * @static
    * @method getInfoBlock
    * @param {BlinkStick} device Device from which to get the value.
    * @param {Number} location Address to seek the data.
    * @param {Function} callback Callback to which to pass the value.
    */
    private getInfoBlock(location: number): string {
        const buffer = this.device.getFeatureReport(location, 33);

        var result = '', i, l;

        for (i = 1, l = buffer.length; i < l; i++) {
            if (i === 0) break;
            result += String.fromCharCode(buffer[i]);
        }

        return result;
    }

    /**
     * Get the infoblock1 of the device.
     * This is a 32 byte array that can contain any data. It's supposed to
     * hold the "Name" of the device making it easier to identify rather than
     * a serial number.
     *
     * Usage:
     *
     * @example
     *     getInfoBlock1(function(err, data) {
     *         console.log(data);
     *     });
     *
     * @method getInfoBlock1
     * @param {Function} callback Callback to which to pass the value.
     */
    public getInfoBlock1() {
        return this.getInfoBlock(0x0002);
    };




    /**
     * Get the infoblock2 of the device.
     * This is a 32 byte array that can contain any data.
     *
     * Usage:
     *
     * @example
     *     getInfoBlock2(function(err, data) {
     *         console.log(data);
     *     });
     *
     * @method getInfoBlock2
     * @param {Function} callback Callback to which to pass the value.
     */
    public getInfoBlock2() {
        return this.getInfoBlock(0x0003);
    };



    /**
     * Sets an infoblock on a device.
     *
     * @private
     * @static
     * @method setInfoBlock
     * @param {BlinkStick} device Device on which to set the value.
     * @param {Number} location Address to seek the data.
     * @param {String} data The value to push to the device. Should be <= 32 chars.
     * @param {Function} callback Callback to which to pass the value.
     */
    private setInfoBlock(location: number, data: string) {
        const l = Math.min(data.length, 33);
        const buffer = Buffer.alloc(33);

        buffer[0] = 0;
        for (var i = 0; i < l; i++) {
            buffer[i + 1] = data.charCodeAt(i);
        }
        for (var i = l; i < 33; i++) {
            buffer[i + 1] = 0;
        }

        this.setFeatureReport(location, buffer);
    }

    /**
     * Sets the infoblock1 with specified string.
     * It fills the rest of bytes with zeros.
     *
     * Usage:
     *
     * @example
     *     setInfoBlock1("abcdefg", function(err) {
     *     });
     *
     * @method setInfoBlock1
     * @param {String} data Data value for InfoBlock
     * @param {Function} callback Callback when the operation completes
     */
    public setInfoBlock1(data: string): void {
        this.setInfoBlock(0x0002, data);
    };




    /**
     * Sets the infoblock2 with specified string.
     * It fills the rest of bytes with zeros.
     *
     * Usage:
     *
     * @example
     *     setInfoBlock2("abcdefg", function(err) {
     *     });
     *
     * @method setInfoBlock2
     * @param {String} data Data value for InfoBlock
     * @param {Function} callback Callback when the operation completes
     */
    public setInfoBlock2(data: string) {
        this.setInfoBlock(0x0003, data);
    };



    /**
     * Turns the LED off.
     *
     * @method turnOff
     */
    public turnOff() {
        this.setColor(new Color(0, 0, 0));
    };


    /**
     * Determines report ID and number of LEDs for the report
     *
     * @private
     * @method determineReportId
     * @return {object} data.reportId and data.ledCount
    */
    private determineReportId(ledCount: number): { reportId: number, maxLeds: number } {
        if (ledCount < 8) {
            return { reportId: 6, maxLeds: 8 };
        } else if (ledCount < 16) {
            return { reportId: 7, maxLeds: 16 };
        } else if (ledCount < 32) {
            return { reportId: 8, maxLeds: 32 };
        } else {
            return { reportId: 9, maxLeds: 64 };
        }
    }

    /**
    * Set feature report to the device.
    *
    * @method setFeatureReport
    * @param {Number} reportId Report ID to receive
    * @param {Array} data Data to send to the device
    * @param {Function} callback Function called when report sent
    */
    public setFeatureReport(reportId: number, data: number[] | Buffer): number {
        var error: any;

        for (var tries = 0; tries < 5; tries++) {
            try {
                return this.device.sendFeatureReport(data);
            } catch (ex) {
                if (typeof (error) === 'undefined') {
                    //Store only the first error
                    error = ex;
                }
            }
        };

        throw Error(error);
    };




    /**
    * Get feature report from the device.
    *
    * @method getFeatureReport
    * @param {Number} reportId Report ID to receive
    * @param {Number} length Expected length of the report
    */
    public getFeatureReport(reportId: number, length: number): number[] {
        var error: any;

        for (var tries = 0; tries < 5; tries++) {
            try {
                return this.device.getFeatureReport(reportId, length);
            } catch (ex) {
                console.error(ex);
                if (typeof (error) === 'undefined') {
                    //Store only the first error
                    error = ex;
                }
            }
        };

        throw Error(error);
    };


}


/**
 * Generate random integer number within a range.
 *
 * @private
 * @static
 * @method randomIntInc
 * @param {Number} low the low value of the number
 * @param {Number} high the high value of the number
 * @return {Number} Random number in the range of [low..high] inclusive of low and high
 */
function randomIntInc(low: number, high: number) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

/**
 * Get default value from options
 *
 * @private
 * @static
 * @method opt
 * @param {Object} options Option object to operate on
 * @param {String} name The name of the parameter
 * @param {Object} defaultValue Default value if name is not found in option object
 */
function opt(options: any, name: string, defaultValue: any) {
    return options && name in options ? options[name] : defaultValue;
}



