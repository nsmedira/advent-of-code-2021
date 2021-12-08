const { getData } = require('../starter');
const path = require('path');

const data = getData(path.resolve('./input.txt')).slice(0, -1);
const signalsDigitsPairs = data
    .map((string) => string.split(' | '))
    .map((pair) => [pair[0].split(' '), pair[1].split(' ')]);

/* ----- PART 1 ----- */

const uniqueLengths = [2, 3, 4, 7];

const countUniqueLengths = signalsDigitsPairs
    .map((pair) => pair[1])
    .reduce((array, current) => [...array, ...current], [])
    .filter((value) => uniqueLengths.includes(value.length)).length;

console.log('countUniqueLengths:', countUniqueLengths);

/* ----- PART 2 ----- */
let sumOutputValues = 0;

signalsDigitsPairs.forEach(([signals, output]) => {
    const getSignalByLength = (length) => signals.find((signal) => signal.length === length);

    // unique lengths
    const decodedSignals = {
        1: getSignalByLength(2),
        4: getSignalByLength(4),
        7: getSignalByLength(3),
        8: getSignalByLength(7)
    };

    const getSignalsByLength = (length) => signals.filter((signal) => signal.length === length);
    const getSignalSharesSegmentsWithOne = (signal) =>
        signal.split('').filter((segment) => splitOne.includes(segment)).length === 2;
    const removeElementFromArray = (element, array) => array.splice(array.indexOf(element), 1);
    const getNumberCommonSegments = (testSignal, inputSignal) =>
        inputSignal.split('').filter((segment) => testSignal.split('').includes(segment)).length;
    const sortSignal = (signal) => signal.split('').sort().join('');

    const signalsLength6 = getSignalsByLength(6);
    const signalsLength5 = getSignalsByLength(5);

    const splitOne = decodedSignals['1'].split('');

    // among signals with length 6, the signal that corresponds to '6'
    // will be the one that does not have both of the segments in '1'
    decodedSignals['6'] = signalsLength6.find((signal) => !getSignalSharesSegmentsWithOne(signal));
    removeElementFromArray(decodedSignals['6'], signalsLength6);

    // among remaining signals of length 6, '9' will have all of the segments in '4'
    decodedSignals['9'] = signalsLength6.find((signal) => getNumberCommonSegments(decodedSignals['4'], signal) === 4);
    removeElementFromArray(decodedSignals['9'], signalsLength6);

    // '0' will be the last remaining signal of length 6
    decodedSignals['0'] = signalsLength6[0];

    // among signals with length 5, the signal that corresponds to '3'
    // will be the one that has both of the segments in '1'
    decodedSignals['3'] = signalsLength5.find((signal) => getSignalSharesSegmentsWithOne(signal));
    removeElementFromArray(decodedSignals['3'], signalsLength5);

    // among remaining signals with length 5
    // signal that corresponds to '5' will share 5 segments with 6
    decodedSignals['5'] = signalsLength5.find((signal) => getNumberCommonSegments(decodedSignals['6'], signal) === 5);
    removeElementFromArray(decodedSignals['5'], signalsLength5);

    // signal that corresponds to '2' will be last remaining element in signalsLength5
    decodedSignals['2'] = signalsLength5[0];

    for (const digit in decodedSignals) {
        decodedSignals[digit] = sortSignal(decodedSignals[digit]);
    }

    const outputValue = output
        .map((encodedDigit) =>
            Object.keys(decodedSignals).find(
                (decodedDigit) => decodedSignals[decodedDigit] === sortSignal(encodedDigit)
            )
        )
        .join('');

    sumOutputValues += parseInt(outputValue);
});

console.log('sumOutputValues:', sumOutputValues);
