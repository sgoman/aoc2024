'use strict'

const { getSurrounding, fourWayDeltas, gridCells } = require('./utils.js')

const parseInput = input => input.split('\n').map(l => l.split('').map(Number))

const trails = (grid, path, targetHashes, isPart2) => {
    const [row, col] = path[path.length - 1]

    return getSurrounding(grid, row, col, fourWayDeltas).filter(s => s.tile == grid[row][col] + 1)
        .reduce((targets, step) => {
            if (step.tile == 9)
                // part 1 targets mountain peaks, part 2 the paths to reach them
                targets.add(isPart2 ? [...path, [step.row, step.col]].map(([r, c]) => `${r},${c}`).join(';') : `${step.row},${step.col}`)
            else
                // my old version of node does not know about the union method of sets...
                [...trails(grid, [...path, [step.row, step.col]], targets, isPart2)].forEach(target => targets.add(target))
            return targets
        }, targetHashes)
}

const solve = (isPart2, input) => {
    input = parseInput(input)
    return gridCells(input)
        .filter(cell => cell.value == 0)
        .reduce((score, {row, col}) => score + trails(input, [[row, col]], new Set(), isPart2).size, 0)
}

const part1 = input => solve(false, input)

const part2 = input => solve(true, input)

module.exports = { part1, part2 }
