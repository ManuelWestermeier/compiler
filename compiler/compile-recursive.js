import splitLine from "./split-line.js";
import err from "./errors.js";
import fs from "fs";
import wrongValueDeclaration from "./err/wrong-value-declaration.js";

export default function compileRecursive(path = "") {
  const data = fs.readFileSync(path, "utf-8");
  var out = "";

  const lines = data.replace(/\r/g, "").split("\n");

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const line = lines[lineIndex].trim();
    const lineParts = splitLine(line);

    console.log(lineParts);

    if (lineParts[0] == "val") {
      if (lineParts[1] + lineParts[3] + lineParts[5] != "[#]")
        wrongValueDeclaration({ lineIndex, path });
      if (lineParts[6]) {
        if (lineParts[7] == "=") {
          out += `${lineParts[6]}: ${lineParts}\n`;
        } else {
        }
      } else wrongValueDeclaration({ lineIndex, path });
    }
  }

  return out;
}
