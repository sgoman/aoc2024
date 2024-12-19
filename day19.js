'use strict'

const parseInput = input => {
    let [available, desired] = input.replace(/ /g, '').split('\n\n')
    return [available.split(','), desired.split('\n')]
}

const solve = (isPart2, [available, desired]) => {
    available.sort((a, b) => b.length - a.length)
    const cache = new Map()
    const canBuild = (design, available) => {
        if (design.length == 0) return 1
        if (cache.has(design)) return cache.get(design)
        let count = 0
        for (const pattern of available.filter(a => design.indexOf(a) == 0)) {
            count += canBuild(design.replace(pattern, ''), available)
        }
        cache.set(design, count)
        return count
    }

    return desired.reduce((possible, design, i) => {
        console.log({i, possible, design})
        if (isPart2) {
            return possible + canBuild(design, available)
        } else {
            return possible + (canBuild(design, available) > 0 ? 1 : 0)
        }
    }, 0)
    return {available, desired}
}

const part1 = input => {
    return solve(false, parseInput(input))
}

const part2 = input => {
    return solve(true, parseInput(input))
}

module.exports = { part1, part2 }
