/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function(s) {
    let obj = {};
    for (let character of s) {
        if (obj[character]) {
            obj[character]++;
        } else {
            obj[character] = 1;
        }
    }

    let unique = []
    Object.keys(obj).forEach((item) => {
        obj[item] === 1 && unique.push(item);
    });

    let idx = 0;
    for (let character of s) {
        if (unique.indexOf(character) !== -1) {
            return idx;
        }
        idx++;
    }
    
    return -1;
};