/// <reference path="./IsoConstants.ts" />

class WallTexture {
    i: Image;

    constructor(height: number) {
        this.i = image.create(tileWidth, height);
    }

    drawLeft(left: number, top: number, height: number) {
        let yOffset = 1;
        for (let x = 0; x < run; ++x) {
            for (let y = 0; y < height; ++y) {
                screen.setPixel(left + x, yOffset + top + y, this.i.getPixel(x, y % this.i.height));
            }

            if (!(x & 1)) {
                ++yOffset
            }
        }
    }

    drawRight(left: number, top: number, height: number) {
        let yOffset = rise;
        for (let x = 0; x < run; ++x) {
            for (let y = 0; y < height; ++y) {
                screen.setPixel(left + x, yOffset + top + y, this.i.getPixel(x + run, y % this.i.height));
            }

            if (!(x & 1)) {
                --yOffset
            }
        }
    }
}

function drawTileInline(tile: Image, top: number, left: number) {
    let dx = 0;
    let y = top + rise;
    let upper = y;
    let lower = upper + 1;

    for (let i = 0; i < textureWidth; i++) {
        screen.setPixel(dx + left, y, tile.getPixel(0, i));
        ++y;
        if (y == lower) {
            if (!(dx & 1)) {
                if (dx <  run) {
                    --upper;
                    ++lower;
                }
                else {
                    ++upper;
                    --lower;
                }
            }
            y = upper;
            ++dx;
        }
    }
}

function drawColorInline(color: number, top: number, left: number) {
    let dx = 0;
    let y = top + rise;
    let upper = y;
    let lower = upper + 1;

    for (let i = 0; i < textureWidth; i++) {
        screen.setPixel(dx + left, y, color);
        ++y;
        if (y == lower) {
            if (!(dx & 1)) {
                if (dx <  run) {
                    --upper;
                    ++lower;
                }
                else {
                    ++upper;
                    --lower;
                }
            }
            y = upper;
            ++dx;
        }
    }
}

function blankTexture() {
    return image.create(1, textureWidth);
}