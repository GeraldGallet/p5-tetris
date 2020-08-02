let game;

let SPEED_CURSOR = 1;
let MOUSE_STATE = null;

let speedCursorX;
let speedCursorDiameter = 12;
let speedCursorTicks = 38;

function setup() {
    const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    canvas.position(((window.innerWidth - CANVAS_WIDTH) / 2), 0);
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

    // Handling paused game
    if (game.state === PAUSED) {
        printPauseMenu();
    }

    if (game.state === LOST) {
        textSize(68);
        fill(0, 0, 0);
        textAlign(CENTER, CENTER);
        text('YOU\nSUCK', CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
    }

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

function printPauseMenu() {
    fill(200, 200, 200);
    rect(CANVAS_WIDTH/6, CANVAS_HEIGHT / 2, CANVAS_WIDTH * 2/3, CANVAS_HEIGHT / 3)
    textSize(50);
    fill(0, 0, 0);
    textAlign(CENTER, CENTER);
    const toWrite = 'GAME\nPAUSED';
    text('GAME PAUSED', CANVAS_WIDTH/2, CANVAS_HEIGHT/2 + 30);

    textSize(25);
    textAlign(LEFT, CENTER);
    text('Pause / Play: Enter', CANVAS_WIDTH/6 + 10, CANVAS_HEIGHT/2 + 60);
    text('Rotate: Up', CANVAS_WIDTH/6 + 10, CANVAS_HEIGHT/2 + 85);
    text('Store: Space', CANVAS_WIDTH/6 + 10, CANVAS_HEIGHT/2 + 110);
}
