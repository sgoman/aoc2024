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
        if (state.has(`${r},${c},${d}`)) return [visited, 1]
        state.add(`${r},${c},${d}`)
        visited.add(`${r},${c}`)
        const nextTiles = getSurrounding(grid, r, c, [fourWayDeltas[d]])
        if (nextTiles.length == 0) return [visited, 0]
        if (nextTiles[0].tile == '#') {
            d = (d + 1) % 4
        } else {
            [r, c] = [nextTiles[0].row, nextTiles[0].col]
        }
    }
    return [visited, 0]
}

const part1 = input => {
    input = parseInput(input)
    const [r, c, d] = getStartParams(input)
    return walk(input, r, c, d)[0].size
}

const part2 = input => {
    input = parseInput(input)
    const [r, c, d] = getStartParams(input)

    return walk(input, r, c, d)[0]
        .keys()
        .map(pos => pos.split(',').map(Number))
        .reduce((loops, [row, col]) => {
            const grid = input.map(line => line.map(tile => tile))
            grid[row][col] = '#'
            return loops + walk(grid, r, c, d)[1]
        } , 0)
}

module.exports = { part1, part2 }
