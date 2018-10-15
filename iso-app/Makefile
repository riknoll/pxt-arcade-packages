pxt-root = ..\..\pxt
arcade-root = ..\..\pxt-arcade
lib-root = .\libs\project
external-path = .\build\external

all: build-app update-external


build-app:
	npm run build

start-app: build-app
	npm run start


build-project: update-iso
	cd $(lib-root) && node ..\..\$(pxt-root)\built\pxt.js build
	copy $(lib-root)\built\debug\binary.js $(external-path)\iso-binary.js

 
update-iso:
	node ..\scripts\build-iso.js update ..\iso

update-external: build-arcade build-pxt
	-mkdir $(external-path)
	copy $(arcade-root)\built\sim.js $(external-path)\sim.js
	copy $(arcade-root)\built\common-sim.js $(external-path)\common-sim.js
	copy $(pxt-root)\built\pxtsim.js $(external-path)\pxtsim.js

build-arcade:
	cd $(arcade-root) && pxt buildtarget

build-pxt:
	cd $(pxt-root) && jake
