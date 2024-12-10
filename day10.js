'use strict'

const { getSurrounding, fourWayDeltas } = require('./utils.js')

const parseInput = input => input.split('\n').map(l => l.split('').map(Number))

const trails = (grid, nextHeight, path, targets, isPart2) => {
    const [row, col] = path[path.length - 1]
    const steps = getSurrounding(grid, row, col, fourWayDeltas).filter(s => s.tile == nextHeight)
    for (const step of steps) {
        if (nextHeight == 9) {
            // part 1 targets mountain peaks, part 2 the paths to reach them
            targets.add(isPart2 ? [...path, [step.row, step.col]].map(([r, c]) => `${r},${c}`).join(':') : `${step.row},${step.col}`)
        } else {
            // my version of node does not know about the union method...
            [...trails(grid, nextHeight + 1, [...path, [step.row, step.col]], targets, isPart2)].forEach(summit => targets.add(summit))
        }
    }
    return targets
}

// a new one for the utils.js :)
const filterGrid = (grid, filterCallback) => grid.reduce((cells, line, row) => {
    const filtered = line.map((value, col) => {return {row, col, value}}).filter(filterCallback)
    return filtered.length ? [...cells, ...filtered] : cells
}, [])

const solve = (isPart2, input) => {
    input = parseInput(input)
    return filterGrid(input, ({value}) => value == 0).reduce((score, {row, col}) => score + trails(input, 1, [[row, col]], new Set(), isPart2).size, 0)
}

const part1 = input => solve(false, input)

const part2 = input => solve(true, input)

module.exports = { part1, part2 }
