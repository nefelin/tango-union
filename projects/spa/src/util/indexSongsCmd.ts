const processor = require("./songProcessor");
const fs = require("fs");
const ra = require("ramda");

const source = process.argv[2];

if (!source) {
  console.log("Missing first arg, need a file to index");
  process.exit(1);
}

const target = process.argv[3] || source + ".indexed";

const readAndProcess = ra.pipe(fs.readFileSync, JSON.parse, processor);

const data = readAndProcess(source);

if (data) {
  fs.writeFileSync(target, JSON.stringify(data));
} else {
  console.error("Something went wrong");
  process.exit(1);
}

export {}