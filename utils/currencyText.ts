export default (num: number, digitOptions: Intl.NumberFormatOptions = {}) => {
  const { locale, locales } = useNuxtApp().$i18n;
  return new Intl.NumberFormat(
    useFind(locales.value, { code: locale.value })!.iso,
    digitOptions
  ).format(num);
};
