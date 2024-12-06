'use strict'

const { fourWayDeltas, validCoordForGrid, getSurrounding } = require('./utils.js')

const parseInput = input => input.split('\n').map(l => l.split(''))

const getStartParams = input => input.reduce((pos, line, r) => {
        const c = line.join('').search(/[v<>^]/g)
	return c != -1 ? [r, c, '^>v<'.indexOf(line[c])] : pos
    }, [-1, -1, -1])

const isLooping = grid => {
    let [r, c, d] = getStartParams(grid)
    const seen = new Set()
    while (validCoordForGrid(r, c, grid)) {
        if (seen.has(`${r},${c},${d}`)) return 1
        seen.add(`${r},${c},${d}`)
        const nextTiles = getSurrounding(grid, r, c, [fourWayDeltas[d]])
        if (nextTiles.length == 0) return 0
        const nextTile = nextTiles[0]
        if (nextTile.tile == '#') {
            d = (d + 1) % 4
        } else {
            [r, c] = [nextTile.row, nextTile.col]
        }
    }
    return 0
}

const solve = (isPart2, input) => {
    input = parseInput(input)
    let [r, c, d] = getStartParams(input)
    const seen = new Set()
    while (validCoordForGrid(r, c, input)) {
        seen.add(`${r},${c}`)
        const nextTiles = getSurrounding(input, r, c, [fourWayDeltas[d]])
        if (nextTiles.length == 0) break
        const nextTile = nextTiles[0]
        if (nextTile.tile == '#') {
            d = (d + 1) % 4
        } else {
            [r, c] = [nextTile.row, nextTile.col]
        }
    }
    if (!isPart2) return seen.size
    let loops = 0
    for (let row = 0; row < input.length; row++) {
        for (let col = 0; col < input[row].length; col++) {
            if (input[row][col] != '.') continue
            const grid = input.map(line => line.map(tile => tile))
            grid[row][col] = '#'
            loops += isLooping(grid)
	}
    }
    return loops
}

const part1 = input => solve(false, input)

const part2 = input => solve(true, input)

module.exports = { part1, part2 }
