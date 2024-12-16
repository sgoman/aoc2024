'use strict'

const { fourWayDeltas, gridCells, validCoordForGrid } = require('./utils.js')

const parseInput = input => input.split('\n').map(l => l.split(''))

const hash = (r, c, d) => `${r},${c},${d}`

const solve = (isPart2, input) => {
    const best = isPart2 ? solve(false, input) : 1e12
    const start = gridCells(input).filter(c => c.value == 'S')[0]
    const end = gridCells(input).filter(c => c.value == 'E')[0]
    const queue = [[start.row, start.col, 1, 0, [start]]]
    const visited = new Map()
    const paths = []
    while (queue.length) {
        if (!isPart2) queue.sort((a, b) => a[3] - b[3])
        const [row, col, dir, score, path] = queue.shift()
        const key = hash(row, col, dir)
        if (score > best) continue
        if (!isPart2 && visited.has(key)) continue
        if (isPart2 && visited.has(key) && visited.get(key) < score) continue
        visited.set(key, score)
        if (row == end.row && col == end.col) {
            if (!isPart2) return score
            paths.push(path)
            continue
        }
        const nr = row + fourWayDeltas[dir][0]
        const nc = col + fourWayDeltas[dir][1]
        if (validCoordForGrid(nr, nc, input) && input[nr][nc] != '#')
            queue.push([nr, nc, dir, score + 1, [...path, {row: nr, col: nc}]])
        for (const d of [(dir + 1) % 4, (dir + 3) % 4])
            queue.push([row, col, d, score + 1000, [...path]])
    }
    return isPart2 ? paths : 0
}

const part1 = input => solve(false, parseInput(input))

const part2 = input => solve(true, parseInput(input)).reduce((uniques, path) => {
    path.forEach(p => uniques.add(hash(p.row, p.col, 0)))
    return uniques
}, new Set()).size

module.exports = { part1, part2 }
