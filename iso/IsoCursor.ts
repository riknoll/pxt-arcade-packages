/// <reference path="./IsoConstants.ts" />
/// <reference path="./IsoCamera.ts" />
/// <reference path="./IsoCharacter.ts" />

namespace iso {
    export class IsoCursor extends IsoCharacter {
        private map: TerrainMap;
        private color: number;
    
        constructor(map: TerrainMap, col = 0, row = 0) {
            super();
            this.map = map;
            this.color = 6;
            this.location = map.getLocation(col, row);
        }
    
        draw(c: Camera) {
            const left = _calculateLeft(this.col, this.row) - c.left;
            const top = _calculateTop(this.col, this.row) - c.top - this.map.elevation(this.col, this.row);
    
            if (_outOfBounds(left, top)) return;
    
            let upper = top + rise;
            let lower = upper;
            for (let dx = 0; dx < tileWidth; dx++) {
                screen.setPixel(left + dx, upper, this.color);
                screen.setPixel(left + dx, lower, this.color);
                if (lower != upper) {
                    screen.setPixel(left + dx, upper + 1, this.color);
                    screen.setPixel(left + dx, lower - 1, this.color)
                }
                if (!(dx & 1)) {
                    if (dx < run) {
                        --upper;
                        ++lower;
                    }
                    else {
                        ++upper;
                        --lower;
                    }
                }
            }
        }
    
        move(direction: Direction) {
            switch (direction) {
                case Direction.NE: if (this.col < this.map.width - 1) ++this.col; break;
                case Direction.SE: if (this.row < this.map.height - 1) ++this.row; break;
                case Direction.SW: if (this.col > 0) --this.col; break;
                case Direction.NW: if (this.row > 0) --this.row; break;
            }
        }
    }
}