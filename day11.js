'use strict'

const parseInput = input => input.match(/\d+/g).map(Number)

const cache = new Map()

const blink = (stone, iterations) => {
    const key = `${stone}@${iterations}`
    if (cache.has(key)) return cache.get(key)

    const stoneString = '' + stone
    let result;

    if (iterations == 0) {
	result = 1
    } else if (stone == 0) {
	result = blink(1, iterations - 1)
    } else if (stoneString.length % 2 == 0) {
	result = blink(Number(stoneString.substring(0, stoneString.length >> 1)), iterations - 1)
	result += blink(Number(stoneString.substring(stoneString.length >> 1)), iterations - 1)
    } else {
	result = blink(stone * 2024, iterations - 1)
    }

    cache.set(key, result)
    return result
}

const solve = (iterations, input) => parseInput(input).map(stone => blink(stone, iterations)).reduce((total, len) => total + len, 0)

const part1 = input => solve(25, input)

const part2 = input => solve(75, input)

module.exports = { part1, part2 }
