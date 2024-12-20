Advent of Code 2024 in JavaScript
=================================

These are my solutions to the daily challenges of adventofcode.com, provided in plain JavaScript using NodeJS and the NPM module advent-of-code.

Installation
------------

After cloning this repository, run "npm install" and make sure that the aoc file is executable.

Set an environment variable with the name "ADVENT_SESSION" and the value of "session=YOURSESSION-ID" (with YOURSESSION-ID being the session ID from the cookie on the adventofcode.com site after logging in). This enables fetching your personalized input from adventofcode.com.

To run part 2 of the first challenge with your own input, execute "./aoc 1 2 +" or "./aoc 1 2 - < input1.txt" to provide an input file on standard in.

If you want to write a days challenge from scratch, issue "./aoc init 1" to generate a boilerplate file for day 1. You can change the boilerplate by editing the file dayTemplate.js.

No Installation
---------------

Most of the solutions can be run on the Advent of Code page for the input data.

- Copy the code for one day, but leave out the first and last line (don't include the 'use strict' and the 'module.exports' lines). If the code has a line that has "require('./utils.js')" near the top, skip that line as well, but remember to copy the referenced functions from utils.js afterwards.
- Paste the code into the developer console in your browser when viewing the puzzle input page for a day.
- Paste the code of any functions that were referenced from utils.js, if any.
- Enter the command "part1(document.body.innerText)" to run the solution for part 1. Replace the 1 with a 2 for part two. Most of the time you will be able to run both parts repeatedly without problems, but sometimes you can only run one part correctly (e.g. if the code relies on a global cache or something like that). You will have to reload the page and copy the code again in that case, only running the part you are interested in.

Example for the second day of 2024:
- copy lines 5 through 23 from day02.js (i.e. all code excluding the lines that contain 'use strict', 'utils.js' and 'module.exports')
- open the page https://adventofcode.com/2024/day/2/input
- hit F12 or whatever shortcut opens the developer tools in your browser
- paste the code into the console tab and hit enter
- copy the code for the function combineConditionally from utils.js
- paste it into the console tab of the developer tools as well
- type "part1(document.body.innerText)" without the quotes into the console tab and hit enter for the solution to part 1 


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
13. **[Day 13: Claw Contraption](day13.js)** Find the best number of button presses to win claw machine games. Pure math puzzle, as bruteforcing will get you nowhere, especially on part 2!
14. **[Day 14: Restroom Redoubt](day14.js)** Track particles with constant vectors on a wrapping grid. Do a checksum of the quadrants for part 1, find an "image" of a christmas tree in their pattern for part 2.
15. **[Day 15: Warehouse Woes](day15.js)** Sokoban without designated targets for boxes and a fixed list of moves. Part 2 stretches the grid and the boxes on the x-axis, resulting in more complicated moves on the vertical axis.
16. **[Day 16: Reindeer Maze](day16.js)** Shortest path through a maze with a custom cost on turning for part 1. Part 2 finds all alternative shortest routes and counts the number of tiles touched by them.
17. **[Day 17: Chronospatial Computer](day17.js)** Implement a fantasy console again. Easy part 1. Observation for part 2: increasing numbers generate the output from the back and are multiplied by 8 to skip a lot of computation, so you can recursively come up with a solution. And you should "& 7" the output, not "% 8" to avoid negative numbers!
18. **[Day 18: RAM Run](day18.js)** BFS maze solving. Single maze in part 2, possibly the number of lines in input times for part 2.
19. **[Day 19: Linen Layout](day19.js)** Recursively deconstructing designs by a list of patterns, with memoization.
20. **[Day 20: Race Condition](day20.js)** Race through a maze with cheats? Get a list of all tiles on the path and their distance to start or finish, then find shortcuts depending on the manhattan distance between those.
