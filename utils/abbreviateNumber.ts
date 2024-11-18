export default (value: number) => {
  let newValue = value.toString();
  if (value >= 1000) {
    const suffixes = ["", "k", "m", "b", "t"];
    const suffixNum = Math.floor(("" + value).length / 3);
    let shortValue: number = 0;
    for (let precision = 2; precision >= 1; precision--) {
      shortValue = parseFloat(
        (suffixNum !== 0
          ? value / Math.pow(1000, suffixNum)
          : value
        ).toPrecision(precision)
      );
      const dotLessShortValue = (shortValue + "").replace(
        /[^a-zA-Z 0-9]+/g,
        ""
      );
      if (dotLessShortValue.length <= 2) {
        break;
      }
    }
    let newShortValue: string = shortValue.toString();
    if (shortValue % 1 !== 0) {
      newShortValue = shortValue.toFixed(1);
    }
    newValue = newShortValue + suffixes[suffixNum];
  }
  return newValue;
};
