'use strict'

const parseInput = input => input.split('\n').reduce((graph, line) => {
    const [a, b] = line.split('-')
    if (!graph.has(a)) graph.set(a, new Set())
    if (!graph.has(b)) graph.set(b, new Set())
    graph.get(a).add(b)
    graph.get(b).add(a)
    return graph
}, new Map())

const getTrios = input => [...input].reduce((trios, [node, neighbours]) => {
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
    return trios
}, new Set()).size

const enumerate = (graph, keys, groups, excluded, biggest) => {
    if (keys.size == 0 && excluded.size == 0) {
        if (groups.size > biggest.size) {
            biggest.clear()
            groups.forEach(g => biggest.add(g))
        }
        return
    }
    for (const k of Array.from(keys)) {
        groups.add(k)
        const neighbours = graph.get(k) || new Set()
        enumerate(graph, new Set([...keys].filter(f => neighbours.has(f))), groups, new Set([...excluded].filter(f => neighbours.has(f))), biggest)
        groups.delete(k)
        keys.delete(k)
        excluded.add(k)
    }
}

const part1 = input => getTrios(parseInput(input))

const part2 = input => {
    input = parseInput(input)
    const biggest = new Set()
    enumerate(input, new Set(input.keys()), new Set(), new Set(), biggest)
    const password = Array.from(biggest)
    password.sort()
    return password.join(',')
}

module.exports = { part1, part2 }
