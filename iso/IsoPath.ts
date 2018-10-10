/// <reference path="./IsoConstants.ts" />
/// <reference path="./IsoSprite.ts" />
/// <reference path="./IsoStats.ts" />
/// <reference path="./IsoMap.ts" />

class IsoPath {
    character: IsoCharacter;
    map: TerrainMap;
    stats: IsoStats;
    field: Location[];
    end: Location;

    constructor(map: TerrainMap, character: IsoCharacter, stats: IsoStats) {
        this.map = map;
        this.character = character;
        this.stats = stats;
        this.updateField();
        this.setEnd(character.col, character.row);
    }

    updateField() {
        this.field = bfs(this.map, this.character.col, this.character.row, this.stats);
    }

    setEnd(col: number, row: number) {
        this.end = undefined;
        for (let i = 0; i < this.field.length; i++) {
            const l = this.field[i];
            if (l.col === col && l.row === row) {
                this.end = l;
            }
            this.map.clearHighLight(l.col, l.row);
            this.map.setTileFlag(l.col, l.row, TileFlag._highlighted, true);
        }

        if (this.end) {
            let current = this.end;
            while (current) {
                this.map.setTileFlag(current.col, current.row, TileFlag._highlighted_emphasis, true);
                current = current.prev;
            }
            this.map.setTileFlag(this.end.col, this.end.row, TileFlag._selected, true);
        }
    }
}

function bfs(map: TerrainMap, x: number, y: number, stats: IsoStats): Location[] {
    for (let c = 0; c < map.width; c++) {
        for (let r = 0; r < map.height; r++) {
            map.setTileFlag(c, r, TileFlag._marked, false);
        }
    }
    map.setTileFlag(x, y, TileFlag._marked, true);

    const result: Location[] = [];
    const start = map.getLocation(x, y);
    start._count = 0;

    const queue: Location[] = [start];

    let current: Location;
    while (queue.length) {
        current = queue.shift();

        if (!(current.flags & TileFlag._occupied_mask)) result.push(current);
        if (current._count >= stats.move) continue;

        const c = current.col;
        const r = current.row;

        if (c > 0) {
            tryMove(c - 1, r, stats, current, queue);
        }
        if (c < map.width - 1) {
            tryMove(c + 1, r, stats, current, queue);
        }
        if (r > 0) {
            tryMove(c, r - 1, stats, current, queue);
        }
        if (r < map.height - 1) {
            tryMove(c, r + 1, stats, current, queue);
        }
    }

    return result;

}
    function tryMove(c2: number, r2: number, stats: IsoStats, current: Location, queue: Location[]) {
        const inf = current.map.tileInfo(c2, r2);
        if (!(inf & (TileFlag._marked | 0))) {
            const d = current.map.elevation(c2, r2) - current.elevation;

            if ((d >= 0 && d <= stats.jump) || (d < 0 && -d <= stats.fall)) {
                current.map.setTileFlag(c2, r2, TileFlag._marked, true);

                const n =current. map.getLocation(c2, r2);
                n._count = current._count + 1;
                n.prev = current;
                queue.push(n);
            }
        }
    }