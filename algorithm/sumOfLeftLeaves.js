/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumOfLeftLeaves = function(root) {
    if (!root) return 0;
    
    let count = 0;
    if (root.left && !root.left.left && !root.left.right) {
        count += root.left.val;
    }
    count += sumOfLeftLeaves(root.left);
    count += sumOfLeftLeaves(root.right);

    return count;
};