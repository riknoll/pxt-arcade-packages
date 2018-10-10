/// <reference path="./IsoSprite.ts" />
/// <reference path="./IsoAssets.ts" />

class IsoCharacter extends IsoSprite {
    frames: FrameSet;
    movementMask: number;

    private _oldDepth: number;

    constructor() {
        super();
    }

    get _moved(): boolean {
        if (this._oldDepth != this._drawDepth) {
            this._oldDepth = this._drawDepth;
            return true;
        }
        return false;
    }

    setFrames(frames: FrameSet) {
        this.frames = frames;
    }

    update(dt: number) {
        this.centerOnLocation();
    }

    getImage() {
        return this.frames.current();
    }

    getMovementMask() {
        return this.movementMask;
    }
}

function makeCharacter(frameSet: FrameSet, anchorX: number, anchorY: number) {
    const c = new IsoCharacter();
    c.frames = frameSet;
    c.anchorX = anchorX;
    c.anchorY = anchorY;
    return c;
}