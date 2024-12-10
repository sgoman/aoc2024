'use strict'

const parseInput = input => input.split('').map(Number).reduce((a, c, i) => [...a, [i, c]], [])

const solve = (isPart2, input) => {
    input = parseInput(input)
    let i = input[0][1], sum = 0
    input.shift()
    while (input.length) {
        if (input[0][0] % 2 == 1) {
            let [_, e] = input.shift()
            let fi, fl
            if (isPart2) {
                let found = true
                while (e > 0 && found) {
                    found = false
                    for (let j = input.length - 1; j >= 0; j--) {
                        [fi, fl] = input[j]
                        if (fi % 2 == 0 && fl <= e) {
                            found = true
                            input.splice(j, 1, [1, fl])
                            while (e && fl) {
                                sum += i++ * (fi >> 1)
                                e--
                                fl--
                            }
                            break
                        }
                    }
                }
                i += e
            } else {
                while (e > 0) {
                    do {[fi, fl] = input.pop()} while(fi % 2 == 1)
                    while (fi % 2 == 0 && e && fl) {
                        sum += i++ * (fi >> 1)
                        e--
                        fl--
                    }
                    if (input.length == 0) break
                }
                if (fl) input.push([fi, fl])
            }
        } else {
            let [fi, fl] = input.shift()
            while (fl--) sum += i++ * (fi >> 1)
        }
    }
    return sum
}

const part1 = input => solve(false, input)

const part2 = input => solve(true, input)

module.exports = { part1, part2 }
