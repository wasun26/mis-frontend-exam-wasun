<template>
  <div class="container mx-auto py-10">
    <h1 class="text-2xl font-bold mb-6">Edit Blog Post</h1>

    <!-- Form -->
    <form @submit.prevent="handleUpdate">
      <!-- Title Input -->
      <n-input
        v-model="form.title"
        label="Title"
        placeholder="Enter blog title"
        :error="errors.title"
        class="mb-4"
      />

      <!-- Content Input -->
      <n-textarea
        v-model="form.content"
        label="Content"
        placeholder="Write blog content..."
        :error="errors.content"
        rows="6"
        class="mb-4"
      />

      <!-- Submit Button -->
      <n-button type="submit" variant="solid" class="mr-4">
        Update Blog
      </n-button>

      <!-- Delete Button -->
      <n-button variant="error" @click="confirmDelete"> Delete Blog </n-button>
    </form>

    <!-- Confirm Delete Modal -->
    <n-modal v-model:show="showDeleteModal" title="Confirm Delete">
      <p>Are you sure you want to delete this blog post?</p>
      <template #footer>
        <n-button variant="outline" @click="showDeleteModal = false"
          >Cancel</n-button
        >
        <n-button variant="error" @click="handleDelete">Delete</n-button>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

const { startAutoRefresh } = useAuth();

onMounted(() => {
  startAutoRefresh();
});

// State
const form = ref({
  title: "",
  content: "",
});
const errors = ref({
  title: "",
  content: "",
});
const showDeleteModal = ref(false); // สำหรับแสดง Modal ยืนยันการลบ
const router = useRouter();
const route = useRoute();

// ดึงข้อมูลบทความจาก API
const fetchBlog = async () => {
  const { id } = route.params;

  try {
    const { data } = await useFetch(`/api/blogs/${id}`);
    form.value = {
      title: data.value.title,
      content: data.value.content,
    };
  } catch (error) {
    console.error("Error fetching blog:", error);
    router.push("/blogs"); // Redirect หากไม่พบบทความ
  }
};

// ตรวจสอบข้อมูลฟอร์ม
const validateForm = () => {
  let isValid = true;
  errors.value = { title: "", content: "" };

  if (!form.value.title.trim()) {
    errors.value.title = "Title is required.";
    isValid = false;
  }
  if (!form.value.content.trim()) {
    errors.value.content = "Content is required.";
    isValid = false;
  }

  return isValid;
};

// ฟังก์ชันอัปเดตบทความ
const handleUpdate = async () => {
  if (!validateForm()) return;

  const { id } = route.params;

  try {
    await useFetch(`/api/blogs/${id}`, {
      method: "PUT",
      body: form.value,
    });
    alert("Blog updated successfully");
    router.push("/blogs"); // Redirect หลังจากอัปเดตเสร็จ
  } catch (error) {
    console.error("Error updating blog:", error);
  }
};

// ฟังก์ชันลบบทความ
const handleDelete = async () => {
  const { id } = route.params;

  try {
    await useFetch(`/api/blogs/${id}`, {
      method: "DELETE",
    });
    alert("Blog deleted successfully");
    router.push("/blogs"); // Redirect หลังจากลบเสร็จ
  } catch (error) {
    console.error("Error deleting blog:", error);
  } finally {
    showDeleteModal.value = false; // ปิด Modal
  }
};

// แสดง Modal ยืนยันการลบ
const confirmDelete = () => {
  showDeleteModal.value = true;
};

// ดึงข้อมูลบทความเมื่อโหลดหน้า
onMounted(fetchBlog);
</script>
