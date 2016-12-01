/**
 * @param {number} num
 * @return {number}
 */
var addDigits = function(num) {
    let result = num % 9;
    return !result && num ? 9 : result;
};