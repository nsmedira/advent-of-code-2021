const { getData } = require('../starter');
const path = require('path');

const data = getData(path.resolve('./input.txt')).slice(0, -1);

const coordinatePairs = data.map((line) =>
    line.split(' -> ').map((pair) => pair.split(',').map((coordinate) => parseInt(coordinate)))
);

const onlyHorizontalAndVertical = coordinatePairs.filter(([[x1, y1], [x2, y2]]) => x1 === x2 || y1 === y2);

const findIntersections = (coordinates) => {
    const cache = {};

    for (const pair of coordinates) {
        const [[x1, y1], [x2, y2]] = pair;

        const isDiagonal = x1 !== x2 && y1 !== y2;

        if (!isDiagonal) {
            const isHorizontal = y1 === y2;

            const start = Math.min(...(isHorizontal ? [x1, x2] : [y1, y2]));
            const length = Math.abs(isHorizontal ? x2 - x1 : y2 - y1);

            for (let i = start; i <= start + length; i++) {
                const x = isHorizontal ? i : x1;
                const y = isHorizontal ? y1 : i;
                const key = JSON.stringify([x, y]);
                cache[key] = (cache[key] || 0) + 1;
            }
        } else {
            const min = Math.min(x1, x2);
            const start = pair.find(([x]) => x === min);
            const end = pair.find(([x]) => x !== min);
            const multiplier = start[1] < end[1] ? 1 : -1;
            const length = end[0] - start[0];
            for (let i = 0; i <= length; i++) {
                const key = JSON.stringify([start[0] + i, start[1] + i * multiplier]);
                cache[key] = (cache[key] || 0) + 1;
            }
        }
    }

    let numberOfIntersections = 0;

    for (const coordinate in cache) {
        if (cache[coordinate] > 1) {
            numberOfIntersections++;
        }
    }

    return numberOfIntersections;
};

/* ----- PART 1 ----- */

console.log('number of intersections (only horizontal and vertical):', findIntersections(onlyHorizontalAndVertical));

/* ----- PART 2 ----- */

console.log('number of intersections (including diagonal):', findIntersections(coordinatePairs));
