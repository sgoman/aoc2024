'use strict'

const parseInput = input => input.split('\n\n').map(block => block.match(/\d+/g).map(Number))

const solve = (isPart2, input) => input.reduce((tokens, [xa, ya, xb, yb, xp, yp]) => {
    if (isPart2) [xp, yp] = [xp + 10000000000000, yp + 10000000000000]
    const d = xa * yb - ya * xb
    if (d == 0) return tokens
    const a = (xp * yb - yp * xb) / d
    const b = (yp * xa - xp * ya) / d
    if (a >= 0 && b >= 0 && a == Math.floor(a) && b == Math.floor(b))
        tokens += a * 3 + b
    return tokens
}, 0)

const part1 = input => solve(false, parseInput(input))

const part2 = input => solve(true, parseInput(input))

module.exports = { part1, part2 }
