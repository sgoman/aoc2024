'use strict'

const parseInput = input => {
    const [first, second] = input.split('\n\n')
    const rules = first.split('\n').map(l => l.match(/\d+/g).map(Number))
    const updates = second.split('\n').map(l => l.split(',').map(Number))
    return [rules, updates]
}

const solve = (isPart2, input) => {
    const [rules, updates] = parseInput(input)
    let total = 0
    for (const update of updates) {
        const relevant = rules.filter(([left, right]) => update.includes(left) && update.includes(right))
        if (relevant.every(([left, right]) => update.indexOf(left) < update.indexOf(right))) {
            if (!isPart2) {
                const middle = update[update.length >> 1]
                total += middle
            }
        } else if (isPart2) {
            console.log({update, relevant})
            const orig = update.join(',')
            update.sort((a, b) => {
                let rule = relevant.find(r => r.includes(a) && r.includes(b))
                return rule.indexOf(a) - rule.indexOf(b)
            })
            total += update[update.length >> 1]
        }
    }
    return total
}

const part1 = input => {
    return solve(false, input)
}

const part2 = input => {
    return solve(true, input)
}

module.exports = { part1, part2 }
