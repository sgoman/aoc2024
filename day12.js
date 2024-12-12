'use strict'

const { fourWayDeltas, gridCells, getSurrounding } = require('./utils.js')

const parseInput = input => input.split('\n').map(l => l.split(''))

const flooded = new Map()

const floodFill = (grid, {row, col, tile}, visited, fences) => {
    if (visited.has(`${row},${col}`)) return [visited, fences]
    visited.add(`${row},${col}`)
    const buddies = getSurrounding(grid, row, col, fourWayDeltas).filter(t => t.tile == tile)
    fences.push(4 - buddies.length)
    for(const buddy of buddies) [visited, fences] = floodFill(grid, buddy, visited, fences)
    return [visited, fences]
}

const solve = (isPart2, input) => {
    let visited = new Set()
    const groups = gridCells(input).reduce((acc, {row, col, value}) => {
	if (visited.has(`${row},${col}`)) return acc
	const flood = floodFill(input, {row, col, tile: value}, visited, [])
	visited = flood[0]
	return [...acc, flood[1]]
    }, [])
    return groups.reduce((total, group) => total + group.length * group.reduce((acc, cur) => acc + cur, 0), 0)
}

const part1 = input => {
    return solve(false, parseInput(input))
}

const part2 = input => {
    return solve(true, parseInput(input))
}

module.exports = { part1, part2 }
