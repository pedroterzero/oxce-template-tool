import { readFileSync, writeFileSync } from "fs";
import { parse, scalarOptions, stringify } from "yaml";
import { Templates } from "./templates";

const doc = parse(readFileSync('armors.yml').toString());

const typesToProcess = [
    'armors',
];

scalarOptions.str.fold.lineWidth = Number.MAX_SAFE_INTEGER; // manual says 0 but that does not work

const out: {[key: string]: {[key: string]: any}[]} = {};
for (const type of typesToProcess) {
    if (!(type in doc)) {
        continue;
    }

    out[type] = [];

    let newEntry = {};
    for (const entry of doc[type]) {
        const scripts: {[key: string]: string} = {};
        scripts[entry.template] = Templates.template(entry.template, entry.vars);

        newEntry = {
            type: entry.type,
            scripts
        };

        out[type].push(newEntry); 
    }

    writeFileSync('armors.out.yml', stringify(out));
}

