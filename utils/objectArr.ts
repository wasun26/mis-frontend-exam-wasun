export default {
  objToArr: (object: any) => {
    return Object.keys(object).map((key) => {
      const obj = {
        value: key,
        text: object[key],
      };
      return obj;
    });
  },
  objGetKey: (object: any, value: any) => {
    return Object.keys(object).find((key) => object[key] === value);
  },
};
