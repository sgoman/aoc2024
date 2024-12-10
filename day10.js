'use strict'

const { getSurrounding, fourWayDeltas } = require('./utils.js')

const parseInput = input => input.split('\n').map(l => l.split('').map(Number))

const trails = (grid, row, col, target, path, summits, isPart2) => {
	const steps = getSurrounding(grid, row, col, fourWayDeltas).filter(s => s.tile == target)
	for (const step of steps) {
		if (target == 9) {
			const coord = isPart2 ? [...path, [step.row, step.col]].map(([r, c]) => `${r},${c}`).join(':') : `${step.row},${step.col}`
			console.log({row, col, target, coord})
			summits.add(coord)
		} else {
			for(const summit of [...trails(grid, step.row, step.col, target + 1, [...path, [step.row, step.col]], summits, isPart2)])
				summits.add(summit)
		}
	}
	return summits
}

const solve = (isPart2, input) => {
	input = parseInput(input)
	let score = 0
	for(let row = 0; row < input.length; row++) {
		for(let col = 0; col < input[row].length; col++) {
			if (input[row][col] == 0) {
				score += trails(input, row, col, 1, [[row, col]], new Set(), isPart2).size
			}
		}
	}
    return score
}

const part1 = input => solve(false, input)

const part2 = input => solve(true, input)

module.exports = { part1, part2 }
