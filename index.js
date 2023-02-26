// Функция removeFirstLevel(), которая принимает на вход дерево, и возвращает новое, элементами которого являются дети вложенных узлов 

const removeFirstLevel = (tree) => {
  const newTree = tree.filter((el) => Array.isArray(el));
  return newTree.flat();
};

const tree1 = [[5], 1, [3, 4]];
const tree2 = [1, 2, [3, 5], [[4, 3], 2]];

console.log(removeFirstLevel(tree2));
