const fs = require("fs");

try {
  const data = fs.readFileSync("./input.txt", "utf8");
  const diagnosticReport = data.split("\n").filter((value) => value);

  const valueLength = diagnosticReport[0].length;

  /* ----- PART 1 ----- */

  let gamma = "";

  for (let i = 0; i < valueLength; i++) {
    // traversing the columns

    let count = 0;
    for (let j = 0; j < diagnosticReport.length; j++) {
      // traversing the rows

      count += parseInt(diagnosticReport[j][i]);
    }

    gamma += count > diagnosticReport.length / 2 ? "1" : "0";
  }

  let epsilon = "";
  for (const char of gamma) {
    epsilon += char === "0" ? "1" : "0";
  }

  console.log("powerConsumption:", parseInt(gamma, 2) * parseInt(epsilon, 2));

  /* ----- PART 2 ----- */

  const findRating = (type) => {
    let temp = [...diagnosticReport];

    for (let i = 0; i < valueLength; i++) {
      if (temp.length === 1) {
        break;
      }

      let count = 0;
      for (let j = 0; j < temp.length; j++) {
        count += parseInt(temp[j][i]);
      }

      const halfOfRemaining = temp.length / 2;

      const selectOnes = (() => {
        if (type === "oxygen") {
          return count >= halfOfRemaining;
        } else if (type === "co2") {
          return count < halfOfRemaining;
        }
      })();

      let valueToKeep = selectOnes ? "1" : "0";

      temp = temp.filter((rating) => rating[i] === valueToKeep);
    }

    return temp[0];
  };

  const oxygenRating = findRating("oxygen");
  const co2Rating = findRating("co2");

  console.log(
    "life support rating:",
    parseInt(oxygenRating, 2) * parseInt(co2Rating, 2)
  );
} catch (error) {
  console.error(error);
}
