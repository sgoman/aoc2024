'use strict'

const parseInput = input => input.split('\n').reduce((graph, line) => {
    const [a, b] = line.split('-')
    if (!graph.has(a)) graph.set(a, new Set())
    if (!graph.has(b)) graph.set(b, new Set())
    graph.get(a).add(b)
    graph.get(b).add(a)
    return graph
}, new Map())

const solve = (isPart2, input) => {
    const trios = new Set()
    for (const [node, neighbours] of input) {
        const linked = Array.from(neighbours)
        for (let i = 0; i < linked.length; i++) {
            for (let j = i + 1; j < linked.length; j++) {
                const [a, b] = [linked[i], linked[j]]
                if (input.get(a).has(b)) {
                    const trio = [node, a, b]
                    if (trio.some(t => t[0] == 't')) {
                        trio.sort()
                        trios.add(trio.join(','))
                    }
                }
            }
        }
    }
    return trios.size
}

const part1 = input => {
    return solve(false, parseInput(input))
}

const part2 = input => {
    return solve(true, parseInput(input))
}

module.exports = { part1, part2 }
