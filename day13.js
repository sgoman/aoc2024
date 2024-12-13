'use strict'

const parseInput = input => input.split('\n\n').map(block => block.match(/\d+/g).map(Number))

// cloned to utils.js for future uses
const cramerPosInt = (ax, ay, bx, by, x, y) => {
    const d = ax * by - ay * bx
    if (d == 0) return [0, 0]
    const a = (x * by - y * bx) / d
    const b = (y * ax - x * ay) / d
    if (a >= 0 && b >= 0 && a == Math.floor(a) && b == Math.floor(b))
        return [a, b]
    return [0, 0]
}

const solve = (isPart2, input) => input.reduce((tokens, [ax, ay, bx, by, tx, ty]) => {
    if (isPart2) [tx, ty] = [tx + 10000000000000, ty + 10000000000000]
    const [a, b] = cramerPosInt(ax, ay, bx, by, tx, ty)
    return tokens + a * 3 + b
}, 0)

const part1 = input => solve(false, parseInput(input))

const part2 = input => solve(true, parseInput(input))

module.exports = { part1, part2 }
