import { ThaiBaht } from "thai-baht-text-ts";
export default (num: string | number) => {
  return isNumeric(num)
    ? ThaiBaht(typeof num === "number" ? num : Number.parseFloat(num))
    : "";
};
