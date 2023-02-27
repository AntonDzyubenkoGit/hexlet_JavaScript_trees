import { mkfile, mkdir, getChildren, getMeta, getName, isFile, isDirectory } from "@hexlet/immutable-fs-trees";
import _ from "lodash";

// Функция downcaseFileNames (), которая принимает на вход директорию (объект-дерево), приводит имена всех файлов в этой и во всех вложенных директориях к нижнему регистру.

const tree = mkdir("/", [mkdir("eTc", [mkdir("NgiNx"), mkdir("CONSUL", [mkfile("cONFig.json")])]), mkfile("hOsts")], { test: "krest" });

const downcaseFileNames = (tree) => {
  const name = getName(tree);
  const newMeta = _.cloneDeep(getMeta(tree));

  if (isFile(tree)) {
    return mkfile(name.toLowerCase(), newMeta);
  }

  const children = getChildren(tree);
  const newChildren = children.map(downcaseFileNames);
  const newTree = mkdir(name, newChildren, newMeta);

  return newTree;
};

// console.log(nameOfConst(tree));
console.log(JSON.stringify(downcaseFileNames(tree), null, " "));