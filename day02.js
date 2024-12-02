'use strict'

const { combineConditionally } = require('./utils.js')

const parseInput = input => input.split('\n').map(line => line.match(/\d+/g).map(Number))

const differences = nums => nums.reduce((diffs, num, i) => i ? [...diffs, num - nums[i - 1]] : diffs, [])

const isSafe = diffs => diffs.every(num => num <= 3 && num >= -3) * (diffs.every(num => num > 0) || diffs.every(num => num < 0))

const solve = (isPart2, input) => parseInput(input)
    .map(report => {
        if (isSafe(differences(report))) return 1
        if (!isPart2) return 0
        const omitOne = tmp => tmp.length == report.length - 1
        const everything = tmp => true
        return 1 * combineConditionally(report, omitOne, everything).some(c => isSafe(differences(c)))
    })
    .reduce((acc, cur) => acc + cur, 0)

const part1 = input => solve(false, input)

const part2 = input => solve(true, input)

module.exports = { part1, part2 }
