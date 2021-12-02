const fs = require("fs");

try {
  const data = fs.readFileSync("./input.txt", "utf8");
  const courseChanges = data.split("\n").filter((value) => value);

  /* ----- PART 1 ----- */

  let x = 0,
    y = 0;

  courseChanges.forEach((change) => {
    const temp = change.split(" ");
    const direction = temp[0];
    const value = parseInt(temp[1]);

    if (direction === "forward") {
      x += value;
    } else if (direction === "up") {
      y -= value;
    } else if (direction === "down") {
      y += value;
    }
  });

  console.log("(without aim) horizontal position x depth:", x * y);

  /* ----- PART 2 ----- */

  let aim = 0;
  x = 0;
  y = 0;

  courseChanges.forEach((change) => {
    const temp = change.split(" ");
    const direction = temp[0];
    const value = parseInt(temp[1]);

    if (direction === "forward") {
      x += value;
      y += aim * value;
    } else if (direction === "up") {
      aim -= value;
    } else if (direction === "down") {
      aim += value;
    }
  });

  console.log("(with aim) horizontal position x depth:", x * y);
} catch (error) {
  console.error(error);
}
