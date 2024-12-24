'use strict'

const parseInput = input => {
    let [first, second] = input.split('\n\n').map(b => b.split('\n'))
    const def = new Map()
    first.map(l => l.split(': ')).forEach(([reg, val]) => def.set(reg, Number(val)))
    return [def, second.map(l => l.replace('-> ', '').split(' '))]
}

const solve = ([def, wires]) => {
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
    const res = []
    for (const l of ['z', 'x', 'y']) {
        const keys = [...def.keys()].filter(k => k[0] == l)
        keys.sort()
        let bits = ''
        for (const key of keys.reverse()) bits += def.get(key)
        res.push(parseInt(bits, 2))
    }
    return res
}

const part1 = input => solve(parseInput(input))[0]

const part2 = input => {
    let [def, wires] = parseInput(input)
    /*
    // manually check the bits of the result against the sum of x and y
    const swap = ['z07', 'z08', 'z12', 'z15', 'z13', 'z39']
    for (let i = 0; i < swap.length - 1; i += 2) {
        const [l, r] = [swap[i], swap[i + 1]]
        for (let j = 0; j < wires.length; j++) {
            if (wires[j][3] == l) {
                wires[j][3] = r
            } else if (wires[j][3] == r) {
                wires[j][3] = l
            }
        }
    }
    const [z, x, y] = solve([def, wires])
    const s = x + y
    swap.sort()
    return (z == s) ? swap.join(',') : {z: z.toString(2), s: (x + y).toString(2)}
    */

    const swaps = new Set()
    // all outputs to z that are not xor'ing are wrong, except for the one to z45
    wires.filter(([a, op, b, o]) => o[0] == 'z' && o != 'z45' && op != 'XOR').forEach(f => swaps.add(f[3]))

    // all outputs to z that are not xor'ing x and y are wrong, except for z00
    wires.filter(([a, op, b, o]) => op == 'XOR' && 'xy'.search(a[0]) == -1 && 'xy'.search(b[0]) == -1 && o != 'z00' && o[0] != 'z').forEach(f => swaps.add(f[3]))

    // all XOR wires working on x must feed into another XOR wire that does not work on x, except the ones already in swaps or outputing to z00
    for (const wire of wires.filter(([a, op, b, o]) => op == 'XOR' && (a[0] == 'x' || b[0] == 'x'))) {
        if (swaps.has(wire[3]) || wire[3] == 'z00') continue
        const thirds = wires.filter(([a, op, b, o]) => op == 'XOR' && !(a[0] == 'x' || b[0] == 'x') && (a == wire[3] || b == wire[3]))
        if (thirds.length == 0) {
            swaps.add(wire[3])
            // now find the intended wire to output on
            const correctOutput = wires.filter(f => f[3] == `z${wire[0].slice(1)}`)[0]
            // one of those inputs should come from an OR wire
            const orWire = wires.filter(f => f[1] == 'OR' && [correctOutput[0], correctOutput[2]].includes(f[3]))[0]
            swaps.add([correctOutput[0], correctOutput[2]].find(f => f != orWire[3]))
        }
    }
    return [...swaps].sort().join(',')
}

module.exports = { part1, part2 }
