export default (str: string | number) => {
  return !isNaN(typeof str === "number" ? str : Number.parseFloat(str));
};
