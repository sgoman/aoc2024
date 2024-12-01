'use strict'

const parseInput = input => input.split('\n')
    .map(l => l.match(/\d+/g).map(Number))
    .reduce(([lc, rc], [l, r]) => [[...lc, l], [...rc, r]], [[], []])

const part1 = input => {
    let [left, right] = parseInput(input)
    left.sort()
    right.sort()
    return left.reduce((acc, cur, i) => acc + Math.abs(cur - right[i]), 0)
}

const part2 = input => {
    let [left, right] = parseInput(input)
    return left.reduce((acc, cur) => acc + (cur * right.filter(f => f == cur).length), 0)
}

module.exports = { part1, part2 }
