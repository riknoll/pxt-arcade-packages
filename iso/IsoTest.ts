/// <reference path="IsoGame.ts" />

namespace IsoTest {
    export const idleFrames = [
        img`
        . . . . . .
        4 4 4 4 4 4
        4 4 1 4 1 4
        4 4 1 4 1 4
        4 4 4 4 4 4
        d d d 2 d d
        b b b c c c
        . b . . c .
        . 1 . . 1 .
        . e . . e .
        ` , img`
        4 4 4 4 4 4
        4 4 1 4 1 4
        4 4 1 4 1 4
        4 4 4 4 4 4
        d d d 2 d d
        b b b c c c
        . b . . c .
        . b . . c .
        . 1 . . 1 .
        . e . . e .
        `
    ]

    export const walkingFrames = [
        img`
        4 4 4 4 4 4
        4 4 1 4 1 4
        4 4 1 4 1 4
        4 4 4 4 4 4
        d d d 2 d d
        b b b b c c
        . b . . c .
        e 1 . . 1 .
        e . . . e .
        . . . . e .
        ` , img`
        . . . . . .
        4 4 4 4 4 4
        4 4 1 4 1 4
        4 4 1 4 1 4
        4 4 4 4 4 4
        d d d 2 d d
        b b b c c c
        . b . c . .
        e 1 . 1 . .
        e . . e e .
        ` , img`
        . . . . . .
        4 4 4 4 4 4
        4 4 1 4 1 4
        4 4 1 4 1 4
        4 4 4 4 4 4
        d d d 2 d d
        b b b c c c
        . . b c . .
        . e 1 1 . .
        . e . e e .
        ` , img`
        . . . . . .
        4 4 4 4 4 4
        4 4 1 4 1 4
        4 4 1 4 1 4
        4 4 4 4 4 4
        d d d 2 d d
        c c c c b b
        . c . . b .
        . 1 . e 1 .
        . e e e . .
        ` , img`
        4 4 4 4 4 4
        4 4 1 4 1 4
        4 4 1 4 1 4
        4 4 4 4 4 4
        d d d 2 d d
        c c c b b b
        . c . . b .
        . 1 . e 1 .
        . e . e . .
        . e . . . .
        ` , img`
        4 4 4 4 4 4
        4 4 1 4 1 4
        4 4 1 4 1 4
        4 4 4 4 4 4
        d d d 2 d d
        c c c b b b
        . c . . b .
        e 1 . e 1 .
        e . . e . .
        . . . . . .
        ` , img`
        4 4 4 4 4 4
        4 4 1 4 1 4
        4 4 1 4 1 4
        4 4 4 4 4 4
        d d d 2 d d
        c c c b b b
        . c . . b .
        e 1 . . 1 .
        e . . . e e
        . . . . . .
        ` , img`
        4 4 4 4 4 4
        4 4 1 4 1 4
        4 4 1 4 1 4
        4 4 4 4 4 4
        d d d 2 d d
        c c c b b b
        . c . . b .
        e 1 . . 1 .
        e . . . e .
        . . . . e .
        ` , img`
        . . . . . .
        4 4 4 4 4 4
        4 4 1 4 1 4
        4 4 1 4 1 4
        4 4 4 4 4 4
        d d d 2 d d
        c c b b b b
        . c . b . .
        e 1 . 1 . .
        e . . e e .
        ` , img`
        . . . . . .
        4 4 4 4 4 4
        4 4 1 4 1 4
        4 4 1 4 1 4
        4 4 4 4 4 4
        d d d 2 d d
        b b c c b b
        . . c b . .
        . e 1 1 . .
        . e . e e .
        ` , img`
        . . . . . .
        4 4 4 4 4 4
        4 4 1 4 1 4
        4 4 1 4 1 4
        4 4 4 4 4 4
        d d d 2 d d
        b b b b c c
        . b . . c .
        . 1 . e 1 .
        . e e e . .
        ` , img`
        4 4 4 4 4 4
        4 4 1 4 1 4
        4 4 1 4 1 4
        4 4 4 4 4 4
        d d d 2 d d
        b b b b c c
        . b . . c .
        . 1 . e 1 .
        . e . e . .
        . e . . . .
        ` , img`
        4 4 4 4 4 4
        4 4 1 4 1 4
        4 4 1 4 1 4
        4 4 4 4 4 4
        d d d 2 d d
        b b b b c c
        . b . . c .
        e 1 . e 1 .
        e . . e . .
        . . . . . .
        ` , img`
        4 4 4 4 4 4
        4 4 1 4 1 4
        4 4 1 4 1 4
        4 4 4 4 4 4
        d d d 2 d d
        b b b b c c
        . b . . c .
        e 1 . . 1 .
        e . . . e e
        . . . . . .
        `
    ]
}

