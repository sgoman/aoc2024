'use strict'

const { eightWayDeltas, validCoordForGrid, getSurroundingGridTiles, gridCells } = require('./utils.js')

const parseInput = input => input.split('\n').map(l => l.split(''))

const countXmas = (r, c, [dr, dc], grid) => {
    const xmas = 'XMAS'
    for (let i = 0; i < 4; i++) {
        const nr = r + i * dr
        const nc = c + i * dc
        if (!validCoordForGrid(nr, nc, grid) || grid[nr][nc] !== xmas[i]) return 0
    }
    return 1
}

const solve = (isPart2, input) => gridCells(input)
    .reduce((total, {row, col, value}) => {
        if (isPart2) {
            if (value == 'A') {
                const corners = getSurroundingGridTiles(input, row, col, [[-1, -1], [-1, 1], [1, -1], [1, 1]])
                total += ['MMSS', 'SMSM', 'SSMM', 'MSMS'].includes(corners.join('')) ? 1 : 0
            }
        } else {
            for (const delta of eightWayDeltas) total += countXmas(row, col, delta, input)
        }
        return total
    }, 0)

const part1 = input => solve(false, parseInput(input))

const part2 = input => solve(true, parseInput(input))

module.exports = { part1, part2 }
