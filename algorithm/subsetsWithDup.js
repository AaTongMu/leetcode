/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function(nums) {
    let result = [[]];
    let obj = {};
    
    nums.sort();
    
    nums.forEach(function (item, idx) {
        result.forEach(function (rItem, rIdx) {
            let tempArr = rItem.concat();
            tempArr.push(item);
            
            let tempArrStr = tempArr.join('|');
            if (!obj[tempArrStr]) {
                result.push(tempArr);
                obj[tempArrStr] = true;
            }
        });
    });
    
    return result;
    
};