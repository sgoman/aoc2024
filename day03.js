'use strict'

const parseInput = input => {
    return input.match(/mul\((\d+),(\d+)\)/g).map(m => m.match(/\d+/g).map(Number))
}

const parseInput2 = input => {
    return input.split('do()').map(s => s.split('don\'t()')[0]).join().match(/mul\((\d+),(\d+)\)/g).map(m => m.match(/\d+/g).map(Number))
}

const solve = (isPart2, input) => {
    return input
}

const part1 = input => {
    return parseInput(input).reduce((total, [l, r]) => total + l * r, 0)
}

const part2 = input => {
    return parseInput2(input).reduce((total, [l, r]) => total + l * r, 0)
}

module.exports = { part1, part2 }
