'use strict'

const parseInput = input => input.split('\n\n').map(block => block.match(/\d+/g).map(Number))

// cloned to utils.js for future uses
const cramer2 = (ax, ay, bx, by, tx, ty) => {
    const d = ax * by - ay * bx
    if (d == 0) return [0, 0]
    return [(tx * by - ty * bx) / d, (ty * ax - tx * ay) / d]
}

const solve = (isPart2, input) => input.reduce((tokens, [ax, ay, bx, by, tx, ty]) => {
    if (isPart2) [tx, ty] = [tx + 1e13, ty + 1e13]
    const [a, b] = cramer2(ax, ay, bx, by, tx, ty)
    if (a >= 0 && b >= 0 && a == Math.floor(a) && b == Math.floor(b))
        tokens += a * 3 + b
    return tokens
}, 0)

const part1 = input => solve(false, parseInput(input))

const part2 = input => solve(true, parseInput(input))

module.exports = { part1, part2 }
