/// <reference path="./IsoConstants.ts" />

enum TileFlag {
    Void = 1 << 0,
    Wall = 1 << 1,
    Blocked = 1 << 2,
    Water = 1 << 3,

    Unwalkable = Void | Blocked | Wall | Water,

    /* begin internal flags */
    _alignment_1 = 1 << 8,
    _alignment_2 = 1 << 9,
    _alignment_3 = 1 << 10,
    _alignment_4 = 1 << 11,
    _occupied_mask = _alignment_1 | _alignment_2 | _alignment_3 | _alignment_4,

    _marked = 1 << 12,

    _highlighted = 1 << 13,
    _highlighted_emphasis = 1 << 14,
    _selected = 1 << 15,

    _visible_flags = _highlighted | _highlighted_emphasis | _selected
}

class Location {
    col: number;
    row: number;
    map: TerrainMap;
    tile: number;
    flags: number;
    prev?: Location;

    /* internal */
    _count: number;

    get elevation() {
        return this.map.elevation(this.col, this.row);
    }
}

class TerrainMap {
    height: number;
    width: number;

    tilemap: Image;
    protected topography: Buffer;
    protected tileflags: Image;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.tilemap = image.create(width, height);
        this.tileflags = image.create(width, height);
        this.topography = control.createBuffer(width * height);
    }

    elevation(col: number, row: number) {
        return this.topography[(col | 0) + (row | 0) * this.width]
    }

    setElevation(col: number, row: number, e: number) {
        this.topography[(col | 0) + (row | 0) * this.width] = e;
    }

    setTile(col: number, row: number, t: number) {
        this.tilemap.setPixel(col, row, t);
    }

    tile(col: number, row: number) {
        return this.tilemap.getPixel(col, row);
    }

    tileInfo(col: number, row: number) {
        return this.tileflags.getPixel(col, row);
    }

    setTileInfo(col: number, row: number, flags: number) {
        this.tileflags.setPixel(col, row, flags);
    }

    setTileFlag(col: number, row: number, flag: TileFlag, on: boolean) {
        const info = this.tileInfo(col, row);

        if (on) {
            this.setTileInfo(col, row, info | flag);
        }
        else if (info & flag) {
            this.setTileInfo(col, row, info ^ flag);
        }
    }

    getLocation(col: number, row: number) {
        const res = new Location();
        res.map = this;
        res.col = col;
        res.row = row;
        res.flags = this.tileInfo(col, row);
        res.tile = this.tile(col, row);
        return res;
    }

    markOccupant(c: number, r: number, mask: number) {
        this.setTileInfo(c, r, (this.tileInfo(c, r) & (TileFlag._occupied_mask ^ 0xffffffff)) | mask);
    }

    clearOccupant(c: number, r: number) {
        this.setTileInfo(c, r, this.tileInfo(c, r) & (TileFlag._occupied_mask ^ 0xffffffff));
    }

    setHighlight(c: number, r: number, mask: number) {
        this.setTileInfo(c, r, (this.tileInfo(c, r) & (TileFlag._visible_flags ^ 0xffffffff)) | mask);
    }

    clearHighLight(c: number, r: number) {
        this.setTileInfo(c, r, this.tileInfo(c, r) & (TileFlag._visible_flags ^ 0xffffffff));
    }
}