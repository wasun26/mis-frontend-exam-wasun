<template>
  <div class="container mx-auto py-10">
    <h1 class="text-2xl font-bold mb-6">Create a New Blog Post</h1>

    <!-- Form -->
    <form @submit.prevent="handleSubmit">
      <!-- Title Input -->
      <n-input
        v-model="form.title"
        label="Title"
        placeholder="Enter the blog title"
        :error="errors.title"
        class="mb-4"
      />

      <!-- Content Input -->
      <n-textarea
        v-model="form.content"
        label="Content"
        placeholder="Write the blog content..."
        :error="errors.content"
        rows="6"
        class="mb-4"
      />

      <!-- Image Upload -->
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2">Upload Image</label>
        <input
          type="file"
          @change="handleFileUpload"
          accept="image/*"
          class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
        />
        <span v-if="errors.image" class="text-red-500 text-sm">{{
          errors.image
        }}</span>
      </div>

      <!-- Submit Button -->
      <n-button type="submit" variant="solid" class="w-full"> Submit </n-button>
    </form>
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

// Form Data
const form = ref({
  title: "",
  content: "",
  image: null,
});

// Validation Errors
const errors = ref({
  title: "",
  content: "",
  image: "",
});

// Router
const router = useRouter();

/**
 * Validate form inputs
 */
const validateForm = () => {
  let isValid = true;
  errors.value = { title: "", content: "", image: "" };

  if (!form.value.title.trim()) {
    errors.value.title = "Title is required.";
    isValid = false;
  }
  if (!form.value.content.trim()) {
    errors.value.content = "Content is required.";
    isValid = false;
  }
  if (!form.value.image) {
    errors.value.image = "Image is required.";
    isValid = false;
  }

  return isValid;
};

const handleFileUpload = (event: any) => {
  const file = event.target.files[0];
  if (file) {
    form.value.image = file;
  }
};

const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }

  // Prepare form data for API
  const formData = new FormData();
  formData.append("title", form.value.title);
  formData.append("content", form.value.content);
  if (form.value.image) {
    formData.append("image", form.value.image);
  }

  try {
    // Call API to create a new blog
    const response = await useIFetch("/api/blogs", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.error) {
      console.error("API Error:", response.error);
      return;
    }

    console.log("Blog created successfully:", response);
    router.push("/blogs"); // Redirect to blogs list
  } catch (error) {
    console.error("Submission failed:", error);
  }
};
</script>
