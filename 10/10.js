const { getData } = require('../starter');
const path = require('path');

const data = getData(path.resolve('./input.txt')).slice(0, -1);

const legalChars = ['()', '[]', '{}', '<>'];
const openingChars = legalChars.map((char) => char[0]);

const getOpeningChar = (closingChar) => legalChars.find((legalChar) => legalChar[1] === closingChar)[0];

/* ----- PART 1 ----- */

const syntaxPoints = { ')': 3, ']': 57, '}': 1197, '>': 25137 };

let syntaxScore = 0;

data.forEach((line) => {
    const chunks = [];
    for (const char of line) {
        if (openingChars.includes(char)) {
            chunks.push(char);
            continue;
        }

        if (chunks[chunks.length - 1] !== getOpeningChar(char)) {
            syntaxScore += syntaxPoints[char];
            return;
        }

        chunks.splice(chunks.length - 1, 1);
    }
});

console.log('syntax score:', syntaxScore);

/* ----- PART 2 ----- */

const autocompletePoints = { ')': 1, ']': 2, '}': 3, '>': 4 };

const autocompleteScores = [];

data.forEach((line) => {
    const chunks = [];
    let isCorrupted = false;
    for (const char of line) {
        if (openingChars.includes(char)) {
            chunks.push(char);
            continue;
        }

        if (chunks[chunks.length - 1] !== getOpeningChar(char)) {
            isCorrupted = true;
            break;
        }

        chunks.splice(chunks.length - 1, 1);
    }

    if (!isCorrupted) {
        let score = 0;
        for (let i = chunks.length - 1; i >= 0; i--) {
            score = score * 5 + autocompletePoints[legalChars.find((char) => char[0] === chunks[i])[1]];
        }
        autocompleteScores.push(score);
    }
});

console.log(
    'middle autocomplete score:',
    autocompleteScores.sort((a, b) => a - b)[Math.ceil((autocompleteScores.length - 1) / 2)]
);
