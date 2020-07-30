const L_PIECE = new Shape(12.5, 1, ORANGE, lGrid, 'L_PIECE');
const REVERSE_L_PIECE = new Shape(11.5, 1, BLUE, reverseLGrid, 'REVERSE_L_PIECE');
const S_PIECE = new Shape(12, .5, GREEN, sGrid, 'S_PIECE');
const REVERSE_S_PIECE = new Shape(12, 1.5, RED, reverseSGrid, 'REVERSE_S_PIECE');
const T_PIECE = new Shape(12, 1.5, PURPLE, tGrid, 'T_PIECE');
const I_PIECE = new Shape(12, .5, CYAN, iGrid, 'I_PIECE');
const O_PIECE = new Shape(11.5, .5, YELLOW, oGrid, 'O_PIECE');
const pieces = [L_PIECE, REVERSE_L_PIECE, S_PIECE, REVERSE_S_PIECE, T_PIECE, I_PIECE, O_PIECE];

class Tetris {
    constructor(x, y) {
        this.boardX = x;
        this.boardY = y;
        this.state = PLAYING;

        this.board = null;
        this.currentPiece = null;
        this.nextPiece = null;
        this.storedPiece = null;

        this.score = 0;
        this.speed = 5;
        this.board = null;
    }

    draw() {
        // Drawing board
        for (let x = 0; x < BOARD_WIDTH; x += 1) {
            for (let y = 0; y < BOARD_HEIGHT; y += 1) {
                if (this.board && this.board[x][y] !== null) {
                    this.board[x][y].draw(this.boardX, this.boardY);
                } else {
                    strokeWeight(.5);
                    stroke(200, 200, 200);
                    fill(BG_COLOR[0], BG_COLOR[1], BG_COLOR[2]);
                    square((x * CELL_SIZE + this.boardX), (y * CELL_SIZE + this.boardY), CELL_SIZE);
                }
            }
        }

        // Printing score
        textSize(30);
        fill(0, 0, 0);
        textAlign(CENTER, CENTER);
        text(`Score: ${this.score}`, CANVAS_WIDTH / 2, 25);

        // Showing next piece
        const nextX = GAME_WIDTH * 2 + CELL_SIZE;
        textSize(30);
        fill(0, 0, 0);
        textAlign(CENTER, CENTER);
        text(`Next`, nextX + 2.5 * CELL_SIZE, 25);

        fill(255, 255, 255);
        strokeWeight(0.5);
        square(nextX, 50, 5 * CELL_SIZE);

        if (this.nextPiece) this.nextPiece.draw(this.boardX, this.boardY);

        // Showing saved piece
        const savedX = GAME_WIDTH - 6 * CELL_SIZE;
        textSize(30);
        fill(0, 0, 0);
        textAlign(CENTER, CENTER);
        text('Saved', savedX + 2.5 * CELL_SIZE, 25);

        fill(255, 255, 255);
        strokeWeight(0.5);
        square(savedX, 50, 5 * CELL_SIZE);

        if (this.storedPiece) this.storedPiece.draw(this.boardX, this.boardY);
        if (this.nextPiece) this.nextPiece.draw(this.boardX, this.boardY);
        if (this.currentPiece) this.currentPiece.draw(this.boardX, this.boardY);

        if (this.state === PAUSED) {
            textSize(68);
            fill(0, 0, 0);
            textAlign(CENTER, CENTER);
            const toWrite = 'GAME\nPAUSED';
            text(toWrite, CANVAS_WIDTH/2, CANVAS_HEIGHT/2 - 100);
            textSize(30);
            text('Pause: Enter', CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
            text('Rotate: Up', CANVAS_WIDTH/2, CANVAS_HEIGHT/2 + 50);
            text('Store: Space', CANVAS_WIDTH/2, CANVAS_HEIGHT/2 + 100);
        }

        if (this.state === LOST) {
            textSize(68);
            fill(0, 0, 0);
            textAlign(CENTER, CENTER);
            const toWrite = 'YOU\nSUCK';
            text(toWrite, CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
        }
    }

    pause() {
        this.state = PAUSED;
    }

    play() {
        this.state = PLAYING;
    }

    lose() {
        this.state = LOST;
    }

    startGame() {
        this.board = [];
        this.currentPiece = null;
        this.nextPiece = null;
        this.storedPiece = null;
        this.score = 0;
        this.play();

        for (let x = 0; x < BOARD_WIDTH; x += 1) {
            let temp = [];
            for (let y = 0; y < BOARD_HEIGHT; y += 1) {
                temp.push(null);
            }
            this.board.push(temp);
        }

        this.getNewPiece();
    }

    getNewPiece() {
        if (this.currentPiece) {
            for (let i = 0; i < this.currentPiece.grid.length; i += 1) {
                for (let j = 0; j < this.currentPiece.grid[i].length; j += 1) {
                    if (this.currentPiece.grid[i][j] !== null) {
                        this.board[this.currentPiece.grid[i][j].x][this.currentPiece.grid[i][j].y] = this.currentPiece.grid[i][j];
                    }
                }
            }

            this.computeLines();
            this.currentPiece = this.nextPiece;
            this.nextPiece = pieces[Math.floor(Math.random() * Math.floor(pieces.length))].clone();
        } else {
            this.currentPiece = pieces[Math.floor(Math.random() * Math.floor(pieces.length))].clone();
            this.nextPiece = pieces[Math.floor(Math.random() * Math.floor(pieces.length))].clone();
        }

        this.goToOrigin(this.currentPiece);
        if (!this.canExist(this.currentPiece)) {
            this.lose();
        }
    }

    computeLines() {
        for (let y = BOARD_HEIGHT - 1; y >= 0; y -= 1) {
            let lineComplete = true;
            let lineEmpty = true;
            for (let x = 0; x < BOARD_WIDTH; x += 1) {
                if (this.board[x][y] === null) {
                    lineComplete = false;
                    break;
                } else {
                    lineEmpty = false;
                }
            }

            if (lineComplete) {
                this.removeLine(y);
                y += 1;
            }
        }
    }

    removeLine(toRemove) {
        this.score += 1;
        for (let y = toRemove - 1; y > 0; y -= 1) {
            let emptyLine = true;
            for (let x = 0; x < BOARD_WIDTH; x += 1) {
                this.board[x][y + 1] = this.board[x][y];

                if (this.board[x][y] !== null) {
                    this.board[x][y + 1].down();
                    emptyLine = false;
                }

                if (y === 0) {
                    this.board[x][y] = null;
                }
            }

            if (emptyLine) {
                return;
            }
        }
    }

    computeKey(key) {
        if (key === 13) {
            switch (this.state) {
                case PAUSED:
                    this.play();
                    break;

                case PLAYING:
                    this.pause();
                    break;

                case LOST:
                    this.startGame();
                    return;
            }
        }

        if (this.state !== PLAYING) return;

        const potentialNew = this.currentPiece.clone();

        switch (key) {
            case UP_ARROW:
                potentialNew.rotate();
                break;

            case DOWN_ARROW:
                potentialNew.down();
                break;

            case LEFT_ARROW:
                potentialNew.left();
                break;

            case RIGHT_ARROW:
                potentialNew.right();
                break;

            case 32:
                this.storePiece();
                return;
        }

        if (this.canExist(potentialNew)) {
            this.currentPiece = potentialNew;
        }

        if (key === DOWN_ARROW && !this.canGoDown(this.currentPiece)) this.currentPiece.changePhase();

        if (this.currentPiece.phase === 2) {
            this.getNewPiece();
        }
    }

    canExist(piece) {
        for (let i = 0; i < piece.grid.length; i += 1) {
            for (let j = 0; j < piece.grid[i].length; j += 1) {
                if (piece.grid[i][j] !== null) {
                    let curX = piece.grid[i][j].x;
                    let curY = piece.grid[i][j].y;

                    if (curX < 0 || curX >= BOARD_WIDTH) return false;
                    if (curY < 0 || curY >= BOARD_HEIGHT) return false;

                    if (this.board[curX][curY] !== null) {
                        return false;
                    }
                }
            }
        }

        return true;
    }

    canGoDown(piece) {
        const clone = piece.clone();
        clone.down();

        return this.canExist(clone);
    }

    storePiece() {
        const temp = this.storedPiece;
        this.storedPiece = this.currentPiece;

        for (let i = 0; i < pieces.length; i += 1) {
            if (this.storedPiece.name === pieces[i].name) {
                this.storedPiece = pieces[i].clone();
                this.storedPiece.goTo(pieces[i].x - 7 - BOARD_WIDTH, pieces[i].y);
                break;
            }
        }

        if (temp === null) {
            this.currentPiece = null;
            this.currentPiece = this.nextPiece;
            this.nextPiece = pieces[Math.floor(Math.random() * Math.floor(pieces.length))].clone();
        } else {
            this.currentPiece = temp;
        }

        this.goToOrigin(this.currentPiece);
    }

    goToOrigin(piece) {
        piece.goTo(3, 0);
    }
}