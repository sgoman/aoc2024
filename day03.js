'use strict'

const sumMul = input => input.match(/mul\(\d+,\d+\)/g).map(m => m.match(/\d+/g).map(Number)).reduce((total, [l, r]) => total + l * r, 0)

const part1 = input => sumMul(input)

const part2 = input => sumMul(input.split('do()').map(s => s.split('don\'t()')[0]).join())

module.exports = { part1, part2 }
