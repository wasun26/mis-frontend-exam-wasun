<template>
  <div class="p-6 flex justify-center">
    <div class="w-full max-w-4xl">
      <UCard class="shadow-md p-6 w-full">
        <h1 class="text-xl font-bold mb-6">เพิ่มบทความ</h1>

        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label for="title" class="block text-sm font-medium text-gray-700">
              หัวข้อ <span class="text-red-500">*</span>
            </label>
            <UInput
              id="title"
              v-model="form.title"
              placeholder="กรอกหัวข้อบทความ"
              class="mt-1"
            />
            <span v-if="errors.title" class="text-red-500 text-sm">{{
              errors.title
            }}</span>
          </div>

          <div class="mb-4">
            <label
              for="content"
              class="block text-sm font-medium text-gray-700"
            >
              เนื้อหา <span class="text-red-500">*</span>
            </label>
            <UTextarea
              id="content"
              v-model="form.content"
              :rows="5"
              placeholder="กรอกเนื้อหาของบทความ"
              class="mt-1"
            />
            <span v-if="errors.content" class="text-red-500 text-sm">{{
              errors.content
            }}</span>
          </div>

          <div class="flex flex-col mb-6 gap-1">
            <label for="image" class="block text-sm font-medium text-gray-700">
              รูปภาพ
            </label>
            <FileInput v-model="form.image" />
            <UDropzone
              id="image"
              @change="handleImageUpload"
              class="mt-2"
              placeholder="ลากรูปภาพมาวางที่นี่ หรือ คลิกเพื่อเลือกดูรูปภาพ"
            />
            <span v-if="errors.image" class="text-red-500 text-sm">{{
              errors.image
            }}</span>
          </div>

          <div class="text-center">
            <UButton
              type="submit"
              label="บันทึก"
              color="blue"
              size="lg"
              class="w-full"
              block
            />
          </div>
        </form>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});
const { startAutoRefresh } = useAuth();

const router = useRouter();
const useBlogService = useBlog();

onMounted(() => {
  startAutoRefresh();
});

const form = ref({
  title: "",
  content: "",
  image: null as File | null,
});

const errors = ref({
  title: "",
  content: "",
  image: "",
});

const handleSubmit = async () => {
  errors.value = {
    title: "",
    content: "",
    image: "",
  };

  if (!form.value.title) {
    errors.value.title = "กรุณากรอกหัวข้อบทความ";
  }
  if (!form.value.content) {
    errors.value.content = "กรุณากรอกเนื้อหาของบทความ";
  }

  if (errors.value.title || errors.value.content) return;

  try {
    const formData = new FormData();
    formData.append("title", form.value.title);
    formData.append("content", form.value.content);
    if (form.value.image) {
      formData.append("image", form.value.image);
    }

    const response = await useBlogService.createBlog({
      title: form.value.title,
      content: form.value.content,
      blog_img: form.value.image || undefined,
    });

    if (response.error) {
      useIToast().onError("เกิดข้อผิดพลาดในการสร้างบทความ");
    }

    useIToast().onSuccess("บทความถูกสร้างเรียบร้อยแล้ว");
    router.push("/blogs");
  } catch (error) {
    useIToast().onError("เกิดข้อผิดพลาดในการสร้างบทความ");
  }
};

const handleImageUpload = (file: File) => {
  form.value.image = file;
};
</script>
