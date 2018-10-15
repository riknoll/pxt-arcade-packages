pxt-root = ..\..\pxt
arcade-root = ..\..\pxt-arcade
lib-root = .\libs\project
external-path = .\public\external

all: build-app

build-app: update-external
	npm run build

start-app: build-app
	npm run start

update-external: build-arcade build-pxt build-project
	-mkdir $(external-path)
	copy $(arcade-root)\built\sim.js $(external-path)\sim.js
	copy $(arcade-root)\built\common-sim.js $(external-path)\common-sim.js
	copy $(arcade-root)\sim\public\sim.css $(external-path)\sim.css
	copy $(pxt-root)\built\pxtsim.js $(external-path)\pxtsim.js
	copy $(pxt-root)\built\web\bluebird.min.js $(external-path)\bluebird.min.js

build-project: update-iso
	cd $(lib-root) && node ..\..\$(pxt-root)\built\pxt.js build
	copy $(lib-root)\built\debug\binary.js $(external-path)\iso-binary.js

update-iso:
	node ..\scripts\build-iso.js update ..\iso

build-arcade:
	cd $(arcade-root) && pxt buildtarget

build-pxt:
	cd $(pxt-root) && jake
