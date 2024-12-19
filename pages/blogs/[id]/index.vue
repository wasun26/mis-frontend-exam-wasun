<template>
  <div class="p-6 max-w-4xl mx-auto">
    <UCard class="shadow-md p-2 w-full">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold mb-4">{{ blog?.title }}</h1>
        <div class="flex items-center gap-2">
          <span>
            สถานะ: <strong>{{ blog?.active ? "เผยแพร่" : "ซ่อน" }}</strong>
          </span>

          <UTooltip text="แก้ไขบทความ" :popper="{ arrow: true }">
            <UButton
              icon="i-heroicons-pencil-square"
              color="yellow"
              square
              variant="solid"
              @click="editBlog(Number(param.id))"
            />
          </UTooltip>
        </div>
      </div>

      <div class="flex items-center text-sm text-gray-500 mb-6">
        <span>
          <Icon name="uil:calendar-alt" />
          {{ formatDate(blog?.createdAt) }}
        </span>
      </div>

      <div class="flex flex-col items-center gap-6">
        <img
          v-if="blog?.Img?.url"
          :src="`https://exam-api.dev.mis.cmu.ac.th/${blog.Img.url}`"
          alt="บทความ"
          class="w-full max-w-lg object-cover rounded-md"
        />
        <p class="text-gray-700 text-justify leading-relaxed">
          {{ blog?.content }}
        </p>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});
const { startAutoRefresh } = useAuth();

const route = useRoute();
const useBlogService = useBlog();
const param = route.params;
const blog = ref<Blog>(null as any);
const isLoading = ref(true);

onMounted(() => {
  startAutoRefresh();
  useBlogService.getBlogById(Number(param.id));
  fetchBlog(Number(param.id));
});

const formatDate = (dateString: Date) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("th-TH", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const fetchBlog = async (blogId: number) => {
  isLoading.value = true;
  try {
    const response = await useBlogService.getBlogById(blogId);
    blog.value = response;
  } catch (error) {
    useIToast().onError("เกิดข้อผิดพลาดในการโหลดข้อมูลบทความ");
  } finally {
    isLoading.value = false;
  }
};

const editBlog = (blogId: number) => {
  navigateTo(`/blogs/${blogId}/update`);
};
</script>
