'use strict'

const { combineConditionally } = require('./utils.js')

const parseInput = input => {
    return input.split('\n').map(l => l.match(/\d+/g).map(Number))
}

const solve = (isPart2, input) => {
    return input
}

const differences = nums => nums.reduce((acc, cur, i, arr) => i ? [...acc, cur - arr[i - 1]] : acc, [])

const safe = d => d.every(num => num < 4 && num > -4) * (d.every(num => num > 0) || d.every(num => num < 0))

const part1 = input => {
    const reports = parseInput(input)
    const diffs = reports.map(differences)
    return diffs
        .map(d => d.every(num => num < 4 && num > -4) * (d.every(num => num > 0) || d.every(num => num < 0)))
        .reduce((acc, cur) => acc + cur, 0)
}

const part2 = input => {
    const reports = parseInput(input)
    return reports
        .map((r, i) => {
            const d = differences(r)
            if (safe(d)) return 1
            const removeOne = tmp => tmp.length == r.length - 1
            const everything = tmp => true
            const combos = combineConditionally(r, removeOne, everything)
            console.log('Report ' + i + ': ' + r)
            console.log(combos)
            for (const c of combos) {
                if (safe(differences(c))) return 1
            }
            return 0
        })
        .reduce((acc, cur) => acc + cur, 0)
}

module.exports = { part1, part2 }
