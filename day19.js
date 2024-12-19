'use strict'

const parseInput = input => {
    const [available, desired] = input.split('\n\n')
    return [available.split(', '), desired.split('\n')]
}

const solve = (isPart2, [available, desired]) => {
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
    return desired.reduce((possible, design) => possible + (isPart2 ? waysToBuild(design) : ~~(waysToBuild(design) > 0)), 0)
}

const part1 = input => solve(false, parseInput(input))

const part2 = input => solve(true, parseInput(input))

module.exports = { part1, part2 }