function testWorld() {
    const wall = new WallTexture(2);
    wall.i.fillRect(0, 0, run, 2, 11)
    wall.i.fillRect(run, 0, run, 2, 12)

    const whiteSurface = blankTexture();
    whiteSurface.fill(1);

    const pinkSurface = blankTexture();
    pinkSurface.fill(3);

    const whiteTile = new Tile(whiteSurface, wall);
    const pinkTile = new Tile(pinkSurface, wall);
    const assets = new AssetManager();
    assets.addTile(whiteTile);
    assets.addTile(pinkTile);

    assets.addFrameSet(new FrameSet(1, IsoTest.idleFrames, 400));
    assets.addFrameSet(new FrameSet(2, IsoTest.walkingFrames, 100));

    const map = new TerrainMap(7, 7);
    for (let c = 0; c < map.width; c++) {
        for (let r = 0; r < map.height; r++) {
            if ((c + r) & 1) {
                map.setTile(c, r, 1);
            }
        }
    }

    const w = new World(map, assets);

    controller.up.onEvent(ControllerButtonEvent.Pressed, () => {
        w.moveCursor(Direction.Up);
    });
    controller.right.onEvent(ControllerButtonEvent.Pressed, () => {
        w.moveCursor(Direction.Right);
    });
    controller.down.onEvent(ControllerButtonEvent.Pressed, () => {
        w.moveCursor(Direction.Down);
    });
    controller.left.onEvent(ControllerButtonEvent.Pressed, () => {
        w.moveCursor(Direction.Left);
    });

    return w;
}

function wavyTest() {
    const w = testWorld();
    loadWorld(w);

    w.addCharacter(makeCharacter(w.assets.frameSets[0], 4, 16), 0, 0);

    let timePeriod = 1500;
    let steps = 20;
    let offset = 2 * Math.PI / steps;
    let timePerStep = timePeriod / steps;
    let amplitude = 20;

    game.onUpdate(() => {
        let startStep = Math.floor(control.millis() / timePerStep) % steps;

        for (let c = 0; c < w.map.width; c++) {
            for (let r = 0; r < w.map.height; r++) {
                const step = (startStep + Math.max(c, r)) % steps;
                w.map.setElevation(c, r, Math.floor(10 + amplitude + amplitude * Math.sin(offset * step)));
            }
        }
    });

    start();
}

function stepTest() {
    const w = testWorld();
    loadWorld(w);

    const character = makeCharacter(w.assets.frameSets[0], 4, 16);
    w.addCharacter(character, 0, 0);

    const stats = new IsoStats();
    stats.move = 4;
    stats.jump = 20;
    stats.fall = 20;

    const half = w.map.width >> 1;

    for (let c = 0; c < w.map.width; c++) {
        for (let r = 0; r < w.map.height; r++) {
            const e = Math.max(c, r);
            if (e > half) {
                w.map.setElevation(c, r, (w.map.width - e) * 5)
            }
            else {
                w.map.setElevation(c, r, (1 + e) * 5)
            }
        }
    }

    start();

    let path: IsoPath;

    controller.B.onEvent(ControllerButtonEvent.Pressed, () => {
        path = w.getPath(character, stats);
    });

    controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
        if (path) path.setEnd(w.cursor.col, w.cursor.row);
    });
}

stepTest();