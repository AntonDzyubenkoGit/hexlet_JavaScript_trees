import { mkfile, mkdir, getChildren, getMeta, getName, isFile, isDirectory } from "@hexlet/immutable-fs-trees";
import _ from "lodash";

// Функция getHiddenFilesCount(), которая считает количество скрытых файлов в директории и всех поддиректориях

const tree = mkdir("f/", [
  mkdir("etc", [
    mkdir("apache"),
    mkdir("nginx", [mkfile(".nginx.conf", { size: 800 })]),
    mkdir(".consul", [mkfile(".config.json", { size: 1200 }), mkfile("data", { size: 8200 }), mkfile("raft", { size: 80 })]),
  ]),
  mkfile(".hosts", { size: 3500 }),
  mkfile("resolve", { size: 1000 }),
]);

const getHiddenFilesCount = (node) => {
  if (isFile(node)) {
    const name = getName(node);
    return _.startsWith(name, ".") ? 1 : 0;
  }

  const children = getChildren(node);
  const count = children.map(getHiddenFilesCount);
  return _.sum(count);
};

console.log(getHiddenFilesCount(tree));

// console.log(JSON.stringify(getHiddenFilesCount(tree), null, " "));
