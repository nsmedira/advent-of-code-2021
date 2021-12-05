const fs = require('fs');

const countIncreases = (arr) => {
    let counter = 0;
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > arr[i - 1]) {
            counter += 1;
        }
    }
    return counter;
};

try {
    const data = fs.readFileSync('./input.txt', 'utf8');
    const list = data
        .split('\n')
        .filter((value) => value)
        .map((value) => parseInt(value));

    console.log('number of individual increases:', countIncreases(list));

    const windowSums = [];
    for (let i = 0; i < list.length; i++) {
        if (list.length - i >= 3) {
            windowSums.push(list[i] + list[i + 1] + list[i + 2]);
        }
    }

    console.log('number of windowed increases:', countIncreases(windowSums));
} catch (error) {
    console.error(error);
}
