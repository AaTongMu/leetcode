/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    let result;
    const len = nums.length;
    
    if (len === 1) return nums[0];
    nums.sort();
    for (let i = len; i --;) {
        if ((i === 0 && nums[i] != nums[i + 1])
            || (i === len -1 && nums[i] !== nums[i - 1])
            || (nums[i] !== nums[i + 1] && nums[i] !== nums[i - 1])) {
            result = nums[i];
            break;
        }
    }
    
    return result;
};