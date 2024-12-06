'use strict'

const { fourWayDeltas, validCoordForGrid, getSurrounding } = require('./utils.js')
const parseInput = input => input.split('\n').map(l => l.split(''))

const solve = (isPart2, input) => {
    input = parseInput(input)
    let [r, c, d] = input.reduce((pos, line, r) => {
        const c = line.join('').search(/[v<>^]/g)
	return c != -1 ? [r, c, '^>v<'.indexOf(line[c])] : pos
    }, [-1, -1, -1])
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
    return seen.size
}

const part1 = input => solve(false, input)

const part2 = input => {
    return solve(true, input)
}

module.exports = { part1, part2 }
