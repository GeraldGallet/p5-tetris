const BG_COLOR = [255, 255, 255];
const PLAYING = 0;
const PAUSED = 1;
const LOST = 2;

const BOARD_HEIGHT = 19;
const BOARD_WIDTH = 10;
const CELL_SIZE = 35;

const GAME_WIDTH = BOARD_WIDTH * CELL_SIZE;
const GAME_HEIGHT = BOARD_HEIGHT * CELL_SIZE;

const CANVAS_HEIGHT = GAME_HEIGHT + 100;
const CANVAS_WIDTH = GAME_WIDTH * 3;

const lGrid = [
    [true, false, false],
    [true, true, true],
    [false, false, false]
];

const reverseLGrid = [
    [false, false, false],
    [true, true, true],
    [true, false, false]
];

const sGrid = [
    [false, false, true],
    [false, true, true],
    [false, true, false]
];

const reverseSGrid = [
    [true, false, false],
    [true, true, false],
    [false, true, false]
];

const iGrid = [
    [false, false, false, false],
    [true, true, true, true],
    [false, false, false, false],
    [false, false, false, false]
];

const oGrid = [
    [false, false, false, false],
    [false, true, true, false],
    [false, true, true, false],
    [false, false, false, false]
];

const tGrid = [
    [false, true, false],
    [true, true, false],
    [false, true, false]
];

const ORANGE = [240, 130, 46];
const BLUE = [53, 58, 240];
const GREEN = [45, 240, 20];
const RED = [240, 34, 24];
const CYAN = [87, 234, 240];
const YELLOW = [240, 236, 53];
const PURPLE = [220, 64, 240];

let nextPieceIndex;
let currentPiece;
let board = [];
let state = PLAYING;
