let path = require("path");
let fs = require("fs");

function getFileList(dir) {
    let scripts = [];
    if (fs.existsSync(dir)) {
        let files = fs.readdirSync(dir).filter(f => f.endsWith(".ts"));
        let dependencies = {};

        files.forEach(f => {
            let fullName = path.join(dir, f);
            let contents = fs.readFileSync(fullName, { encoding: "utf8" });
            scripts.push({ name: fullName, contents: contents });

            // /// <reference path="./IsoTexture.ts" />
            let lines = contents.split(/\n/);
            lines.map(l => {
                let match = /\/\/\/\s*<reference\s+path=((?:"[^"]+")|(?::'[^']+'))\s*\/>/.exec(l);
                if (match) {
                    let ref = match[1].substring(1, match[1].length - 1);
                    return path.isAbsolute(ref) ? path.resolve(ref) : path.resolve(dir, ref);
                }
                return undefined;
            })
                .filter(ref => !!ref)
                .forEach(ref => {
                    if (!dependencies[fullName]) dependencies[fullName] = [];
                    dependencies[fullName].push(ref);
                });
        });

        scripts = scripts.sort((a, b) => {
            if (dependsOn(dependencies, a.name, b.name)) {
                return 1;
            }
            else if (dependsOn(dependencies, b.name, a.name)) {
                return -1;
            }
            return 0;
        });
    }
    return scripts;
}

function dependsOn(dependencies, script, dependency) {
    let deps = dependencies[script];
    if (!deps) return false;
    if (deps.indexOf(dependency) != -1) return true;
    for (let i = 0; i < deps.length; i++) {
        let dep = deps[i];
        if (dependsOn(dependencies, dep, dependency)) return true;
    }
    return false;
}



function main() {
    let cmd = process.argv[2];
    let dir = process.argv[3];

    if (!dir || (cmd != "debug" && cmd != "update")) {
        console.log("Usage: node build-iso.js debug|update <dir>")
        return;
    }

    let scripts = getFileList(path.resolve(dir))

    if (cmd === "debug") {
        const outDir = path.resolve(dir, "built");
        if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

        let output = "";
        scripts.forEach(s => {
            console.log("Writing " + path.relative(dir, s.name));
            output += `// FILE: [${path.relative(dir, s.name)}]\n`
            output += s.contents;
            output += "\n";
        });

        output += "\niso.test.wavyTest();\n"

        fs.writeFileSync(path.join(outDir, "out.ts"), output, { encoding: "utf8" });
    }
    else {
        let jsonPath = path.resolve(dir, "pxt.json");
        let pxtJson = JSON.parse(fs.readFileSync(jsonPath));
        pxtJson["files"] = scripts.map(s => path.relative(dir, s.name));
        fs.writeFileSync(jsonPath, JSON.stringify(pxtJson, null, 4));
    }
}

main();