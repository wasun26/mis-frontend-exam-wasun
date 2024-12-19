<template>
  <div
    class="flex items-center justify-between bg-white shadow-md p-4 rounded-lg"
  >
    <div class="flex items-center gap-2">
      <UBreadcrumb
        divider="/"
        :links="breadcrumbs"
        :ui="{
          active: 'text-xl font-bold text-blue-500',
          inactive: 'text-xl font-bold text-gray-500',
        }"
      />
    </div>

    <UButton
      icon="heroicons:arrow-right-start-on-rectangle-20-solid"
      color="gray"
      variant="soft"
      label="ออกจากระบบ"
      @click="logoutAuth()"
      class="hover:shadow-lg transition duration-300"
    />
  </div>
</template>

<script setup lang="ts">
const auth = useAuth();
const route = useRoute();

const useBlogService = useBlog();
const blogTitle = ref<string | null>(null); // เก็บชื่อบทความ

const fetchBlogTitle = async () => {
  if (route.params.id) {
    try {
      const response = await useBlogService.getBlogById(
        Number(route.params.id)
      );
      blogTitle.value = response.title || "ไม่มีชื่อบทความ";
    } catch (error) {
      console.error("Error fetching blog title:", error);
      blogTitle.value = "ไม่พบข้อมูลบทความ";
    }
  }
};

const breadcrumbs = computed(() => {
  const paths = [];
  if (route.path.startsWith("/blogs")) {
    paths.push({ label: "บทความ", to: "/blogs" });

    if (route.path === "/blogs/create") {
      paths.push({ label: "เพิ่มบทความ" });
    } else if (route.name === "blogs-update") {
      paths.push({
        label: "แก้ไขบทความ",
        to: `/blogs/${route.params.id}/update`,
      });
    } else if (route.name === "blogs-detail" || route.params.id) {
      fetchBlogTitle();
      paths.push({ label: blogTitle.value || "ไม่มีชื่อบทความ" });
      paths.push({ label: "แก้ไขบทความ" });
    }
  }
  return paths;
});

const logoutAuth = async () => {
  await auth.logout();
};
</script>
