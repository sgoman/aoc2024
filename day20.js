'use strict'

const { fourWayDeltas, gridCells, gridClone, getSurrounding, manhattan } = require('./utils.js')

const parseInput = input => input.split('\n').map(l => l.split(''))

const raceDistance = (grid, startRow, startCol) => {
    const hash = (r, c) => `${r},${c}`
    const seen = new Set(), queue = [[startRow, startCol, 0]], tileDistances = {}
    seen.add(hash(startRow, startCol))
    tileDistances[hash(startRow, startCol)] = 0
    while (queue.length) {
        const [r, c, step] = queue.shift()
        for (const { row, col, tile } of getSurrounding(grid, r, c, [[1, 0], [0, 1], [-1, 0], [0, -1]])) {
            if (!seen.has(hash(row, col)) && tile != '#') {
                queue.push([row, col, step + 1])
                seen.add(hash(row, col))
		tileDistances[hash(row, col)] = step + 1
            }
        }
    }
    return tileDistances
}

const solve = (input, maxSkip) => {
    const goal = gridCells(input).filter(c => c.value == 'E')[0]
    const originalDistances = raceDistance(input, goal.row, goal.col)
    let shortcuts = 0
    const tiles = Object.keys(originalDistances)
    for (let i = 0; i < tiles.length - 1; i++) {
	for (let j = i + 1; j < tiles.length; j++) {
	    const start = tiles[i].split(',').map(Number)
	    const end = tiles[j].split(',').map(Number)
	    const dist = manhattan(start, end)
	    if (dist <= maxSkip && originalDistances[tiles[j]] - originalDistances[tiles[i]] - dist >= 100) shortcuts++
	}
    }
    return shortcuts
}

const part1 = input => solve(parseInput(input), 2)

const part2 = input => solve(parseInput(input), 20)

module.exports = { part1, part2 }
