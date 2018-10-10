/// <reference path="IsoWorld.ts" />

let _world: World;
let _lastTime = 0;
let _running = false;
let _init = false;

function start() {
    init();
    if (!_running) {
        _running = true;
        _lastTime = control.millis();
    }
}

function stop() {
    if (_running) {
        _running = false;
    }
}

function init() {
    if (_init) return;
    _init = true;
    game.onUpdate(() => {
        if (_running) {
            let time = control.millis();
            _world.update(time - _lastTime);
            _lastTime = time;
        }
    });

    game.onPaint(() => {
        if (_running) {
            _world.draw();
        }
    });
}

function loadWorld(world: World) {
    _world = world;
}