/**
 * @param {string} s
 * @return {number}
 */
var titleToNumber = function(s) {
    let result = 0;
    const charArr = s.split('');
    const len = charArr.length;

    charArr.forEach(function (item, index) {
        const charCodeAt = item.charCodeAt() - 64;
        result += index === len - 1 ? charCodeAt : charCodeAt * Math.pow(26, len - 1 - index);
    });

    return result;
};