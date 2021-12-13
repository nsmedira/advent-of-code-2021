const fs = require('fs');

const data = fs.readFileSync('./input.txt', 'utf8').split('\n\n');

const dots = data[0].split('\n').map((coordinates) => coordinates.split(',').map((coordinate) => parseInt(coordinate)));

const instructions = data[1]
    .split('\n')
    .slice(0, -1)
    .map((instruction) => instruction.match(/[yx]=[0-9]+/)[0]);

const fold = (instruction, dots) => {
    const axis = instruction[0];
    const fold = parseInt(instruction.substring(2));
    const axisIndex = axis === 'x' ? 0 : 1;

    const dotsToFold = dots.filter((dot) => dot[axisIndex] > fold);
    for (const dotToFold of dotsToFold) {
        const nextAxisValue = dotToFold[axisIndex] - (dotToFold[axisIndex] - fold) * 2;
        const x = axis === 'y' ? dotToFold[0] : nextAxisValue;
        const y = axis === 'y' ? nextAxisValue : dotToFold[1];

        if (
            !dots.find((dot) => {
                return dot[0] === x && dot[1] === y;
            })
        ) {
            dots.push([x, y]);
        }
    }

    let i = 0;
    while (i < dots.length) {
        if (dots[i][axisIndex] >= fold) {
            dots.splice(i, 1);
            continue;
        }
        i++;
    }
};

const part1 = (prevDots) => {
    const dots = prevDots.map((dot) => [...dot]);

    fold(instructions[0], dots);

    console.log('visible dots:', dots.length);
};

part1(dots);

const part2 = (prevDots) => {
    const dots = prevDots.map((dot) => [...dot]);

    for (const instruction of instructions) {
        fold(instruction, dots);
    }

    const maxX = Math.max(...dots.map((dot) => dot[0]));
    const maxY = Math.max(...dots.map((dot) => dot[1]));

    for (let j = 0; j <= maxY; j++) {
        let line = '';
        for (let i = 0; i <= maxX; i++) {
            line += dots.find(([x, y]) => x === i && y === j) ? '#' : ' ';
        }
        console.log(line);
    }
};

part2(dots);
