'use strict'

const parseInput = input => input.split('\n\n').map(b => b.match(/\d+/g).map(Number))

const solve = ([regs, code]) => {
    let ip = 0, output = []
    const combo = operand => [0, 1, 2, 3, regs[0], regs[1], regs[2]][operand]
    while (ip >= 0 && ip < code.length - 1) {
	const [cmd, op] = [code[ip], code[ip + 1]]
	switch (cmd) {
	    case 0: regs[0] = Math.floor(regs[0] / Math.pow(2, combo(op))); break
	    case 1: regs[1] = regs[1] ^ op; break
	    case 2: regs[1] = combo(op) % 8; break
	    case 3: if (regs[0]) ip = op - 2; break
	    case 4: regs[1] = regs[1] ^ regs[2]; break
	    case 5: output.push(combo(op) & 7); break
	    case 6: regs[1] = Math.floor(regs[0] / Math.pow(2, combo(op))); break
	    case 7: regs[2] = Math.floor(regs[0] / Math.pow(2, combo(op))); break
	}
	ip += 2
    }
    return output
}

const part1 = input => solve(parseInput(input)).join(',')

const part2 = input => {
    const [[origA, origB, origC], code] = parseInput(input)
    const findRegA = (value, i) => {
	if (i < 0) return value
	for (let newValue = value * 8; newValue < value * 8 + 8; newValue++) {
	    const output = solve([[newValue, origB, origC], code])
	    if (output[0] == code[i]) {
		const lastValue = findRegA(newValue, i - 1)
		if (lastValue >= 0) return lastValue
	    }
	}
	return -1
    } 
    return findRegA(0, code.length - 1)
}

module.exports = { part1, part2 }
