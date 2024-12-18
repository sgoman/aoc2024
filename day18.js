'use strict'

const { getSurrounding, gridToString } = require('./utils.js')

const parseInput = input => input.split('\n').map(l => l.match(/\d+/g).map(Number))

const solve = (isPart2, input, bytes, goalRow, goalCol) => {
    const grid = Array.from({length: goalRow + 1}, () => Array(goalCol + 1).fill('.'))
    for (let b = 0; b < bytes; b++) grid[input[b][1]][input[b][0]] = '#'
    const hash = (r, c) => `${r},${c}`
    const seen = new Set(), queue = [[0, 0, 0, [[0, 0]]]]
    seen.add(hash(0, 0))
    while (queue.length) {
        const [r, c, step, path] = queue.shift()
        if (r == goalRow && c == goalCol) {
            for (const [row, col] of path) grid[row][col] = 'O'
            console.log(gridToString(grid))
            console.log({pathLength: path.length, corrupted: gridToString(grid).replace(/[^#]/g, '').length})
            return step
        }
        for (const { row, col, tile } of getSurrounding(grid, r, c, [[1, 0], [0, 1], [-1, 0], [0, -1]])) {
            if (!seen.has(hash(row, col)) && tile == '.') {
                queue.push([row, col, step + 1, [...path, [row, col]]])
                seen.add(hash(row, col))
            }
        }
    }
    return -1
}

const part1 = input => solve(false, parseInput(input), 1024, 70, 70) // for the sample input, replace 1024, 70, 70 by 12, 6, 6!

const part2 = input => {
    return solve(true, parseInput(input))
}

module.exports = { part1, part2 }
