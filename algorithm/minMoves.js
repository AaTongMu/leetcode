/**
 * @param {number[]} nums
 * @return {number}
 */
var minMoves = function(nums) {
    if (nums.length === 1) return 0;
    
    nums.sort(function (a, b) {
        return a - b;
    });
    let count = 0;
    const minNum = nums[0];
    const subNums = nums.slice(1);
    subNums.forEach(function (num) {
        count += num - minNum;
    });
    
    return count;
};