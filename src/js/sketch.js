let game;

let SPEED_CURSOR = 1;
let MOUSE_STATE = null;

let speedCursorX;
let speedCursorDiameter = 12;
let speedCursorTicks = 38;

function setup() {
    const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    canvas.position(((window.innerWidth - CANVAS_WIDTH) / 2), 50);
    background(220, 220, 220);
    game = new Tetris((CANVAS_WIDTH - GAME_WIDTH) / 2, 50);
    game.draw();
    game.startGame();

    setTimeout(() => {
        move();
    }, 1000 / game.speed);

    speedCursorX = STORED_X + (game.speed - 0.5) / ((9.5) / (5 * CELL_SIZE));
}

function draw() {
    background(220, 220, 220);
    game.draw();

    // Speed bar
    textSize(30);
    fill(0, 0, 0);
    textAlign(CENTER, CENTER);
    text(`Speed: ${game.speed}`, STORED_X + 2.5 * CELL_SIZE, CELL_SIZE * 8);
    line(STORED_X, CELL_SIZE * 9, STORED_X + CELL_SIZE * 5, CELL_SIZE * 9);

    if (MOUSE_STATE === SPEED_CURSOR) {
        const minX = STORED_X;
        const maxX = STORED_X + (5 * CELL_SIZE);

        if (mouseX < minX) {
            speedCursorX = minX;
        } else if (mouseX > maxX) {
            speedCursorX = maxX;
        } else {
            if (speedCursorX - mouseX < (5 * CELL_SIZE) / speedCursorTicks) {
                while (speedCursorX < mouseX) {
                    speedCursorX += (5 * CELL_SIZE) / speedCursorTicks;
                }
            } else {
                while (speedCursorX > mouseX) {
                    speedCursorX -= (5 * CELL_SIZE) / speedCursorTicks;
                }
            }
        }


    }
    // const roundX = STORED_X + (game.speed - 0.5) / ((9.5) / (5 * CELL_SIZE));
    fill(200, 200, 200);
    ellipse(speedCursorX, CELL_SIZE * 9, speedCursorDiameter);

    game.speed = (((9.5) / (5 * CELL_SIZE)) * (speedCursorX - STORED_X) + 0.5).toFixed(2);
}

function move() {
    if (game.state === PLAYING) {
        game.computeKey(DOWN_ARROW);
    }

    setTimeout(() => {
        move();
    }, 1000 / game.speed);
}

function keyPressed() {
    game.computeKey(keyCode);
}

function mousePressed() {
    // If we are changing speed
    let d = dist(mouseX, mouseY, speedCursorX, CELL_SIZE * 9);
    if (d < speedCursorDiameter / 2) {
        MOUSE_STATE = SPEED_CURSOR;
    }
}

function mouseReleased() {
    MOUSE_STATE = null;
}
