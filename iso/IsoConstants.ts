
namespace iso {
    export const tileWidth = 32;
    export const textureWidth = 288
    export const rise = (tileWidth >> 2) + 1;
    export const run = tileWidth >> 1;
    
    export enum Direction {
        Up,
        Right,
        Down,
        Left,
        NE = Up,
        SE = Right,
        SW = Down,
        NW = Left
    }
    
    export function _calculateLeft(col: number, row: number) {
        return (col + row) * run;
    }
    
    export  function _calculateTop(col: number, row: number) {
        return (row - col) * rise;
    }
    
    export function _outOfBounds(left: number, top: number) {
        return left < -tileWidth || left > screen.width || top < -tileWidth || top > screen.height;
    }
    
    export function _drawDepth(col: number, row: number) {
        return ((row & 0xfff) << 12) | (0xfff - (col & 0xfff));
    }
}