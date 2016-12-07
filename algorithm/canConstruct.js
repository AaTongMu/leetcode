/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function(ransomNote, magazine) {
    let magazineArr = magazine.split('');
    for (let val of ransomNote) {
        const idx = magazineArr.indexOf(val);
        if (idx === -1) {
            return false;
        } else {
            magazineArr[idx] = '';
        }
    }
    
    return true;
};