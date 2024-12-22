'use strict'

const parseInput = input => input.split('\n').map(Number)

const evolve = secret => {
    secret ^= secret << 6 & 0xFFFFFF
    secret ^= secret >> 5 & 0xFFFFFF
    secret ^= secret << 11 & 0xFFFFFF
    return secret
}

const part1 = input => {
    input = parseInput(input)
    let iterations = 2000 
    while (iterations-- > 0) input = input.map(evolve)
    return input.reduce((sum, secret) => sum + secret, 0)
}

const part2 = input => {
    input = parseInput(input)
    const total = new Map()
    for (let secret of input) {
        const changes = [], seen = new Set()
        for (let i = 0; i < 2000; i++) {
            const one = secret % 10
            secret = evolve(secret)
            changes.push((secret % 10) - one)
            if (i >= 3) {
                const key = changes.slice(i - 3).join(',')
                if (!seen.has(key)) {
                    total.set(key, (total.has(key) ? total.get(key) : 0) + secret % 10)
                    seen.add(key)
                }
            }
        }
    }
    return Math.max(...total.values())
}

module.exports = { part1, part2 }
