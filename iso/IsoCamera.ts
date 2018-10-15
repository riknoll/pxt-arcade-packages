/// <reference path="./IsoConstants.ts" />

namespace iso {
    export class Camera {
        l: number;
        t: number;
    
        _panTimer: number;
        _destinationLeft: number;
        _destinationTop: number;
        _vx: number;
        _vy: number;
    
        get left() { return this.l | 0 }
        get top() { return this.t | 0 }
    
        constructor(l: number, t: number) {
            this.l = l;
            this.t = t;
        }
    
        update(dt: number) {
            if (this._panTimer) {
                this._panTimer -= dt;
                if (this._panTimer < 0) {
                    this._panTimer = 0;
                    this.l = this._destinationLeft;
                    this.t = this._destinationTop;
                }
                else {
                    this.l += this._vx * dt;
                    this.t += this._vy * dt;
                }
            }
        }
    
        panTo(col: number, row: number, time = 200) {
            this._panTimer = time;
            this._destinationLeft = _calculateLeft(col, row) - (screen.width >> 1);
            this._destinationTop = _calculateTop(col, row) - (screen.height >> 1);
            this._vx = (this._destinationLeft - this.l) / time;
            this._vy = (this._destinationTop - this.t) / time;
        }
    }
}