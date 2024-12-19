<template>
  <div class="p-6 flex justify-center">
    <div class="w-full max-w-4xl">
      <UCard class="shadow-md p-6 w-full">
        <h1 class="text-xl font-bold mb-6">แก้ไขบทความ</h1>

        <form @submit.prevent="handleUpdate">
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
            <div v-if="form.imageUrl" class="mb-2">
              <img
                :src="form.imageUrl"
                alt="รูปภาพบทความ"
                class="w-32 h-32 object-cover rounded-md"
              />
              <UButton
                class="mt-2"
                color="red"
                variant="outline"
                @click="handleRemoveImage"
              >
                ลบรูปภาพ
              </UButton>
            </div>
            <FileInput v-else v-model="form.image" />

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
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useBlog } from "@/composables/useBlog";

definePageMeta({
  middleware: ["auth"],
});

const route = useRoute();
const router = useRouter();
const useBlogService = useBlog();
const blog = ref<Blog>(null as any);

const form = ref({
  title: "",
  content: "",
  image: null as File | null,
  imageUrl: null as string | null,
});

const errors = ref({
  title: "",
  content: "",
  image: "",
});

const fetchBlogData = async () => {
  try {
    const response = await useBlogService.getBlogById(Number(route.params.id));
    blog.value = response;

    form.value.title = response.title;
    form.value.content = response.content;
    form.value.imageUrl = response.Img?.url
      ? `https://exam-api.dev.mis.cmu.ac.th/${response.Img.url}`
      : null;
  } catch (error) {
    useIToast().onError("ไม่สามารถดึงข้อมูลบทความได้");
    router.push("/blogs");
  }
};

const handleUpdate = async () => {
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
    const data = {
      title: form.value.title,
      content: form.value.content,
      image: form.value.image || undefined,
    };

    await useBlogService.updateBlog(Number(route.params.id), data);

    useIToast().onSuccess("บันทึกบทความสำเร็จ");
    router.push(`/blogs/${route.params.id}`);
  } catch (error) {
    useIToast().onError("เกิดข้อผิดพลาดในการบันทึกบทความ");
  }
};

const handleImageUpload = (file: File) => {
  form.value.image = file;
  form.value.imageUrl = URL.createObjectURL(file);
};

const handleRemoveImage = async () => {
  try {
    await useBlogService.removeBlogImage(Number(route.params.id));
    form.value.image = null;
    form.value.imageUrl = null;
    useIToast().onDelete("ลบรูปภาพสำเร็จ");
  } catch (error) {
    useIToast().onError("ไม่สามารถลบรูปภาพได้");
  }
};

onMounted(fetchBlogData);
</script>
