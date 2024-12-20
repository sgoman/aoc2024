'use strict'

const { fourWayDeltas, gridCells, gridClone, getSurrounding } = require('./utils.js')

const parseInput = input => input.split('\n').map(l => l.split(''))

const raceDistance = (grid, startRow, startCol, goalRow, goalCol) => {
    const hash = (r, c) => `${r},${c}`
    const seen = new Set(), queue = [[startRow, startCol, 0]]
    seen.add(hash(0, 0))
    while (queue.length) {
        const [r, c, step] = queue.shift()
        if (r == goalRow && c == goalCol) return step
        for (const { row, col, tile } of getSurrounding(grid, r, c, [[1, 0], [0, 1], [-1, 0], [0, -1]])) {
            if (!seen.has(hash(row, col)) && tile != '#') {
                queue.push([row, col, step + 1])
                seen.add(hash(row, col))
            }
        }
    }
    return -1
}

const solve = (isPart2, input) => {
    const start = gridCells(input).filter(c => c.value == 'S')[0]
    const goal = gridCells(input).filter(c => c.value == 'E')[0]
    const originalDistance = raceDistance(input, start.row, start.col, goal.row, goal.col)
    let shortcuts = 0
    for (const wall of gridCells(input).filter(c => c.value == '#' && c.row > 0 && c.col > 0 && c.row < input.length - 1 && c.col < input[0].length)) {
    // for (const wall of [{row: 1, col: 8}, {row: 7, col: 10}, {row: 8, col: 8}, {row: 7, col: 6}]) {
	const grid = gridClone(input)
	grid[wall.row][wall.col] = '.'
	const dist = raceDistance(grid, start.row, start.col, goal.row, goal.col)
	if (originalDistance - dist >= 100) {
	    shortcuts++
	    console.log({wall, dist, saved: originalDistance - dist, originalDistance, shortcuts})
	}
    }
    return shortcuts
}

const part1 = input => solve(false, parseInput(input))

const part2 = input => {
    return solve(true, parseInput(input))
}

module.exports = { part1, part2 }
