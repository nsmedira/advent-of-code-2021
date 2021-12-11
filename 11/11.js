const { getData } = require('../starter');
const path = require('path');

const octopi = getData(path.resolve('./input.txt'))
    .slice(0, -1)
    .map((line) => line.split('').map((octopus) => parseInt(octopus)));

let totalFlashes = 0;
let firstSynchronizedFlash = undefined;

const simulateFlashes = (i) => {
    const flashes = [];

    for (let i = 0; i < octopi.length; i++) {
        for (let j = 0; j < octopi[i].length; j++) {
            octopi[i][j]++;

            if (octopi[i][j] > 9) {
                flashes.push([i, j]);
            }
        }
    }

    const cascadeFlashes = (prevFlashes) => {
        if (!prevFlashes.length) {
            return;
        }

        const nextFlashes = [];
        for (const [y, x] of prevFlashes) {
            for (const [i, j] of [
                [y - 1, x], // above
                [y - 1, x + 1], // above right
                [y, x + 1], // right
                [y + 1, x + 1], // below right
                [y + 1, x], // below
                [y + 1, x - 1], // below left
                [y, x - 1], // left
                [y - 1, x - 1] // above left
            ]) {
                if (octopi[i]?.[j] === undefined) {
                    continue;
                }

                octopi[i][j]++;
                if (
                    octopi[i][j] > 9 &&
                    ![...flashes, ...nextFlashes].map((flash) => JSON.stringify(flash)).includes(JSON.stringify([i, j]))
                ) {
                    nextFlashes.push([i, j]);
                }
            }
        }
        flashes.push(...nextFlashes);

        return cascadeFlashes(nextFlashes);
    };

    cascadeFlashes(flashes);

    flashes.forEach(([y, x]) => (octopi[y][x] = 0));

    if (firstSynchronizedFlash === undefined && flashes.length === 100) {
        firstSynchronizedFlash = i;
    }

    totalFlashes += flashes.length;
};

/* ----- PART 1 ----- */

for (let i = 0; i < 100; i++) {
    simulateFlashes(i);
}

console.log('total flashes:', totalFlashes);

/* ----- PART 2 ----- */

for (let i = 0; firstSynchronizedFlash === undefined; i++) {
    simulateFlashes(i);
}

console.log('first synchronized flashs:', firstSynchronizedFlash + 1);
