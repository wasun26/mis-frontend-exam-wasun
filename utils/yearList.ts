export const yearList = () => {
  const newValue = ref<Reference[]>([]);
  const currentYear = ref(new Date().getFullYear());

  for (let index = currentYear; index.value >= 2023; index.value--) {
    newValue.value.push({
      id: index.value,
      name: (index.value + 543).toString(),
      nameEn: index.value.toString(),
    });
  }

  return newValue.value;
};
