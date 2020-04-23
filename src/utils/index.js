import moment from 'moment';
import _ from 'lodash';
import mobile from 'is-mobile';
import crypto from 'crypto';

/** @description Format phone number
 * @param {string} phone Plain phone number. eg. 5555555555
 * @return {string} Formatted phone. eg. (555) 555-5555
 */
export function formatPhoneNumber(phone) {
    if (!phone)
        return "";
    var s2 = ("" + phone.trim()).replace(/\D/g, '');
    var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
}

/** @description Format currency
 * @param {number} value Number or string. eg. 1500.22 or "1500.22"
 * @return {string} formatted currency
 */
export function formatMoney(value) {
    value = parseFloat(value.toString());
    return value.toFixed(2);
}

/** @description Format date
 * @param {object} date Date or string date
 * @param {string} format If provided, formats the date using the pattern provided. eg. MM/DD/YY (default: MMM Do)
 * @return {string} Formatted date
 */
export function formatDate(date, format) {
    if (date === undefined)
        return 'Not Provided';

    if (typeof (date) !== typeof (Date))
        date = moment(date);

    if (format)
        return date.format(format);

    return date.format('MMM Do');
}

/** @description Validate email address
 * @param {string} email Email address
 * @return {boolean} True if valid
 */
export function isValidEmail(email) {
    if (email === null) return false;
    return (/^\w+([-+.']\w+)*@\w+\.(com$|edu$|mil$|org$|net$|int$|gov$|arpa$|mx$|us$|fr$|br$|biz$|ca$)/).test(email.toLowerCase());
}

/** @description Return true if mobile device
 * @return {boolean} True if is mobile
 */
export function isSmallScreen() {
    return mobile();
}

/** @description Capitalize string
 * @param {string} text Text to capitalize. eg. ricardo goncalves
 * @return {string} Capitalized text. eg. Ricardo Goncalves
 */
export function capitalize(text) {
    if (!text)
        return text;
    var words = text.trim().split(' ');
    return _.map(words, word => {
        if (word.length > 0 && word.length > 2) {
            return `${word.substr(0, 1).toUpperCase()}${word.substr(1).toLowerCase()} `;
        }
    }).join('');
}

/** @description Create a console log line with color (only logs if in development mode)
 * @param {object} message A single object or an array of objects
 * @param {string} textColor css color for text. eg: #8FC31F (default: rgb(0,128,0))
 * @param {string} backgroundColor css color for text. eg: #8FC31F (default: rgb(223,255,223))
 */
export function logWithColor(message, textColor, backgroundColor) {
    if (JSON.stringify(message).includes('Build') || isDevelopment())
        console.log(`%c ${JSON.stringify(message, null, 2)}`, `background-color: ${backgroundColor || 'rgb(223,255,223)'}; color: ${textColor || 'rgb(0,128,0)'}`);
}

/** @description Return true if development environment  
 * @return {boolean}
 */
export function isDevelopment() {
    return window.location.hostname === 'localhost';
}

/** @description Find item in array and update. If not there, adds it  
 * @param {array} array Array of objects
 * @param {object} value New object
 * @return New array
 */
export function findAndReplace(array, value) {
    if (!value)
        return array;
    var index = _.findIndex(array, { id: value.id });
    if (index === -1) {
        array.push(value);
    } else {
        array.splice(index, 1, value);
    }
    return array;
}

/** @description Return true if condition was found inside array items 
 * @param {array} array Array of objects
 * @param {object} condition Condition
 * @return Boolean
 */
export function any(array, condition) {
    return _.findIndex(array, condition) > -1;
}

/** @description Check if string is a valid date 
 * @param {string} date Date
 * @return Boolean
 */
export function isDate(date) {
    return moment(date).isValid();
}

/** @description Wait n milliseconds
 * @param {number} time Time in milliseconds to wait
 * @return {object} Promise. Use like sleep(5000).then(() => { do whatever you wamt here })
 */
export function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

/** @description Open page in a new tab
 * @param {string} url Url
  */
export function openLink(url) {
    window.open(url || "#", "External Link", `height=${window.screen.height}&width=${window.screen.width}`);
}

const hash = crypto.createHash('sha256');
/** @description Create a browser fingerprint
 * @return Fingerprint
  */
export function createFingerprint() {
    const { navigator, screen } = window;
    var guid = '';
    guid += navigator.userAgent.replace(/\W+/g, '');
    guid += navigator.plugins.length;
    guid += navigator.mimeTypes.length;
    guid += screen.height || '';
    guid += screen.width || '';
    guid += screen.pixelDepth || '';
    return hash.update(guid).digest('hex');
}

/** @description Create a random id
 * @return Id
  */
export function generateRandomId() {
    return parseInt(Math.random() * 1000 + 1);
}

/** @description Compares two arrays to see if they are equal
 * @param {Array} array1 First array
 * @param {Array} array2 Second array
 * @return {Boolean} true if they are equal
 */
export function areEqual(array1, array2) {
    if (array1.length === 0 && array2.length === 0)
        return true;

    let diff = _.xor(array1, array2);
    return diff.length === 0;
}