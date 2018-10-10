const tileWidth = 32;
const textureWidth = 288
const rise = (tileWidth >> 2) + 1;
const run = tileWidth >> 1;

enum Direction {
    Up,
    Right,
    Down,
    Left,
    NE = Up,
    SE = Right,
    SW = Down,
    NW = Left
}


function _calculateLeft(col: number, row: number) {
    return (col + row) * run;
}

function _calculateTop(col: number, row: number) {
    return (row - col) * rise;
}

function _outOfBounds(left: number, top: number) {
    return left < -tileWidth || left > screen.width || top < -tileWidth || top > screen.height;
}

function _drawDepth(col: number, row: number) {
    return ((row & 0xfff) << 12) | (0xfff - (col & 0xfff));
}