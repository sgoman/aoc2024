'use strict'

const { fourWayDeltas, gridCells, getSurrounding, manhattan } = require('./utils.js')

const parseInput = input => input.split('\n').map(l => l.split(''))

const raceDistance = grid => {
    const goal = gridCells(grid).filter(c => c.value == 'E')[0]
    const hash = (r, c) => `${r},${c}`
    const queue = [[goal.row, goal.col, 0]], tileDistances = new Map()
    tileDistances.set(hash(goal.row, goal.col), 0)
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

const solve = (originalDistances, maxSkip, minSaving) => [...originalDistances.entries()]
    .reduce((shortcuts, [from], i, tiles) => {
	const start = from.split(',').map(Number)
	return shortcuts + tiles.slice(i + minSaving).filter(([to, d]) => {
	    const end = to.split(',').map(Number)
	    const dist = manhattan(start, end)
	    return dist <= maxSkip && d - i - dist >= minSaving
	}).length
    }, 0)

const part1 = input => solve(raceDistance(parseInput(input)), 2, 100)

const part2 = input => solve(raceDistance(parseInput(input)), 20, 100)

module.exports = { part1, part2 }
