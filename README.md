Advent of Code 2024 in JavaScript
=================================

These are my solutions to the daily challenges of adventofcode.com, provided in plain JavaScript using NodeJS and the NPM module advent-of-code.

Installation
------------

After cloning this repository, run "npm install" and make sure that the aoc file is executable.

Set an environment variable with the name "ADVENT_SESSION" and the value of "session=YOURSESSION-ID" (with YOURSESSION-ID being the session ID from the cookie on the adventofcode.com site after logging in). This enables fetching your personalized input from adventofcode.com.

To run part 2 of the first challenge with your own input, execute "./aoc 1 2 +" or "cat input1.txt | ./aoc 1 2 -" to provide an input file on standard in.

If you want to write a days challenge from scratch, issue "./aoc init 1" to generate a boilerplate file for day 1. You can change the boilerplate by editing the file dayTemplate.js.

The challenges
--------------

1. **[Day 1: Historian Hysteria](day01.js)** Read pairs of numbers, calculate distance and similarity
2. **[Day 2: Red-Nosed Reports](day02.js)** Are all numbers on a line exclusively ascending by at most 3 or descending by -3? In part 2 you might omit one number.
3. **[Day 3: Mull It Over](day03.js)** A simple RegEx for part 1 and some additional clever splitting and joining for part 2
4. **[Day 4: Ceres Search](day04.js)** Find 'XMAS' on a grid in all 8 directions. Then find 'MAS' in the shape of an X.
5. **[Day 5: Print Queue](day05.js)** Find updates that are in the correct order for part 1, reorder the updates that are not for part 2
6. **[Day 6: Guard Gallivant](day06.js)** Navigate on a grid until you walk off for part 1, place obstacles that makes you loop for part 2
7. **[Day 7: Bridge Repair](day07.js)** Find combinations from a list of operations that resolve an equation. Part 2 knows of one more operation.
8. **[Day 8: Resonant Collinearity](day08.js)** Find pairs of the same node on a grid and determine the next (or all for part 2) tiles on the same line on the grid
9. **[Day 9: Disk Fragmenter](day09.js)** This is not how to defrag disk space! First part fills from right to left, second part only claims space wide enough, but ignores continuous free blocks counting as a whole
10. **[Day 10: Hoof It](day10.js)** Walking a heightmap on an ascending path. Part 1 counts the number of distinct summits you can reach, part 2 counts the number of unique trails you can take.
11. **[Day 11: Plutonian Pebbles](day11.js)** Exponential growth, but for part 1 you could simply write code as instructed. Part 2 requires you to incorporate momoization and working on a single stone at a time.
12. **[Day 12: Garden Groups](day12.js)** Determine the circumfence of an area in a grid for part 1. Part 2 wants to know how many lines of fences are needed to surround each area.
