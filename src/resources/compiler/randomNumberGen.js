/**
 * Chooses a random number between the min and max.
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
function randomNumberGen(min, max) {
    // swap if min is larger
    if (min > max) {
        let _v = max;
        max = min;
        min = _v;
    }
    // math
    const difference = max - min;
    const random = Math.random() * difference;
    return min + random;
};