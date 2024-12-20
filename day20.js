'use strict'

const { fourWayDeltas, gridCells, getSurrounding, manhattan } = require('./utils.js')

const parseInput = input => input.split('\n').map(l => l.split(''))

const raceDistance = (grid, startRow, startCol) => {
    const hash = (r, c) => `${r},${c}`
    const queue = [[startRow, startCol, 0]], tileDistances = new Map()
    tileDistances.set(hash(startRow, startCol), 0)
    while (queue.length) {
        const [r, c, step] = queue.shift()
        for (const { row, col, tile } of getSurrounding(grid, r, c, fourWayDeltas)) {
            if (!tileDistances.has(hash(row, col)) && tile != '#') {
                queue.push([row, col, step + 1])
		tileDistances.set(hash(row, col), step + 1)
            }
        }
    }
    return tileDistances
}

const solve = (grid, maxSkip, minSaving) => {
    const goal = gridCells(grid).filter(c => c.value == 'E')[0]
    const originalDistances = raceDistance(grid, goal.row, goal.col)
    return [...originalDistances.keys()].reduce((shortcuts, from, i, tiles) => {
	const start = from.split(',').map(Number)
	return shortcuts + tiles.slice(i + minSaving).filter(to => {
	    const end = to.split(',').map(Number)
	    const dist = manhattan(start, end)
	    return dist <= maxSkip && originalDistances.get(to) - i - dist >= minSaving
	}).length
    }, 0)
}

const part1 = input => solve(parseInput(input), 2, 100)

const part2 = input => solve(parseInput(input), 20, 100)

module.exports = { part1, part2 }
