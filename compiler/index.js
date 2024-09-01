import compileRecursive from "./compile-recursive.js";
import err from "./errors.js";
import fs from "fs";

export default function compile(inpPath = "", outPath = "") {
  const out = `global entry
${compileRecursive(inpPath)}`;

  if (err.errors.length == 0) {
    return fs.writeFileSync(outPath, out, "utf-8");
  } else {
    err.loggAll();
  }
}