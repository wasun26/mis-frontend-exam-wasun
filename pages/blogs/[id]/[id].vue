<template>{{ blogData }}</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

const { startAutoRefresh } = useAuth();
startAutoRefresh();

const blogData = ref<Blog>();

const getBlogById = async (id: number) => {
  const response = await fetch(
    "https://exam-api.dev.mis.cmu.ac.th/api/blogs/" + id,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    }
  );
  const data = await response.json();
  blogData.value = data;

  if (response.status !== 200) {
    useIToast().onError("ดึงข้อมูลไม่ได้");
  }
};
</script>
