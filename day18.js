'use strict'

const { gridInit, getSurrounding } = require('./utils.js')

const parseInput = input => input.split('\n').map(l => l.match(/\d+/g).map(Number))

const solve = (corruptions, goalRow, goalCol) => {
    const grid = gridInit(goalRow + 1, goalCol + 1, '.')
    for (const [c, r] of corruptions) grid[r][c] = '#'
    const hash = (r, c) => `${r},${c}` // that comma did cost me about 145 minutes...
    const seen = new Set(), queue = [[0, 0, 0]]
    seen.add(hash(0, 0))
    while (queue.length) {
        const [r, c, step] = queue.shift()
        if (r == goalRow && c == goalCol) return step
        for (const { row, col, tile } of getSurrounding(grid, r, c, [[1, 0], [0, 1], [-1, 0], [0, -1]])) {
            if (!seen.has(hash(row, col)) && tile == '.') {
                queue.push([row, col, step + 1])
                seen.add(hash(row, col))
            }
        }
    }
    return -1
}

const part1 = input => solve(parseInput(input).slice(0, 1024), 70, 70) // for the sample input, replace 1024, 70, 70 by 12, 6, 6!

const part2 = input => {
    const corruptions = parseInput(input)
    for (var c = corruptions.length; solve(corruptions.slice(0, c), 70, 70) == -1; c--) {}
    return corruptions[c].join(',')
}

module.exports = { part1, part2 }
