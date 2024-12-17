'use strict'

const parseInput = input => input.split('\n\n').map(b => b.match(/\d+/g).map(Number))

const solve = (isPart2, [regs, code]) => {
    let a = 0, origB = regs[1], origC = regs[2], output
    do {
	if (isPart2) regs = [a++, origB, origC]
	let ip = 0 
	output = []
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
		    output.push(combo(op) % 8)
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
    } while (isPart2 && output.join(',') != code.join(','))
    return isPart2 ? a : output
}

const part1 = input => solve(false, parseInput(input)).join(',')

const part2 = input => {
    return solve(true, parseInput(input))
}

module.exports = { part1, part2 }
