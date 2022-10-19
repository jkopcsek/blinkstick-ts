import * as usb from 'node-hid';
import { BlinkStick } from "./blinkstick";

const VENDOR_ID = 0x20a0;
const PRODUCT_ID = 0x41e5;

export class BlinkSticks {
    /**
     * Find first attached BlinkStick.
     *
     * @example
     *     var blinkstick = require('blinkstick');
     *     var led = blinkstick.findFirst();
     *
     * @static
     * @method findFirst
     * @return {BlinkStick|undefined} The first BlinkStick, if found.
     */
    public findFirst(): BlinkStick | undefined {
        const devices = this.findBlinkSticks();
        return devices ? devices[0] : undefined;
    }

    /**
     * Find all attached BlinkStick devices.
     *
     * @example
     *     var blinkstick = require('blinkstick');
     *     var leds = blinkstick.findAll();
     *
     * @static
     * @method findAll
     * @return {Array} BlinkSticks.
     */
    public findAll(): BlinkStick[] {
        return this.findBlinkSticks();
    }

    /**
     * Returns the serial numbers of all attached BlinkStick devices.
     *
     * @static
     * @method findAllSerials
     * @return {Array} Serial numbers.
     */
    public findAllSerials(): (string | undefined)[] {
        return this.findBlinkSticks().map((d) => d.serial);
    }

    /**
     * Find BlinkStick device based on serial number.
     *
     * @static
     * @method findBySerial
     * @param {Number} serial Serial number.
     * @param {Function} callback Callback when BlinkStick has been found
     */
    public findBySerial(serial: string): BlinkStick | undefined {
        return this.findBlinkSticks().find((d) => d.serial == serial);
    }

    /**
     * Find BlinkSticks using a filter.
     *
     * @method findBlinkSticks
     * @param {Function} [filter] Filter function.
     * @return {Array} BlickStick objects.
     */
    private findBlinkSticks(predicate: (value: usb.Device, index: number, array: usb.Device[]) => unknown = (v) => v): BlinkStick[] {
        return usb.devices()
            .filter((d) => d.vendorId == VENDOR_ID)
            .filter((d) => d.productId == PRODUCT_ID)
            .filter(predicate)
            .map((d) => new BlinkStick(d.path, d.serialNumber, d.manufacturer, d.product));
    }
}