interface Item {
  [key: string]: any;
}

export default <T extends Item>(
  lists: T[],
  childName: string = "childs",
  parentKey: string = "parentId",
  keyIndex: string = "id",
  isShowChild: string = "isShowChild"
): T[] => {
  const map: Record<string | number, T & { [key: string]: any }> = {};
  const roots: T[] = [];
  for (const item of lists) {
    map[item[keyIndex]] = { ...item, [childName]: [], [isShowChild]: false };
  }
  for (const item of lists) {
    if (item[parentKey]) {
      map[item[parentKey]][childName].push(map[item[keyIndex]]);
    } else {
      roots.push(map[item[keyIndex]]);
    }
  }

  return roots;
};
