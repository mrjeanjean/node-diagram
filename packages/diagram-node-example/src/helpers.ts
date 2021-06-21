/**
 * Get random int number
 * @param min
 * @param max
 * @return {number}
 */
export function getRandom(min:number, max:number):number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

