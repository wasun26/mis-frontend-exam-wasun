export default (tel: string) => {
  return tel.length === 10
    ? tel.substr(0, 3) + " " + tel.substr(3, 3) + " " + tel.substr(6, 4)
    : tel;
};
