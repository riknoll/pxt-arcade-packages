/// <reference path="./IsoMap.ts" />
/// <reference path="./IsoCamera.ts" />

namespace iso {
    export class IsoSprite {
        // Closest location in world
        location: Location;
    
        // x position in world (not screen)
        x: number;
        // y position in world (not screen)
        y: number;
        // Elevation in world
        elevation: number;
    
        // Anchor offset x within image
        anchorX: number;
        // Anchor offset y within image
        anchorY: number;
    
        constructor() {
            this.x = 0;
            this.y = 0;
            this.elevation = 10;
        }
    
        get _drawDepth(): number {
            return this.location ? _drawDepth(this.location.col, this.location.row) : 0;
        }
    
        get col() {
            return this.location.col;
        }
    
        set col(c: number) {
            this.location = this.location.map.getLocation(c, this.row);
        }
    
        get row() {
            return this.location.row;
        }
    
        set row(r: number) {
            this.location = this.location.map.getLocation(this.col, r);
        }
    
        setAnchor(x: number, y: number) {
            this.anchorX = x;
            this.anchorY = y;
        }
    
        setPosition(x: number, y: number, elevation: number) {
            this.x = x;
            this.y = y;
            this.elevation = elevation;
        }
    
        getImage(): Image {
            return undefined;
        }
    
        centerOnLocation() {
            const col = this.location.col;
            const row = this.location.row;
            this.setPosition(_calculateLeft(col, row) + run, _calculateTop(col, row) + rise, this.location.elevation);
        }
    
        draw(c: Camera) {
            const left = this.x - this.anchorX - c.left;
            const top = this.y - this.anchorY - this.elevation - c.top;
            const i = this.getImage();
    
    
            if (left + i.width < 0 ||
                left > screen.width ||
                top + i.height < 0 ||
                top > screen.height) return;
    
            screen.drawTransparentImage(i, left, top);
        }
    
        update(dt: number) { }
    }
    
    export class IsoObject extends IsoSprite {
        image: Image;
    
        constructor(i: Image, location: Location) {
            super();
            this.image = i;
            this.location = location;
            this.centerOnLocation();
        }
    
        getImage() {
            return this.image;
        }
    }
}