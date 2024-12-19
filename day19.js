'use strict'

const parseInput = input => {
    const [available, desired] = input.split('\n\n')
    return [available.split(', '), desired.split('\n')]
}

const solve = ([available, desired]) => {
    const cache = new Map()
    const waysToBuild = design => {
        if (design.length == 0) return 1
        if (cache.has(design)) return cache.get(design)
        const count = available
            .filter(a => design.indexOf(a) == 0)
            .reduce((total, pattern) => total + waysToBuild(design.replace(pattern, '')), 0)
        cache.set(design, count)
        return count
    }
    return desired.reduce(([p1, p2], design) => [p1 + ~~(waysToBuild(design) > 0), p2 + waysToBuild(design)], [0, 0])
}

const part1 = input => solve(parseInput(input))[0]

const part2 = input => solve(parseInput(input))[1]

module.exports = { part1, part2 }
