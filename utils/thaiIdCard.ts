export const thaiIdCard = {
  checkIdCard: (val: string) => {
    if (!val) {
      return false;
    }
    const idc = val.replace(/-/g, "");
    if (idc.length < 13) {
      return false;
    }
    let sum = 0;
    for (let index = 0; index < idc.length - 1; index++) {
      sum += parseInt(idc.charAt(index)) * (idc.length - index);
    }
    return (11 - (sum % 11)) % 10 === parseInt(idc.charAt(idc.length - 1));
  },
  idCardToText: (str: string) => {
    return thaiIdCard.checkIdCard(str)
      ? str.substring(0, 1) +
          "-" +
          str.substring(1, 5) +
          "-" +
          str.substring(5, 10) +
          "-" +
          str.substring(10, 12) +
          "-" +
          str.substring(12)
      : str;
  },
};
