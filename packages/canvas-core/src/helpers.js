import { v4 as uuid } from 'uuid';

/**
 * Wrap first element with the second one
 * @param {HTMLElement} $el
 * @param {HTMLElement} wrapper
 * @return HTMLElement
 */
export function wrapElement($el, wrapper) {
    $el.parentNode.insertBefore(wrapper, $el);
    wrapper.appendChild($el);
    return wrapper;
}

/**
 * Unwrap HTML element
 * @param {HTMLElement} $el
 * @return HTMLElement
 */
export function unwrapElement($el) {
    const $parent = $el.parentNode;
    while ($el.firstChild) $parent.insertBefore($el.firstChild, $el);
    $parent.removeChild($el);
}

/**
 * Throttle function
 * @param {Function} fn
 * @param {number} delay
 */
export function throttle(fn, delay = 200) {
    let throttle = null;
    return function () {
        if (throttle) {
            return;
        }
        throttle = setTimeout(function () {
            fn.apply(this, arguments);
            throttle = false;
        }, delay);
        fn.apply(this, arguments);
    };
}

/**
 * Debounce function
 * @param {Function} fn
 * @param {number} delay
 */
export function debounce(fn, delay = 200) {
    let timeout
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.call(this, ...args), delay);
    }
}

/**
 * Clamp number between in and max value
 * @param {number} num - value
 * @param {number} min - min value
 * @param {number} max - max value
 * @return {number}
 */
export function clamp(num, min, max) {
    return Math.max(Math.min(num, Math.max(min, max)), Math.min(min, max))
}

/**
 * Linear interpolation
 * @param start
 * @param end
 * @param amount
 * @return {number}
 */
export function lerp(start, end, amount) {
    return (1 - amount) * start + amount * end;
}

/**
 * Get random int number
 * @param min
 * @param max
 * @return {number}
 */
export function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate random hexadecimal color
 * @return {string} - random color
 */
export function generateRandomColor(){
    return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
}

/**
 * Generate Unique ID
 * @return {string}
 */
export function getUniqueID(){
    return uuid();
}

/**
 * Return distance between (x1, y1) and (x2, y2) points
 * @return {number}
 * @param point1
 * @param point2
 */
export function getDistance(point1, point2){
    return Math.hypot(point2.x - point1.x, point2.y - point1.y);
}
