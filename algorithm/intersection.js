/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function(nums1, nums2) {
    let result = [];
    
    nums1.forEach(function (num) {
        const idx = nums2.indexOf(num);
        if (idx !== -1) {
            result.push(num);
            nums2.splice(idx, 1);
        }
    });

    return [...new Set(result)];
};