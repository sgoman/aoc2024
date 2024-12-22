'use strict'

const parseInput = input => input.split('\n').map(Number)

const evolve = secret => {
    secret ^= secret << 6
    secret &= 0xFFFFFF
    secret ^= secret >> 5
    secret &= 0xFFFFFF
    secret ^= secret << 11
    secret &= 0xFFFFFF

    return secret
}

const solve = (isPart2, input, iterations) => {
    while (iterations-- > 0) {
        input = input.map(num => evolve(num))
    }
    return input.reduce((sum, secret) => sum + secret, 0)
}

const part1 = input => {
    return solve(false, parseInput(input), 2000)
}

const part2 = input => {
    return solve(true, parseInput(input))
}

module.exports = { part1, part2 }
