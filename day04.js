'use strict'

const { eightWayDeltas, validCoordForGrid, getSurroundingGridTiles } = require('./utils.js')

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

const solve = (isPart2, input) => {
    input = parseInput(input)
    let total = 0

    for (let r = 0; r < input.length; r++) {
        for (let c = 0; c < input[0].length; c++) {
            if (isPart2) {
                if (input[r][c] == 'A') {
                    const corners = getSurroundingGridTiles(input, r, c, [[-1, -1], [-1, 1], [1, -1], [1, 1]])
                    total += ['MMSS', 'SMSM', 'SSMM', 'MSMS'].includes(corners.join('')) ? 1 : 0
                }
            } else {
                for (const delta of eightWayDeltas) total += countXmas(r, c, delta, input)
            }
        }
    }
    return total
}

const part1 = input => solve(false, input)

const part2 = input => solve(true, input)

module.exports = { part1, part2 }
