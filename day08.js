'use strict'

const { validCoordForGrid, pairs } = require('./utils.js')

const parseInput = input => input.split('\n').map(l => l.split(''))

const getAllAntennas = grid => {
    const antennas = {}
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] != '.') {
                if (!Object.hasOwn(antennas, grid[row][col])) antennas[grid[row][col]] = []
                antennas[grid[row][col]].push([row, col])
            }
        }
    }
    return antennas
}

const addAntinodes = (grid, antennas, antinodes, isPart2) => {
    if (antennas.length < 2) return antinodes
    for (const [a, b] of pairs(antennas)) {
        const offsetA = [a[0] - b[0], a[1] - b[1]]
        const offsetB = [b[0] - a[0], b[1] - a[1]]
        for (let [[row, col], [dRow, dCol]] of [[a, offsetA], [b, offsetB]]) {
            if (isPart2) antinodes.add(`${row},${col}`)
            let [nr, nc] = [row + dRow, col + dCol]
            while (validCoordForGrid(nr, nc, grid)) {
                antinodes.add(`${nr},${nc}`)
                if (!isPart2) break
                nr += dRow
                nc += dCol
            }
        }
    }
    return antinodes
}

const solve = (isPart2, input) => {
    input = parseInput(input)
    let antinodes = new Set()
    const allAntennas = getAllAntennas(input)
    for (const type in allAntennas) antinodes = addAntinodes(input, allAntennas[type], antinodes, isPart2)
    return antinodes.size
}

const part1 = input => solve(false, input)

const part2 = input => solve(true, input)

module.exports = { part1, part2 }
