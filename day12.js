'use strict'

const { fourWayDeltas, gridCells, getSurrounding, validCoordForGrid } = require('./utils.js')

const parseInput = input => input.split('\n').map(l => l.split(''))

const countCorners = (grid, row, col) =>
  [0, 1, 2, 3]
    .map(d => [fourWayDeltas[d], fourWayDeltas[(d + 1) % 4]])
    .map(([[dr1, dc1], [dr2, dc2]]) => [
      grid[row][col],
      validCoordForGrid(row + dr1, col + dc1, grid) ? grid[row + dr1][col + dc1] : null,
      validCoordForGrid(row + dr2, col + dc2, grid) ? grid[row + dr2][col + dc2] : null,
      validCoordForGrid(row + dr1 + dr2, col + dc1 + dc2, grid) ? grid[row + dr1 + dr2][col + dc1 + dc2] : null
    ])
    .filter(([plot, left, right, mid]) => (left !== plot && right !== plot) || (left === plot && right === plot && mid !== plot))
    .length

const floodFill = (grid, {row, col, tile}, visited, fences, corners) => {
    if (visited.has(`${row},${col}`)) return [visited, fences]
    visited.add(`${row},${col}`)
    const buddies = getSurrounding(grid, row, col, fourWayDeltas).filter(t => t.tile == tile)
    fences.push(4 - buddies.length)
    corners.push(countCorners(grid, row, col))
    for(const buddy of buddies) [visited, fences] = floodFill(grid, buddy, visited, fences, corners)
    return [visited, fences, corners]
}

const solve = (part, input) => {
    let visited = new Set()
    const groups = gridCells(input).reduce((acc, {row, col, value}) => {
	if (visited.has(`${row},${col}`)) return acc
	const flood = floodFill(input, {row, col, tile: value}, visited, [], [])
	visited = flood[0]
	return [...acc, [flood[1], flood[2]]]
    }, [])
    return groups.reduce((total, group) => total + group[part].length * group[part].reduce((acc, cur) => acc + cur, 0), 0)
}

const part1 = input => solve(0, parseInput(input))

const part2 = input => solve(1, parseInput(input))

module.exports = { part1, part2 }
