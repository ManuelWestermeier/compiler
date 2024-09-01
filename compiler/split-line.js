export const allowedTextChars =
  "qwertzuiopasdfghjklyxcvbnmQWERTZUIOPASDFGHJKLYXCVBNM_";

export const allowedNumberChars = "0123456789";

export const unimportantChars = " \t\r";

export function isTextChar(char = "!") {
  return allowedTextChars.includes(char[0]);
}

export function isNumber(char = "!") {
  return allowedNumberChars.includes(char);
}

export function isTextOrNumberChar(char = "!") {
  return isTextChar(char) || isNumber(char);
}

export default function splitLine(line = "") {
  const out = [];

  //split in strings, numbers ans specials(,:+#)...
  var specialTokens = "";
  for (let index = 0; index < line.length; index++) {
    const char = line[index];

    if (isTextChar(char)) {
      if (specialTokens != "") {
        out.push(specialTokens);
        specialTokens = "";
      }
      var textTokens = char;

      while (true) {
        index++;
        const char = line[index];

        if (!isNumber(char) && !isTextOrNumberChar(char)) {
          out.push(textTokens);
          index--;
          break;
        }

        textTokens += char;
      }
    } else if (isNumber(char)) {
      if (specialTokens != "") {
        out.push(specialTokens);
        specialTokens = "";
      }
      var numberTokens = char;
      var usedDot = 0;

      while (true) {
        index++;
        const char = line[index];

        if (unimportantChars.includes(char)) continue;

        if (char == ".") {
          if (++usedDot == 2) {
            out.push(numberTokens);
            out.push(".");
            break;
          }
        }

        if (!isNumber(char) && char != ".") {
          out.push(numberTokens);
          index--;
          break;
        }

        numberTokens += char;
      }
    } else {
      if (unimportantChars.includes(char)) continue;
      if (char + line[index + 1] == "//") {
        out.push("//");
        out.push(line.substring(index + 2, line.length));
        break;
      }
      specialTokens += char;
    }
  }

  return out;
}
