const { getData } = require('../starter');
const path = require('path');

const data = getData(path.resolve('./input.txt')).slice(0, -1);

const map = data.map((line) => line.split('').map((height) => parseInt(height)));

const lowPoints = map.reduce(
    (allLowPoints, currentLine, i) => [
        ...allLowPoints,
        ...currentLine.reduce((thisLineLowPoints, currentHeight, j) => {
            const adjacentHeights = [map[i - 1]?.[j], map[i][j + 1], map[i + 1]?.[j], map[i][j - 1]].filter(
                (value) => value !== undefined
            );
            const isLowPoint = adjacentHeights.every((height) => height > currentHeight);
            return [...thisLineLowPoints, ...(isLowPoint ? [[i, j]] : [])];
        }, [])
    ],
    []
);

/* ----- PART 1 ----- */

const riskLevel = lowPoints.reduce((totalRisk, [y, x]) => totalRisk + map[y][x] + 1, 0);

console.log('riskLevel:', riskLevel);

/* ----- PART 2 ----- */

const isValidCoordinate = ([y, x]) => ![undefined, 9].includes(map[y]?.[x]);

const basinSizes = [];

lowPoints.forEach((coordinate) => {
    const basin = [];
    const nextCoordinates = [coordinate];

    // eslint-disable-next-line
    while (!!nextCoordinates.length) {
        const coordinate = nextCoordinates.shift();
        const [y, x] = coordinate;

        const stringifiedBasin = basin.map((basinCoordinate) => JSON.stringify(basinCoordinate));
        const isInBasin = (coordinate) => stringifiedBasin.includes(JSON.stringify(coordinate));

        if (!isInBasin(coordinate)) {
            basin.push(coordinate);
        }

        [
            [y - 1, x],
            [y, x + 1],
            [y + 1, x],
            [y, x - 1]
        ].forEach((potentialCoordinate) => {
            if (isValidCoordinate(potentialCoordinate) && !isInBasin(potentialCoordinate)) {
                nextCoordinates.push(potentialCoordinate);
            }
        });
    }

    basinSizes.push(basin.length);
});

const answer = basinSizes
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((total, size) => total * size, 1);

console.log('3 largest basin sizes multiplied:', answer);
