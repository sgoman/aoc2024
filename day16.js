'use strict'

const { fourWayDeltas, gridCells, validCoordForGrid, gridToString, arraySum } = require('./utils.js')

const parseInput = input => input.split('\n').map(l => l.split(''))

const gridClone = grid => grid.map(r => r.map(c => c))

const printGrid = (grid, steps, score) => {
    console.log({score})
    for (const [cost, r, c, d] of steps) grid[r][c] = '^>v<'[d]
    console.log(gridToString(grid))
}

const solve = (isPart2, input) => {
    const start = gridCells(input).filter(c => c.value == 'S')[0]
    const end = gridCells(input).filter(c => c.value == 'E')[0]
    let row = start.row, col = start.col
    input[row][col] = '.'
    input[end.row][end.col] = '.'

    const getMoves = (grid, row, col, dir) => {
        const moves = []
        for (const [d, cost] of [[dir, 1], [(dir + 1) % 4, 1001], [(dir + 3) % 4, 1001]]) {
            const nr = row + fourWayDeltas[d][0], nc = col + fourWayDeltas[d][1]
            if (validCoordForGrid(nr, nc, grid) && grid[nr][nc] == '.') moves.push([nr, nc, d, cost])
        }
        //console.log({row, col, dir, moves})
        return moves
    }

    const walk = (grid, row, col, dir, seen, steps, best) => {
        if (row == end.row && col == end.col) {
            const score = arraySum(steps.map(s => s[0]))
            if (score < best) printGrid(gridClone(grid), steps, score)
            return Math.min(best, score)
        }
        const pos = `${row}${col}`
        if (seen.includes(pos)) return best
        //console.log('seen length', seen.length)
        for (const [nr, nc, d, cost] of getMoves(grid, row, col, dir)) {
            best = Math.min(best, walk(grid, nr, nc, d, [...seen, pos], [...steps, [cost, nr, nc, d]], best))
        }
        return best
    }

    return walk(input, row, col, 1, [], [], 1e12)
}

const part1 = input => {
    return solve(false, parseInput(input))
}

const part2 = input => {
    return solve(true, parseInput(input))
}

module.exports = { part1, part2 }
