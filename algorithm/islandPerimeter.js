/**
 * @param {number[][]} grid
 * @return {number}
 */
var islandPerimeter = function(grid) {
    let perimeter = 0;
    grid.forEach(function (row, rIdx) {
        row.forEach(function (cell, cIdx) {
            if (!cell) return 0;
            if (!row[cIdx - 1]) perimeter++;
            if (!row[cIdx + 1]) perimeter++;
            if (!grid[rIdx - 1] || !grid[rIdx - 1][cIdx]) perimeter++;
            if (!grid[rIdx + 1] || !grid[rIdx + 1][cIdx]) perimeter++;
        });
    });
    return perimeter;
};