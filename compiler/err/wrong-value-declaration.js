export default function wrongValueDeclaration({ lineIndex, path }) {
  err.Error(
    "syntax",
    "wrong value declaration, right: val[size#times] name = value, ",
    {
      line: lineIndex + 1,
      path,
    },
    2
  );
}
