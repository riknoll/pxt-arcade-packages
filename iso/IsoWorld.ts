/// <reference path="IsoCamera.ts" />
/// <reference path="IsoCharacter.ts" />
/// <reference path="IsoSprite.ts" />
/// <reference path="IsoAssets.ts" />
/// <reference path="IsoMap.ts" />
/// <reference path="IsoConstants.ts" />

class World {
    camera: Camera;
    assets: AssetManager;
    map: TerrainMap;

    characters: IsoCharacter[];
    objects: IsoObject[];
    cursor: IsoCursor;

    constructor(map: TerrainMap, assets: AssetManager) {
        this.camera = new Camera(0, 0);
        this.map = map;
        this.cursor = new IsoCursor(map);
        this.assets = assets;
        this.characters = [this.cursor];
        this.objects = [];
        this.camera.panTo(this.cursor.col, this.cursor.row);
    }

    update(dt: number) {
        this.assets.update(dt);
        this.camera.update(dt);
        this.characters.forEach(c => c.update(dt));
    }

    moveCursor(direction: Direction) {
        this.cursor.move(direction);
        this.camera.panTo(this.cursor.col, this.cursor.row);
    }

    draw() {
        const numCharacters = this.characters.length;
        const numObjects = this.objects.length;

        for (let i = 0; i < numCharacters; i++) {
            if (this.characters[i]._moved) {
                this.characters.sort(compareDepth);
                break;
            }
        }

        const map = this.map;
        const camLeft = this.camera.left;
        const camTop = this.camera.top;

        let charIndex = 0;
        let nextCharDepth = numCharacters ? this.characters[0]._drawDepth : -1;

        let objectIndex = 0;
        let nextObjDepth = numObjects ? this.objects[0]._drawDepth : -1;

        for (let r = 0; r < map.height; r++) {
            let left = _calculateLeft(map.width - 1, r) - camLeft;
            let top = _calculateTop(map.width - 1, r) - camTop;
            for (let c = map.width - 1; c >= 0; c--) {
                const e = map.elevation(c, r);
                if (!(e <= 0 ||
                    (left < - tileWidth) ||
                    (left > screen.width) ||
                    (top < - tileWidth) ||
                    (top - e > screen.height))) {
                    let leftDelta = e;
                    if (c > 0) {
                        leftDelta -= map.elevation(c - 1, r)
                    }

                    let rightDelta = e;
                    if (r < map.height - 1) {
                        rightDelta -= map.elevation(c, r + 1);
                    }

                    this.assets.drawTile(map.tile(c, r), left, top - e, leftDelta, rightDelta, this.map.tileInfo(c, r));
                }

                const d = _drawDepth(c, r);

                while (nextCharDepth === d) {
                    this.characters[charIndex].draw(this.camera);
                    charIndex++;
                    nextCharDepth = charIndex < numCharacters ? this.characters[charIndex]._drawDepth : -1;
                }

                while (nextObjDepth === d) {
                    this.objects[objectIndex].draw(this.camera);
                    objectIndex++;
                    nextObjDepth = objectIndex < numObjects ? this.objects[objectIndex]._drawDepth : -1;
                }

                left -= run;
                top += rise;
            }
        }
    }

    addObject(i: Image, col: number, row: number, noSort = false) {
        this.objects.push(new IsoObject(i, this.map.getLocation(col, row)));

        if (!noSort) this.objects.sort(compareDepth);
    }

    addCharacter(character: IsoCharacter, col: number, row: number) {
        character.location = this.map.getLocation(col, row);
        character.centerOnLocation();
        this.characters.push(character);
    }

    getPath(character: IsoCharacter, stats: IsoStats) {
        return new IsoPath(this.map, character, stats);
    }
}

function compareDepth(a: IsoSprite, b: IsoSprite) {
    return a._drawDepth - b._drawDepth;
}