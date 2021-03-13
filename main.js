#!/usr/bin/env node
const program = require("commander");
const App = require("./src/App");

async function main() {
    const app = new App();
    let mode;
    program
        .description("IPFS")
        .option("-m, --mode [value]", "0 - Generate and Upload, 1 - Upload final metadata")
        .action(function (args) {
            if(args.mode >= 1) {
                mode = 1;
            } else {
                mode = 0;
            }
        });
    program.parse(process.argv);
    if(mode == 0) {
        await app.uploadFiles();
        await app.generateMetadata();
    } else {
        await app.uploadMetadata();
    }

}

main();
