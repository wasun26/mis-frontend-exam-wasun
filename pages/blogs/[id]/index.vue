<template>
  {{ blog }}

  <div class="container mx-auto py-10">
    <n-skeleton v-if="isLoading" class="mb-4">
      <template #default>
        <h1 class="text-2xl font-bold mb-4">Loading...</h1>
      </template>
    </n-skeleton>

    <div v-else>
      <h1 class="text-2xl font-bold mb-4">{{ blog.title }}</h1>
      <p class="text-gray-600 mb-6">{{ formattedDate }}</p>

      <div class="mb-6">
        <img
          v-if="blog.img"
          :src="blog.img"
          alt="Blog Image"
          class="rounded-lg shadow-md"
        />
      </div>

      <div class="text-lg leading-relaxed">
        <p>{{ blog.content }}</p>
      </div>
    </div>

    <div v-if="error" class="text-red-500 mt-6">
      {{ error }}
    </div>

    <n-button class="mt-6" variant="outline" @click="goBack">Go Back</n-button>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});
const { startAutoRefresh } = useAuth();

startAutoRefresh();

const { getBlogById } = useBlog();

const route = useRoute();
const param = route.params;
const blog = ref<Blog>(null as any);
const isLoading = ref(true);
const error = ref(null);

const formattedDate = computed(() => {
  if (!blog.value || !blog.value) return "";
  const date = new Date(blog.value || "");
  return date.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

onMounted(() => {
  startAutoRefresh();
  getBlogById(Number(param.id));
});

// const getBlogByIdFun = async (id: number) => {
//   const response = await fetch(
//     "https://exam-api.dev.mis.cmu.ac.th/api/blogs/" + id,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + localStorage.getItem("accessToken"),
//       },
//     }
//   );
//   const data = await response.json();
//   blog.value = data;

//   if (response.status !== 200) {
//     useIToast().onError("ดึงข้อมูลไม่ได้");
//   }
// };

// ฟังก์ชันกลับไปหน้ารายการบทความ
const goBack = () => {
  router.push("/blogs");
};
</script>
