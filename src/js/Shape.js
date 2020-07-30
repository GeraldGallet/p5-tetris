class Shape {
    constructor(x, y, rgb, grid, name) {
        this.x = x;
        this.y = y;
        this.rgb = rgb;
        this.name = name;
        this.initGrid(grid);

        this.phase = 0;
        // this.draw();
    }

    initGrid(grid) {
        this.grid = [];
        for (let i = 0; i < grid.length; i += 1) {
            const temp = [];
            for (let j = 0; j < grid[i].length; j += 1) {
                if (grid[i][j]) {
                    temp.push(new Square(this.x + i, this.y + j, CELL_SIZE, this.rgb));
                } else {
                    temp.push(null);
                }
            }

            this.grid.push(temp);
        }
    }

    refreshSquares() {
        for (let relativeX = 0; relativeX < this.grid.length; relativeX += 1) {
            for (let relativeY = 0; relativeY < this.grid[relativeX].length; relativeY += 1) {
                if (this.grid[relativeX][relativeY] !== null) {
                    this.grid[relativeX][relativeY].x = this.x + relativeX;
                    this.grid[relativeX][relativeY].y = this.y + relativeY;
                    this.grid[relativeX][relativeY].rgb = this.rgb;
                }
            }
        }
    }

    draw(x, y) {
        for (let i = 0; i < this.grid.length; i += 1) {
            for (let j = 0; j < this.grid[i].length; j += 1) {
                if (this.grid[i][j] !== null) {
                    this.grid[i][j].draw(x, y);
                }
            }
        }
    }

    changePhase(reverse = false) {
        if (reverse) {
            this.phase -= 1;
        } else {
            this.phase += 1;
        }
    }

    rotate() {
        this.rotateButBack();
        this.rotateButBack();
        this.rotateButBack();
        this.refreshSquares();
    }

    rotateButBack() {
        const newMatrix = [];
        const size = this.grid.length;

        for (let i = 0; i < size; i += 1) {
            const temp = [];
            for (let j = 0; j < size; j += 1) {
                temp.push(null);
            }

            newMatrix.push(temp);
        }

        if (size === 3) {
            newMatrix[0][0] = this.grid[2][0];
            newMatrix[0][1] = this.grid[1][0];
            newMatrix[0][2] = this.grid[0][0];
            newMatrix[1][0] = this.grid[2][1];
            newMatrix[1][1] = this.grid[1][1];
            newMatrix[1][2] = this.grid[0][1];
            newMatrix[2][0] = this.grid[2][2];
            newMatrix[2][1] = this.grid[1][2];
            newMatrix[2][2] = this.grid[0][2];
        } else {
            newMatrix[0][0] = this.grid[3][0];
            newMatrix[0][1] = this.grid[2][0];
            newMatrix[0][2] = this.grid[1][0];
            newMatrix[0][3] = this.grid[0][0];
            newMatrix[1][0] = this.grid[3][1];
            newMatrix[1][1] = this.grid[2][1];
            newMatrix[1][2] = this.grid[1][1];
            newMatrix[1][3] = this.grid[0][1];
            newMatrix[2][0] = this.grid[3][2];
            newMatrix[2][1] = this.grid[2][2];
            newMatrix[2][2] = this.grid[1][2];
            newMatrix[2][3] = this.grid[0][2];
            newMatrix[3][0] = this.grid[3][3];
            newMatrix[3][1] = this.grid[2][3];
            newMatrix[3][2] = this.grid[1][3];
            newMatrix[3][3] = this.grid[0][3];
        }

        this.grid = newMatrix;
    }

    goTo(x, y) {
        this.x = x;
        this.y = y;
        this.refreshSquares();
    }

    down() {
        this.goTo(this.x, this.y + 1);
    }

    left() {
        this.goTo(this.x - 1, this.y);
    }

    right() {
        this.goTo(this.x + 1, this.y);
    }

    clone() {
        const clone = new Shape(this.x, this.y, this.rgb, this.grid);
        clone.refreshSquares();
        clone.phase = this.phase;
        clone.name = this.name;

        return clone;
    }
}