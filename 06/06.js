const { getData } = require('../starter');
const path = require('path');

const data = getData(path.resolve('./input.txt')).slice(0, -1);

const fishes = data[0].split(',');

const simulateLanternfishReproduction = (days) => {
    const nextFishes = [...fishes.map((fish) => parseInt(fish))];

    let day = 0;
    while (day < days) {
        const currentNumberOfFishes = nextFishes.length;
        for (let i = 0; i < currentNumberOfFishes; i++) {
            if (nextFishes[i] === 0) {
                nextFishes.push(8);
                nextFishes[i] = 6;
            } else {
                nextFishes[i]--;
            }
        }
        day++;
    }

    return nextFishes.length;
};

const simulateLanternfishReproductionWithLessMemory = (days) => {
    let cache = {};
    fishes.forEach((fish) => (cache[fish] = (cache[fish] || 0) + 1));

    let day = 0;
    while (day < days) {
        let nextCache = { ...cache };

        for (const timer in cache) {
            const remove = () => (nextCache[timer] = (nextCache[timer] || 0) - cache[timer]);

            if (timer === '0') {
                ['8', '6'].forEach((nextTimer) => (nextCache[nextTimer] = (nextCache[nextTimer] || 0) + cache[timer]));
                remove();
            } else {
                nextCache[timer - 1] = (nextCache[timer - 1] || 0) + cache[timer];
                remove();
            }
        }

        cache = { ...nextCache };

        day++;
    }

    return Object.keys(cache)
        .map((timer) => cache[timer])
        .reduce((total, count) => total + count, 0);
};

console.log('number of fish after 80 days:', simulateLanternfishReproduction(80));
console.log('number of fish after 256 days:', simulateLanternfishReproductionWithLessMemory(256));
