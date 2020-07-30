let game;
let pressedKey = null;

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

    // setTimeout(() => {
    //     computePressed();
    // }, 100);
}

function draw() {
    background(220, 220, 220);
    game.draw();
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
    // pressedKey = keyCode;
    game.computeKey(keyCode);
}

// function computePressed() {
//     if (game.state === PLAYING && pressedKey) {
//         game.computeKey(pressedKey);
//     }
//
//     setTimeout(() => {
//         computePressed();
//     }, 100);
//
// }

// function keyReleased() {
//     pressedKey = null;
//
//     return false; // prevent any default behavior
// }
