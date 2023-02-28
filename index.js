import { mkfile, mkdir, getChildren, getMeta, getName, isFile, isDirectory } from "@hexlet/immutable-fs-trees";
import treeData from './tree.js'
import _ from "lodash";

// Функция changeClass(), которая принимает на вход html-дерево и заменяет во всех узлах имя класса, имена классов передаются через параметры

const changeClass = (tree, classNameFrom, classNameTo) => {
  const innerFunc = (node) => {
    const updatedNode = { ...node };

    if (_.has(node, 'className')) {
      const newClassName = classNameFrom === node.className ? classNameTo : node.className;
      updatedNode.className = newClassName;
    }

    if (node.type === 'tag-internal') {
      const newChildren = node.children.map(innerFunc);
      updatedNode.children = newChildren;
    }

    return updatedNode;
  };

  return innerFunc(tree);
};


const result = changeClass(treeData.htmlTreeSource, 'hexlet-community', '!!!!!=====!!!!!');

console.log(result);
// console.log(JSON.stringify(result, null, ' '))
