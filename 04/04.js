const fs = require('fs');

try {
    const data = fs.readFileSync('./input.txt', 'utf8').split('\n');

    const numbers = data[0].split(',');
    const boardsData = data.slice(2);

    let boards = [];

    let count = 0;
    let tempBoard = [];
    for (let i = 0; i < boardsData.length; i++) {
        const line = boardsData[i];

        if (!line) {
            continue;
        }

        tempBoard.push(line.split(/ +/).filter((value) => !!value));
        count++;
        if (count === 5) {
            boards.push(tempBoard);
            tempBoard = [];
            count = 0;
        }
    }

    const findBingo = (gameType) => {
        let isBingo = false;
        let winningNumber;
        let winningScore = 0;
        const winningBoards = [];

        while (((gameType === 'first' && isBingo === false) || gameType === 'last') && !!numbers.length) {
            const numberCalled = numbers.shift();

            searchAllBoards: for (let h = 0; h < boards.length; h++) {
                const board = boards[h];
                const numberOfColumns = board[0].length;
                const numberOfRows = board.length;

                if (winningBoards.includes(h)) {
                    continue;
                }

                searchForMatch: for (let i = 0; i < numberOfColumns; i++) {
                    for (let j = 0; j < numberOfRows; j++) {
                        if (board[j][i] === numberCalled) {
                            board[j][i] = 'X';

                            const checkBingo = (direction) => {
                                const length = (() => {
                                    if (direction === 'column') {
                                        return numberOfRows;
                                    } else if (direction === 'row') {
                                        return numberOfColumns;
                                    }
                                })();

                                for (let k = 0; k < length; k++) {
                                    const square = (() => {
                                        if (direction === 'column') {
                                            return board[k][i];
                                        } else if (direction === 'row') {
                                            return board[j][k];
                                        }
                                    })();

                                    if (square !== 'X') {
                                        break;
                                    }
                                    if (k === length - 1) {
                                        isBingo = true;
                                        winningBoards.push(h);
                                        winningNumber = numberCalled;
                                        winningScore = board.reduce(
                                            (total, row) =>
                                                total +
                                                row.reduce(
                                                    (sum, value) => sum + (value !== 'X' ? parseInt(value) : 0),
                                                    0
                                                ),
                                            0
                                        );
                                    }
                                }
                            };
                            checkBingo('column');
                            checkBingo('row');

                            if (gameType === 'first' && isBingo) {
                                break searchAllBoards;
                            }
                            break searchForMatch;
                        }
                    }
                }
            }
        }

        return { winningScore, winningNumber };
    };

    /* ----- PART 1 ----- */

    let { winningScore, winningNumber } = findBingo('first');

    console.log('first winner final score:', winningScore * parseInt(winningNumber));

    /* ----- PART 2 ----- */

    ({ winningScore, winningNumber } = findBingo('last'));

    console.log('last winner final score:', winningScore * parseInt(winningNumber));
} catch (error) {
    console.error(error);
}
