'use strict'

const { fourWayDeltas } = require('./utils.js')

const parseInput = input => input.split('\n').map(l => [l, Number(l.replace('A', ''))])

const numpad = {'7': [0, 0], '8': [0, 1], '9': [0, 2], '4': [1, 0], '5': [1, 1], '6': [1, 2], '1': [2, 0], '2': [2, 1], '3': [2, 2], ' ': [3, 0], '0': [3, 1], 'A': [3, 2]}

const dirpad = {' ': [0, 0], '^': [0, 1], 'A': [0, 2], '<': [1, 0], 'v': [1, 1], '>': [1, 2]}

const hash = (a, b) => `${a},${b}`

const getSequences = (pad, a, b) => {
    const queue = [[...pad[a], '']]
    const distances = new Map()
    let paths = []
    while (queue.length) {
        const [row, col, path] = queue.shift()
        if (row == pad[b][0] && col == pad[b][1]) paths.push(path + 'A')
        const dist = hash(row, col)
        if (distances.has(dist) && distances.get(dist) < path.length) continue
        fourWayDeltas.forEach(([dr, dc], i) => {
            const button = '^>v<'[i]
            const [nr, nc] = [row + dr, col + dc]
            const nextPos = hash(nr, nc)
            if (nr == pad[' '][0] && nc == pad[' '][1]) return;
            if ([...Object.values(pad)].map(([r, c]) => hash(r, c)).includes(nextPos)) {
                if (!distances.has(nextPos) || distances.get(nextPos) >= path.length + 1) {
                    distances.set(nextPos, path.length + 1)
                    queue.push([nr, nc, path + button])
                }
            }
        })
    }
    paths.sort((u, v) => u.length - v.length)
    return paths
}

const solve = (pad, buttons, depth, cache) => {
    const key = `${buttons},${depth}`
    if (cache.has(key)) return cache.get(key)
    let len = 0, current = 'A'
    for (const button of buttons.split('')) {
        const sequences = getSequences(pad, current, button)
        len += (depth == 0) ? sequences[0].length : Math.min(...sequences.map(presses => solve(dirpad, presses, depth - 1, cache)))
        current = button
    }
    cache.set(key, len)
    return len
}

const part1 = input => parseInput(input).reduce((sum, [buttons, value]) => sum + solve(numpad, buttons, 2, new Map()) * value, 0)

const part2 = input => parseInput(input).reduce((sum, [buttons, value]) => sum + solve(numpad, buttons, 25, new Map()) * value, 0)

module.exports = { part1, part2 }
