'use strict'

const { combineConditionally } = require('./utils.js')

const parseInput = input => {
    return input.split('\n').map(l => l.match(/\d+/g).map(Number))
}

const calc = (eq, ops) => {
    return ops.reduce((res, op, i) => {
        if (i) {
            return eval(`${res} ${op} ${eq[i + 2]}`)
        } else {
            return eval(`${eq[i + 1]} ${op} ${eq[i + 2]}`)
        }
    }, 0) == eq[0]
}

const solve = (isPart2, input) => {
    input = parseInput(input)
    return input.reduce((total, cur) => {
        const ops = [], l = cur.length - 2
        for (let i = l; i > 0; i--) {
            ops.push('+')
            ops.push('*')
        }
        const amount = tmp => tmp.length == l
        const more = tmp => tmp.length < l
        if (combineConditionally(ops, amount, more).some(op => calc(cur, op))) total += cur[0]
        //console.log({total, cur, l, ops })
        return total
    }, 0)
}

const part1 = input => solve(false, input)

const part2 = input => solve(true, input)

module.exports = { part1, part2 }
