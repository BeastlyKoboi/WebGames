const populate9Square = (grid, xStart, yStart, Checked) => {

    if (Checked) {

    }
    else {
        let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        let randIndex = 0;

        for (let x = xStart; x < 3; x++) {
            for (let y = yStart; y < 3; y++) {
                randIndex = Math.floor(Math.random() * nums.length);

                grid[x][y] = nums[randIndex];

                nums.splice(randIndex, 1);
            }
        }


    }
}

const createSudoku = () => {
    let grid = [9][9];

    populate9Square(grid, 0, 0, false);
    populate9Square(grid, 3, 3, false);
    populate9Square(grid, 6, 6, false);

    console.log(grid);
}


window.onload = () => {
    createSudoku();
}