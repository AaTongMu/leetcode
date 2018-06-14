/**
 * initialize your data structure here.
 */
var MinStack = function() {
    this._stack = [];
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    this._stack.push(x);
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    this._stack.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    const len = this._stack.length;
    if (!len) return null;
    return this._stack[this._stack.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    let result = this._stack[0];
    if (Number.isNaN(result)) return null; 
    this._stack.forEach(item => {
        if (!Number.isNaN(item) && item < result) result = item;
    });

    return result;
};

/** 
 * Your MinStack object will be instantiated and called as such:
 * var obj = Object.create(MinStack).createNew()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */