/// <reference path="./IsoTexture.ts" />
namespace iso {
    export class Tile {
        surface: Image;
        wall: WallTexture;
    
        constructor(surface: Image, wall: WallTexture) {
            this.surface = surface;
            this.wall = wall;
        }
    
        draw(left: number, top: number, leftDelta: number, rightDelta: number, flags: number) {
            if (flags & TileFlag._selected) {
                drawColorInline(7, top, left);
            }
            else if (flags & TileFlag._highlighted_emphasis) {
                drawColorInline(5, top, left);
            }
            else if (flags & TileFlag._highlighted) {
                drawColorInline(6, top, left);
            }
            else {
                drawTileInline(this.surface, top, left);
            }
    
            if (leftDelta > 0) {
                this.wall.drawLeft(left, top + rise, leftDelta);
            }
            if (rightDelta > 0) {
                this.wall.drawRight(left + run, top + rise, rightDelta)
            }
        }
    }
    
    export class FrameSet {
        id: number;
        frames: Image[];
        index: number;
        interval: number;
    
        protected timer: number;
    
        constructor(id: number, frames: Image[], interval: number) {
            this.id = id;
            this.index = 0;
            this.frames = frames;
            this.interval = interval;
        }
    
        update(dt: number) {
            if (this.timer == undefined) this.timer = this.interval;
            this.timer -= dt;
            if (this.timer <= 0) {
                this.index = (this.index + 1) % this.frames.length;
                this.timer = this.interval;
            }
        }
    
        current() {
            return this.frames[this.index];
        }
    }
    
    
    export class AssetManager {
        tileSet: Tile[];
        frameSets: FrameSet[];
    
        constructor() {
            this.tileSet = [];
            this.frameSets = [];
        }
    
        update(dt: number) {
            this.frameSets.forEach(f => f.update(dt));
        }
    
        drawTile(i: number, left: number, top: number, leftDelta: number, rightDelta: number, flags: number) {
            const tile = this.tileSet[i];
            if (tile) tile.draw(left, top, leftDelta, rightDelta, flags);
        }
    
        addFrameSet(f: FrameSet) {
            this.frameSets.push(f);
        }
    
        addTile(t: Tile) {
            this.tileSet.push(t);
        }
    }
}
