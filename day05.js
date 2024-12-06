'use strict'

const solve = (isPart2, input) => {
    const [rules, updates] = input.split('\n\n').map(block => block.split('\n').map(line => line.match(/\d+/g).map(Number))) 
    return updates.reduce((total, update) => {
        const relevant = rules.filter(([left, right]) => update.includes(left) && update.includes(right))
        if (relevant.every(([left, right]) => update.indexOf(left) < update.indexOf(right))) {
            total += update[update.length >> 1] * (!isPart2)
        } else if (isPart2) {
            update.sort((a, b) => {
                let rule = relevant.find(r => r.includes(a) && r.includes(b))
                return rule.indexOf(a) - rule.indexOf(b)
            })
            total += update[update.length >> 1]
        }
        return total
    }, 0)
}

const part1 = input => solve(false, input)

const part2 = input => solve(true, input)

module.exports = { part1, part2 }
