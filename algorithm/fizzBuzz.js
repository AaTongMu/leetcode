/**
 * @param {number} n
 * @return {string[]}
 */
var fizzBuzz = function(n) {
    let result = [];
    for (let i = 1; i <= n; i++) {
        let item = '';
        if (i % 3 === 0) item = 'Fizz';
        if (i % 5 === 0) item += 'Buzz';
        if (!item) item += i;
        result.push(item);
    }
    
    return result;
};