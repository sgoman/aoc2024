'use strict'

const { gridToString } = require('./utils.js')

const parseInput = input => input.split('\n').map(l => l.match(/-?\d+/g).map(Number))

const botString = bots => {
    const output = []
    for (let row = 0; row < 103; row++)
        output.push(new Array(101).fill(' '))
    for (const [x, y] of bots) output[y][x] = '#'
    return gridToString(output)
}

const solve = (width, height, turns, input) => {
    for (let i = 0; i < turns; i++) {
        input = input.map(([x, y, vx, vy]) => [(x + width + vx) % width, (y + height + vy) % height, vx, vy])
        const bots = botString(input)
        if (bots.search(/#{10}/) != -1) {
            console.log(bots)
            return i + 1
        }
    }
    return [
        [0, width >> 1, 0, height >> 1],
        [(width >> 1) + 1, width, 0, height >> 1],
        [0, width >> 1, (height >> 1) + 1, height],
        [(width >> 1) + 1, width, (height >> 1) + 1, height],
    ]
        .map(([minx, maxx, miny, maxy]) => input.filter(([x, y]) => x >= minx && y >= miny && x < maxx && y < maxy).length)
        .reduce((total, q) => total * q, 1)
}

const part1 = input => solve(101, 103, 100, parseInput(input))

const part2 = input => solve(101, 103, 1e6, parseInput(input))

module.exports = { part1, part2 }
