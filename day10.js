'use strict'

const { getSurrounding, fourWayDeltas } = require('./utils.js')

const parseInput = input => input.split('\n').map(l => l.split('').map(Number))

const trails = (grid, row, col, target, path, summits) => {
	const steps = getSurrounding(grid, row, col, fourWayDeltas).filter(s => s.tile == target)
	console.log({row, col, target, steps, summits: summits.size})
	for (const step of steps) {
		const coord = `${step.row},${step.col}`
		if (target == 9) {
			summits.add(coord)
		} else {
			console.log({target, row: step.row, col: step.col, summits: summits.size})
			for(const summit of [...trails(grid, step.row, step.col, target + 1, [...path, [row, col]], summits)])
				summits.add(summit)
		}
	}
	console.log({summits: summits.size})
	return summits
}

const solve = (isPart2, input) => {
	input = parseInput(input)
	let score = 0
	for(let row = 0; row < input.length; row++) {
		for(let col = 0; col < input[row].length; col++) {
			if (input[row][col] == 0) {
				score += trails(input, row, col, 1, [[row, col]], new Set()).size
			}
		}
	}
    return score
}

const part1 = input => solve(false, input)

const part2 = input => solve(true, input)

module.exports = { part1, part2 }
