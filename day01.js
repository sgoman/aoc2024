'use strict'

const parseInput = input => {
    return input.split('\n').map(l => l.match(/\d+/g).map(Number))
}

const solve = (isPart2, input) => {
    return input
}

const part1 = input => {
    input = parseInput(input)
    let left = input.map(r => r[0]).sort()
    let right = input.map(r => r[1]).sort()
    return left.reduce((acc, cur, i) => acc + Math.abs(cur - right[i]), 0)
}

const part2 = input => {
    input = parseInput(input)
    let left = input.map(r => r[0])
    let right = input.map(r => r[1])
    return left.reduce((acc, cur) => acc + (cur * right.filter(f => f == cur).length), 0)
}

module.exports = { part1, part2 }
