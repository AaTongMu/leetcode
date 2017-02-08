/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function(nums) {
    let result = 0;
    let concatArr = nums.join('').split(0);
    
    concatArr.forEach(function (item) {
        if (item.length > result) {
            result = item.length;
        }
    });
    
    return result;
};