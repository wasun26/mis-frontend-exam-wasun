export const yearFiscal = (date: Date): number => {
  //date = new Date("10/1/2024"); //ตลอดนี้ fix : เป็น 1 ตุลาคม 2567 เพื่อทดสอบกรรมการตรวจสอบพัสดุปี 2567
  const fiscalYear = ref<number>(0);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth() returns 0-11, so add 1 to make it 1-12

  // Fiscal year starts on October 1st
  if (month >= 10) {
    fiscalYear.value = year + 543 + 1; // Thai year (Buddhist Era) is 543 years ahead of Gregorian year
  } else {
    fiscalYear.value = year + 543;
  }

  return fiscalYear.value;
};
