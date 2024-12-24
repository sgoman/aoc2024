'use strict'

const parseInput = input => {
    let [first, second] = input.split('\n\n').map(b => b.split('\n'))
    const def = new Map()
    first.map(l => l.split(': ')).forEach(([reg, val]) => def.set(reg, Number(val)))
    return [def, second.map(l => l.replace('-> ', '').split(' '))]
}

const solve = (isPart2, [def, wires]) => {
    while (wires.length) {
        const [a, op, b, r] = wires.shift()
        if (def.has(a) && def.has(b)) {
            switch(op) {
                case 'OR': def.set(r, def.get(a) | def.get(b)); break
                case 'XOR': def.set(r, def.get(a) ^ def.get(b)); break
                case 'AND': def.set(r, def.get(a) & def.get(b)); break
            }
        } else {
            wires.push([a, op, b, r])
        }
    }
    const keys = [...def.keys()].filter(k => k[0] == 'z')
    keys.sort()
    let bits = ''
    for (const key of keys.reverse()) bits += def.get(key)
    return parseInt(bits, 2)
}

const part1 = input => {
    return solve(false, parseInput(input))
}

const part2 = input => {
    return solve(true, parseInput(input))
}

module.exports = { part1, part2 }
