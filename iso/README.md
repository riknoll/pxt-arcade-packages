# Isometric game engine for pxt-arcade

An engine for making games that use isometric tilemaps like many classic
SRPG games.

## Development

The dependencies for each file are specified using triple-slash directives. The
PXT compiler ignores those directives in favor of the file list in pxt.json. To 
update that list, run this command from this repository's root:

```
node scripts/build-iso.js update iso
```

The script will resolve the dependencies and make sure that the files in `pxt.json`
are in the right order.

If you are developing in a text editor other than MakeCode, you can also create a 
debug build by running this command:

```
node scripts/build-iso.js debug iso
```

The script will output `built/out.ts` which can be copied and pasted into the MakeCode editor
for quick tests