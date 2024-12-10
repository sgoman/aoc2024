'use strict'

const { getSurrounding, fourWayDeltas } = require('./utils.js')

const parseInput = input => input.split('\n').map(l => l.split('').map(Number))

const trails = (grid, nextHeight, path, targets, isPart2) => {
    const [row, col] = path[path.length - 1]
    const steps = getSurrounding(grid, row, col, fourWayDeltas).filter(s => s.tile == nextHeight)
    for (const step of steps) {
        if (nextHeight == 9) {
            // part 1 targets mountain peaks, part 2 the paths to reach them
            const coords = isPart2 ? [...path, [step.row, step.col]].map(([r, c]) => `${r},${c}`).join(':') : `${step.row},${step.col}`
            targets.add(coords)
        } else {
            // my version of node does not know about the union method...
            for(const summit of [...trails(grid, nextHeight + 1, [...path, [step.row, step.col]], targets, isPart2)])
                targets.add(summit)
        }
    }
    return targets
}

const solve = (isPart2, input) => {
    input = parseInput(input)
    let score = 0
    for(let row = 0; row < input.length; row++) {
        for(let col = 0; col < input[row].length; col++) {
            if (input[row][col] == 0) {
                score += trails(input, 1, [[row, col]], new Set(), isPart2).size
            }
        }
    }
    return score
}

const part1 = input => solve(false, input)

const part2 = input => solve(true, input)

module.exports = { part1, part2 }
