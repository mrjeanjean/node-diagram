import {v4 as uuid} from 'uuid';
import {Point} from "../types";
import {themeColors} from "./theme-colors";

/**
 * Clamp number between in and max value
 * @param {number} num - value
 * @param {number} min - min value
 * @param {number} max - max value
 * @return {number}
 */
export function clamp(num: number, min: number, max: number): number {
    return Math.max(Math.min(num, Math.max(min, max)), Math.min(min, max))
}

/**
 * Linear interpolation
 * @param start
 * @param end
 * @param amount
 * @return {number}
 */
export function lerp(start: number, end: number, amount: number): number {
    return (1 - amount) * start + amount * end;
}

/**
 * Get random int number
 * @param min
 * @param max
 * @return {number}
 */
export function getRandom(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate random hexadecimal color
 * @return {string} - random color
 */
export const getRandomColor = (): string => {
    return '#' + Math.random().toString(16).substr(-6);
}

/**
 * Generate random hexadecimal color
 * @return {string} - random color
 */
export const getRandomThemeColor = (): string => {
    return Object.values(themeColors)[Math.floor(Math.random() * Object.values(themeColors).length)];
}

/**
 * Generate Unique ID
 * @return {string}
 */
export function getUniqueID(): string {
    return uuid();
}

/**
 * Return distance between (x1, y1) and (x2, y2) points
 * @return {number}
 * @param point1
 * @param point2
 */
export function getDistance(point1: { x: number, y: number }, point2: { x: number, y: number }): number {
    return Math.hypot(point2.x - point1.x, point2.y - point1.y);
}

/**
 * @return {SVGElement}
 */
export function createSVGElement(type: string) {
    return document.createElementNS('http://www.w3.org/2000/svg', type);
}

export function generateCurvedPath(startPoint: Point, endPoint: Point, isVertical = true, curvature = 0.35): string {

    const x1 = startPoint.x;
    const y1 = startPoint.y;
    const x2 = endPoint.x;
    const y2 = endPoint.y;

    if (!isVertical) {
        const hx1 = x1 + Math.abs(x2 - x1) * curvature;
        const hx2 = x2 - Math.abs(x2 - x1) * curvature;

        return `M ${x1} ${y1} C ${hx1} ${y1} ${hx2} ${y2} ${x2} ${y2}`;
    } else {
        const hy1 = y1 + Math.abs(y2 - y1) * curvature;
        const hy2 = y2 - Math.abs(y2 - y1) * curvature;

        return `M ${x1} ${y1} C ${x1} ${hy1} ${x2} ${hy2} ${x2} ${y2}`;
    }
}

/**
 * Add css class for transition
 * @param {HTMLElement | SVGElement} $element
 * @param {string} transitionType
 * @param {number} duration
 */
export function itemTransitionHelper($element:HTMLElement | SVGElement, transitionType:string, duration:number = 10):void{
    setTimeout(() => {
        $element.classList.add(`transition-${transitionType}`);
    }, duration);
}


export function rectIntersectPointY(rect:{top:number, bottom:number}, point:Point): boolean {
    return (point.y > rect.top && point.y < rect.bottom);
}

export function swapHTMLElements($node1: HTMLElement|null, $node2:HTMLElement|null):void {
    if(!$node1 || !$node2){
        return;
    }
    // create marker element and insert it where obj1 is
    const $temp = document.createElement("div");
    $node1.parentNode?.insertBefore($temp, $node1);

    // move $node1 to right before obj2
    $node2.parentNode?.insertBefore($node1, $node2);

    // move $node2 to right before where $node1 used to be
    $temp.parentNode?.insertBefore($node2, $temp);

    // remove $temporary marker node
    $temp.parentNode?.removeChild($temp);
}
