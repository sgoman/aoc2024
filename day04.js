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

const part1 = input => {
    input = parseInput(input)
    let total = 0

    for (let r = 0; r < input.length; r++) {
        for (let c = 0; c < input.length; c++) {
            for (const delta of eightWayDeltas) total += countXmas(r, c, delta, input)
        }
    }
    return total
}

const part2 = input => {
    input = parseInput(input)
    let total = 0

    for (let r = 1; r < input.length - 1; r++) {
        for (let c = 1; c < input.length - 1; c++) {
            if (input[r][c] == 'A') {
                const [tl, tr, bl, br] = getSurroundingGridTiles(input, r, c, [[-1, -1], [-1, 1], [1, -1], [1, 1]])
                if (((tl == 'M' && br == 'S') || (tl == 'S' && br == 'M'))
                    &&
                    ((tr == 'M' && bl == 'S') || (tr == 'S' && bl == 'M'))) total++
            }
        }
    }
    return total
}

module.exports = { part1, part2 }
