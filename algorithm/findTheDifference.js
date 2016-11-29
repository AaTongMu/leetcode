/**
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
var findTheDifference = function(s, t) {
    const sortS = s.split('').sort();
    const sortT = t.split('').sort();
    let result = '';
    
    for (let i = 0, len = sortT.length; i < len; i++) {
        if (sortT[i] !== sortS[i]) {
            result = sortT[i];
            break;
        }
    }
    
    return result;
};