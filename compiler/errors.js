export const errors = [];
export const warnings = [];

export function Error(
  type = "",
  value = "",
  meta = { line: 0, path: "/" },
  importantLevel = 0
) {
  errors.push([type, value, meta, importantLevel]);
}

export function Warn(
  type = "",
  value = "",
  meta = { line: 0, path: "/" },
  importantLevel = 0
) {
  warnings.push([type, value, meta, importantLevel]);
}

export function loggAll() {
  errors.forEach(([type, value, meta, importantLevel]) => {
    const level = new Array(importantLevel).fill("!").join("");

    console.error(`${level}Error ${type} on ${meta.path}:${meta.line}:`, value);
  });
  warnings.forEach(([type, value, meta, importantLevel]) => {
    const level = new Array(importantLevel).fill("!").join("");

    console.error(
      `${level} Warning ${type} on ${meta.path}:${meta.line}:`,
      value
    );
  });
}

export default {
  errors,
  warnings,
  Error,
  Warn,
  loggAll,
};
