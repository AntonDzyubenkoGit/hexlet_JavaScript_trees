import { mkfile, mkdir, getChildren, getMeta, getName, isFile, isDirectory } from "@hexlet/immutable-fs-trees";
import _ from "lodash";

// Функция du(), которая принимает на вход директорию и возвращает список вложенных узлов (директорий и файлов) в указанную директорию на один уровень, а так же место, которое они занимают

const tree = mkdir("/", [
  mkdir("etc", [
    mkdir("apache"),
    mkdir("nginx", [mkfile("nginx.conf", { size: 800 })]),
    mkdir("consul", [mkfile("config.json", { size: 1200 }), mkfile("data", { size: 8200 }), mkfile("raft", { size: 80 })]),
  ]),
  mkfile("hosts", { size: 3500 }),
  mkfile("resolve", { size: 1000 }),
]);

const calculateFilesSize = (node) => {
  if (isFile(node)) {
    const meta = getMeta(node);
    return meta.size;
  }

  const children = getChildren(node);
  const sizes = children.map(calculateFilesSize);

  return _.sum(sizes);
};

const du = (node) => {
  const children = getChildren(node);
  const result = children.map((child) => [getName(child), calculateFilesSize(child)]);

  return result.sort(([, size1], [, size2]) => size2 - size1);
};

console.log(du(tree));