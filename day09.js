'use strict'

const parseInput = input => input.split('').map(Number).reduce((a, c, i) => [...a, [i, c]], [])

const part1 = input => {
    input = parseInput(input)
    let i = input[0][1], sum = 0
    console.log({input, i})
    input.shift()
    while (input.length) {
        if (input[0][0] % 2 == 1) {
            let [_, e] = input.shift()
            let fi, fl
            while (e > 0) {
                do {[fi, fl] = input.pop()} while(fi % 2 == 1)
                console.log({i, sum, e, fi, fl})
                while (fi % 2 == 0 && e && fl) {
                    sum += i++ * (fi >> 1)
                    e--
                    fl--
                }
                if (input.length == 0) break
            }
            if (fl) input.push([fi, fl])
        } else {
            let [fi, fl] = input.shift()
            console.log({i, sum, fi, fl})
            while (fl--) sum += i++ * (fi >> 1)
        }
    }
    return sum
}

const part2 = input => {
    input = parseInput(input)
    let i = input[0][1], sum = 0
    console.log({input, i})
    input.shift()
    while (input.length) {
        if (input[0][0] % 2 == 1) {
            let [_, e] = input.shift()
            let found = true
            while (e > 0 && found) {
                found = false
                for (let j = input.length - 1; j >= 0; j--) {
                    let [fi, fl] = input[j]
                    if (fi % 2 == 0 && fl <= e) {
                        found = true
                        input.splice(j, 1, [1, fl])
                        console.log({i, sum, e, fi, fl})
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
            let [fi, fl] = input.shift()
            console.log({i, sum, fi, fl})
            while (fl--) sum += i++ * (fi >> 1)
        }
    }
    return sum
}

module.exports = { part1, part2 }
