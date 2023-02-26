import { mkfile, mkdir, getChildren, getMeta, getName, isFile, isDirectory } from "@hexlet/immutable-fs-trees";
import _ from "lodash";

// Функция compressImages(), которая принимает на вход директорию, находит внутри нее картинки и "сжимает" их в два раза

const compressImages = (directoty) => {
  const children = getChildren(directoty);
  const newChildren = children.map((child) => {
    const newMeta = _.cloneDeep(getMeta(child));
    if (isDirectory(child)) {
      return mkdir(getName(child), newMeta);
    }
    if (isFile(child) && _.endsWith(getName(child), ".jpg")) {
      newMeta.size = getMeta(child).size / 2;
    }
    return mkfile(getName(child), newMeta);
  });

  const newMeta = _.cloneDeep(getMeta(directoty));
  const newDirectory = mkdir(getName(directoty), newChildren, newMeta);

  return newDirectory;
};

const tree = mkdir("my documents", [
  mkdir("documents.jpg"),
  mkfile("avatar.jpg", { size: 100 }),
  mkfile("passport.jpg", { size: 200 }),
  mkfile("family.jpg", { size: 150 }),
  mkfile("addresses", { size: 125 }),
  mkdir("presentations"),
]);

const newTree = compressImages(tree);

console.log(newTree);
// console.log(JSON.stringify(newTree, null, " "));
