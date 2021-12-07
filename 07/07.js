const { getData } = require('../starter');
const path = require('path');

const data = getData(path.resolve('./input.txt')).slice(0, -1);

const crabs = data[0]
    .split(',')
    .map((crab) => parseInt(crab))
    .sort((a, b) => a - b);

/* ----- PART 1 ----- */

const getFuelCostAtMedian = () => {
    const median = crabs[Math.floor(crabs.length / 2)];

    let fuelCost = 0;
    crabs.forEach((position) => (fuelCost += Math.abs(position - median)));

    console.log(`to minimize fuel cost, aligning at position ${median} for a cost of`, fuelCost);
};

getFuelCostAtMedian();

/* ----- PART 2 ----- */

const getCrabFuelCost = (distance) => {
    let temp = 0;
    for (let i = distance; i > 0; i--) {
        temp += i;
    }
    return temp;
};

const getTotalFuelCost = (alignmentPosition) => {
    let tempTotal = 0;
    crabs.forEach((crabPosition) => (tempTotal += getCrabFuelCost(Math.abs(crabPosition - alignmentPosition))));
    return tempTotal;
};

const getFuelCostAtMean = () => {
    const tempMean = crabs.reduce((total, position) => total + position, 0) / crabs.length;
    const floor = Math.floor(tempMean);
    const ceil = Math.ceil(tempMean);

    const floorCost = getTotalFuelCost(floor);
    const ceilCost = getTotalFuelCost(ceil);

    const fuelCost = floorCost < ceilCost ? floorCost : ceilCost;
    const mean = floorCost < ceilCost ? floor : ceil;

    console.log(`to minimize fuel cost, aligning at position ${mean} for a cost of`, fuelCost);
};

getFuelCostAtMean();
