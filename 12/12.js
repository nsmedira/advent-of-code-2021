const { getData } = require('../starter');
const path = require('path');

const connections = getData(path.resolve('./input.txt'))
    .slice(0, -1)
    .map((line) => line.split('-'));

const startingConnections = connections.filter((connection) => connection.includes('start'));

for (const connection of startingConnections) {
    connection.sort((a) => (a === 'start' ? -1 : 1));
}

/* ----- PART 1 ----- */

const countPathsSmallCavesOnce = () => {
    const paths_smallCavesOnce = startingConnections.map((connection) => [...connection]);
    let count = 0;

    const followPathToEnd = (path) => {
        const prevCave = path[path.length - 1];

        if (prevCave === 'end') {
            count++;
            return;
        }

        const nextCaves = connections
            .filter((connection) => {
                const nextCave = connection[0] === prevCave ? connection[1] : connection[0];
                return (
                    connection.includes(prevCave) && (nextCave === nextCave.toUpperCase() || !path.includes(nextCave))
                );
            })
            .map((connection) => connection.find((cave) => cave !== prevCave));

        const nextPath = [...path];

        if (nextCaves.length === 0) {
            const goBackCave = path[path.length - 2];
            if (!!goBackCave && goBackCave === goBackCave.toUpperCase()) {
                nextPath.push(goBackCave);
                return followPathToEnd(nextPath);
            }
            return;
        }

        if (nextCaves.length > 1) {
            nextCaves.forEach((cave, idx) => {
                if (idx === nextCaves.length - 1) {
                    nextPath.push(cave);
                    return;
                }
                paths_smallCavesOnce.push([...path, cave]);
            });
        }

        if (nextCaves.length === 1) {
            nextPath.push(nextCaves[0]);
        }

        return followPathToEnd(nextPath);
    };

    while (paths_smallCavesOnce.length) {
        const path = paths_smallCavesOnce.shift();

        followPathToEnd(path);
    }

    return count;
};

console.log('small caves once - number of paths:', countPathsSmallCavesOnce());

/* ----- PART 2 ----- */

const countPathsOneSmallCaveTwice = () => {
    const paths_oneSmallCaveTwice = startingConnections.map((connection) => [...connection]);
    let count = 0;

    const followPathToEnd = (path) => {
        const prevCave = path[path.length - 1];

        if (prevCave === 'end') {
            count++;
            return;
        }

        const smallCaves = path.filter((cave) => cave === cave.toLowerCase());
        const caveVisitedTwice = (() => {
            let temp = [];
            for (const cave of smallCaves) {
                if (temp.includes(cave)) {
                    return cave;
                }
                temp.push(cave);
            }
            return null;
        })();

        const nextCaves = connections
            .filter((connection) => {
                const nextCave = connection[0] === prevCave ? connection[1] : connection[0];
                return (
                    connection.includes(prevCave) &&
                    (nextCave === nextCave.toUpperCase() ||
                        nextCave === 'end' ||
                        (!!caveVisitedTwice && caveVisitedTwice !== nextCave && !path.includes(nextCave)) ||
                        (!caveVisitedTwice && nextCave !== 'start'))
                );
            })
            .map((connection) => connection.find((cave) => cave !== prevCave));

        let nextPath = [...path];

        if (nextCaves.length === 0) {
            const goBackCave = path[path.length - 2];
            if (!!goBackCave && (goBackCave === goBackCave.toUpperCase() || !caveVisitedTwice)) {
                nextPath.push(goBackCave);
                return followPathToEnd(nextPath);
            }
            return;
        }

        if (nextCaves.length > 1) {
            nextCaves.forEach((cave, idx) => {
                if (idx === nextCaves.length - 1) {
                    nextPath.push(cave);
                    return;
                }
                paths_oneSmallCaveTwice.push([...path, cave]);
            });
        }

        if (nextCaves.length === 1) {
            nextPath.push(nextCaves[0]);
        }

        return followPathToEnd(nextPath);
    };

    while (paths_oneSmallCaveTwice.length) {
        const path = paths_oneSmallCaveTwice.shift();

        followPathToEnd(path);
    }

    return count;
};

console.log('one small cave twice - number of paths:', countPathsOneSmallCaveTwice());
