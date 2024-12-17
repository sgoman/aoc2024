'use strict'

const parseInput = input => input.split('\n\n').map(b => b.match(/\d+/g).map(Number))

const solve = ([regs, code]) => {
    let ip = 0, output = []
    const combo = operand => {
	if (operand < 4) return operand
	if (operand < 7) return regs[operand - 4]
	console.log('!!! illegal combo operand: ', operand, 'at ip', ip)
    }

    while (ip >= 0 && ip < code.length - 1) {
	let [cmd, op] = [code[ip], code[ip + 1]]
	switch (cmd) {
	    case 0: // adv
		regs[0] = Math.floor(regs[0] / Math.pow(2, combo(op)))
		break
	    case 1: // bxl
		regs[1] = regs[1] ^ op
		break
	    case 2: // bst
		regs[1] = combo(op) % 8
		break
	    case 3: // jnz
		if (regs[0]) ip = op - 2
		break
	    case 4: // bxc
		regs[1] = regs[1] ^ regs[2]
		break
	    case 5: // out
		output.push(combo(op) & 7)
		break
	    case 6: // bdv
		regs[1] = Math.floor(regs[0] / Math.pow(2, combo(op)))
		break
	    case 7: // cdv
		regs[2] = Math.floor(regs[0] / Math.pow(2, combo(op)))
		break
	    default:
		console.log('unknown cmd ad ip', ip)
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
