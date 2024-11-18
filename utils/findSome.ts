export default (search: string, item: any) => {
  if (search && item) {
    return search
      .toString()
      .toLowerCase()
      .split(" ")
      .some(
        (ele) =>
          item.toString().toLowerCase().includes(ele) ||
          charSwitch(item).toString().toLowerCase().includes(ele)
      );
  }
  return false;
};
