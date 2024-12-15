'use strict'

const { gridCells, fourWayDeltas } = require('./utils.js')

const parseInput = input => input.split('\n\n').map(b => b.split('\n').map(l => l.split('')))

const solve = (isPart2, [grid, moves]) => {
    const dirs = '^>v<'
    if (isPart2) {
        for (let r = 0; r < grid.length; r++) {
            for (let c = grid[r].length - 1; c >= 0; c--) {
                if (grid[r][c] == '#') {
                    grid[r].splice(c, 0, '#')
                } else if (grid[r][c] == 'O') {
                    grid[r].splice(c, 1, '[', ']')
                } else if (grid[r][c] == '@' || grid[r][c] == '.') {
                    grid[r].splice(c, 1, grid[r][c], '.')
                }
            }
        }
    }
    let {row, col} = gridCells(grid).filter(c => c.value == '@')[0]
    grid[row][col] = '.'
    moves = moves.reduce((single, line) => [...single, ...line], [])
    for (const move of moves) {
        const [dr, dc] = fourWayDeltas[dirs.indexOf(move)]
        const changes = new Map()
        const moveChanges = (grid, row, col, dr, dc) => {
            if (grid[row + dr][col + dc] == '#') return false
            const offset = ']['.indexOf(grid[row + dr][col + dc]) * 2 - 1
            if (grid[row + dr][col + dc] == 'O' || (dc != 0 && offset != -3)) {
                if (!moveChanges(grid, row + dr, col + dc, dr, dc)) return false
            } else if(offset != -3) {
                if (!moveChanges(grid, row + dr, col + dc, dr, dc)) return false
                if (!moveChanges(grid, row + dr, col + offset, dr, dc)) return false
            }
            changes.set(`${row + dr},${col + dc}`, grid[row][col])
            if (!changes.has(`${row},${col}`)) changes.set(`${row},${col}`, '.')
            return true
        }

        if (moveChanges(grid, row, col, dr, dc)) {
            for (let key of changes.keys()) {
                let [nr, nc] = key.split(',').map(Number)
                grid[nr][nc] = changes.get(key)
            }
            [row, col] = [row + dr, col + dc]
        }
    }
    return gridCells(grid)
        .filter(c => c.value == 'O' || c.value == '[')
        .reduce((score, {row, col}) => score + 100 * row + col, 0)
}

const part1 = input => solve(false, parseInput(input))

const part2 = input => solve(true, parseInput(input))

module.exports = { part1, part2 }
