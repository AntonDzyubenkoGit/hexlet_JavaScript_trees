import { mkdir, mkfile } from "@hexlet/immutable-fs-trees";

// Функция generate(), которая создает и возвращает файловую систему

const generate = () => {
  const tree = mkdir(
    "nodejs-package",
    [
      mkfile("Makefile"),
      mkfile("README.md"),
      mkdir("dist"),
      mkdir("__tests__", [mkfile("half.test.js", { type: "text/javascript" })]),
      mkfile("babel.config.js", { type: "text/javascript" }),
      mkdir("node_modules", [mkdir("@babel", [mkdir("cli", [mkfile("LICENSE")])])], { owner: "root", hidden: false }),
    ],
    { hidden: true }
  );

  return tree;
};

// console.log(JSON.stringify(generate(), null, "  "));
console.log(generate());
