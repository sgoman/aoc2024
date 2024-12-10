'use strict'

const parseInput = input => input.split('\n').map(l => l.match(/\d+/g).map(Number))

const calc = (eq, ops) => ops.reduce((res, op, i) => eval(`${res}${op}${eq[i + 2]}`), eq[1]) == eq[0]

const compute = (equation, availableOperations) => {
    const stack = [ [] ]

    do {
        const operations = stack.pop()

        for (const operation of availableOperations) {
            const nextOperations = [ ...operations, operation ]

            if (nextOperations.length === equation.length - 2) {
                if (calc(equation, nextOperations)) return equation[0]
            } else {
                stack.push(nextOperations)
            }
        }
    } while (stack.length)

    return 0
}

const solve = (operations, input) => parseInput(input).reduce((total, cur) => total += compute(cur, operations), 0)

const part1 = input => solve(['+', '*'], input)

const part2 = input => solve(['+', '*', ''], input)

module.exports = { part1, part2 }
