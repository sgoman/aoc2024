'use strict'

const { fourWayDeltas, validCoordForGrid, getSurrounding } = require('./utils.js')

const parseInput = input => input.split('\n').map(l => l.split(''))

const getStartParams = input => input.reduce((pos, line, r) => {
        const c = line.join('').search(/[v<>^]/g)
	return c != -1 ? [r, c, '^>v<'.indexOf(line[c])] : pos
    }, [-1, -1, -1])

const walk = (grid, r, c, d) => {
    const state = new Set(), visited = new Set()
    while (validCoordForGrid(r, c, grid)) {
        if (state.has(`${r},${c},${d}`)) return [visited.size, 1]
        state.add(`${r},${c},${d}`)
        visited.add(`${r},${c}`)
        const nextTiles = getSurrounding(grid, r, c, [fourWayDeltas[d]])
        if (nextTiles.length == 0) return [visited.size, 0]
        if (nextTiles[0].tile == '#') {
            d = (d + 1) % 4
        } else {
            [r, c] = [nextTiles[0].row, nextTiles[0].col]
        }
    }
    return [visited.size, 0]
}

const part1 = input => {
    input = parseInput(input)
    const [r, c, d] = getStartParams(input)
    return walk(input, r, c, d)[0]
}

const part2 = input => {
    input = parseInput(input)
    const [r, c, d] = getStartParams(input)
    let loops = 0
    for (let row = 0; row < input.length; row++) {
        for (let col = 0; col < input[row].length; col++) {
            if (input[row][col] != '.') continue
            const grid = input.map(line => line.map(tile => tile))
            grid[row][col] = '#'
            loops += walk(grid, r, c, d)[1]
	}
    }
    return loops
}

module.exports = { part1, part2 }
