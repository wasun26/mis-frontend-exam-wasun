<template>
  <div class="p-6 flex justify-center">
    <div class="flex flex-col p-6 w-full">
      <UCard
        :ui="{
          body: {
            base: '',
            background: '',
            padding: '',
          },
        }"
        class="w-full"
      >
        <template #header>
          <div class="flex flex-col gap-2">
            <div class="flex justify-between gap-2 w-full">
              <div class="flex gap-2">
                <span class="h1 font-bold text-xl">บทความ</span>
                <UButton
                  icon="i-heroicons-plus"
                  color="blue"
                  variant="solid"
                  label="เพิ่มบทความใหม่"
                  @click="goToCreatePage()"
                />
              </div>
              <div>
                <UToggle v-model="isToggleAll" @change="toggleAllCheck()" />
                แสดงทั้งหมด
              </div>
            </div>

            <div>
              <UInput
                v-model="queryParam.q"
                icon="i-heroicons-magnifying-glass-20-solid"
                size="sm"
                color="white"
                :trailing="false"
                placeholder="ค้นหาหัวข้อ, เนื้อหา"
                @keydown.enter="fetchBlogs()"
              />
            </div>
          </div>
        </template>

        <div class="overflow-x-auto w-full">
          <UTable
            v-model="selected"
            head
            :rows="blogs?.rows.length > 0 ? blogs?.rows : []"
            :columns="headers"
            class="table-auto min-w-full"
          >
            <template #image-data="{ row }">
              <div class="w-24 h-24 flex items-center justify-center">
                <img
                  v-if="row.Img?.url"
                  :src="`https://exam-api.dev.mis.cmu.ac.th/${row.Img.url}`"
                  alt=""
                  class="object-cover rounded-md"
                />
                <div
                  v-else
                  class="flex items-center justify-center w-full h-full bg-gray-200"
                >
                  <Icon name="uil:image-slash" style="color: black" />
                  ไม่มีภาพบทความ
                </div>
              </div>
            </template>

            <template #title-data="{ row }">
              <div class="flex flex-col min-w-[200px]">
                <span class="font-bold text-gray-500">{{ row.title }}</span>
                <span class="text-gray-400 text-sm">
                  <Icon name="uil:calendar-alt" />{{
                    dayjs(row.createdAt).format("DD MMMM YYYY, HH:mm น.")
                  }}
                </span>
              </div>
            </template>

            <template #actions-data="{ row }">
              <div class="flex flex-col gap-2">
                <div class="flex gap-2">
                  <UButton
                    :icon="row.pin ? 'mdi:pin' : 'mdi:pin-off'"
                    :color="row.pin ? 'blue' : 'gray'"
                    variant="link"
                    @click="row.pin = !row.pin"
                  />
                  <UToggle
                    v-model="row.active"
                    @change="toggleStatus(row.id)"
                  />
                  {{ row.active ? "เผยแพร่" : "ซ่อน" }}
                </div>

                <div class="flex gap-2">
                  <UTooltip text="ตรวจสอบบทความ" :popper="{ arrow: true }">
                    <UButton
                      icon="heroicons:list-bullet"
                      color="cyan"
                      square
                      variant="solid"
                      @click="navigateTo(`/blogs/${row.id}`)"
                    />
                  </UTooltip>
                  <UTooltip text="แก้ไขบทความ" :popper="{ arrow: true }">
                    <UButton
                      icon="i-heroicons-pencil-square"
                      color="yellow"
                      square
                      variant="solid"
                      @click="editBlog(row.id)"
                    />
                  </UTooltip>
                  <UTooltip
                    text="ลบบทความ"
                    :popper="{ arrow: true }"
                    v-if="!row.active"
                  >
                    <UButton
                      icon="i-heroicons-trash"
                      color="red"
                      square
                      variant="solid"
                      @click="deleteBlog(row)"
                    />
                  </UTooltip>
                </div>
              </div>
            </template>
          </UTable>
        </div>
      </UCard>
    </div>
  </div>

  <AlertDialog
    ref="alertDelete"
    type="delete"
    close-btn-color="gray"
    confirm-btn-color="red"
    icon="i-heroicons-trash"
    icon-background-color="red"
    confirm-btn-text="ลบ"
    @confirm="onDeleteBlog"
  />
</template>

<script setup lang="ts">
import type { AlertDialog } from "#components";
import dayjs from "dayjs";
import "dayjs/locale/th";

definePageMeta({
  hideHeader: false,
  middleware: ["auth"],
});
const router = useRouter();
const useBlogService = useBlog();

dayjs.locale("th");

const { startAutoRefresh } = useAuth();
const isLoading = ref(false);
const searchQuery = ref("");
const showDeleteModal = ref(false);
const blogToDelete = ref<number | null>(null);
const queryParam = ref({
  page: 1,
  size: 10,
  q: "",
  show: "active",
});
const isToggleAll = ref(false);

onMounted(async () => {
  startAutoRefresh();
  fetchBlogs();
});

const headers = [
  {
    key: "image",
    class: "text-center",
  },
  {
    label: "หัวข้อ",
    key: "title",
  },
  {
    key: "actions",
  },
];

const blogs = ref<BlogsModel>();

const selected = ref([]);

const fetchBlogs = async () => {
  isLoading.value = true;
  try {
    const response = await useBlogService.getAllBlogs(queryParam.value);
    blogs.value = response;
  } catch (error) {
    console.error("Error fetching blogs:", error);
  } finally {
    isLoading.value = false;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("th-TH", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
};

const toggleStatus = async (blog: any) => {
  try {
    await fetch(`https://exam-api.dev.mis.cmu.ac.th/api/blogs/${blog.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${useCookie("accessToken")}`,
      },
      body: JSON.stringify({ active: blog.active }),
    });
  } catch (error) {
    console.error("Error updating status:", error);
  }
};

const alertDelete = ref<InstanceType<typeof AlertDialog> | null>(null);
const deleteBlog = (data: any) => {
  alertDelete.value?.show(`ยืนยันการลบ ${data.title}`, data.id, "ลบข้อมูล");
};

const onDeleteBlog = async (blogId: number) => {
  try {
    await useBlogService.deleteBlog(blogId);

    showDeleteModal.value = false;
    blogToDelete.value = null;
    fetchBlogs();
    useIToast().onDelete("ลบบทความสำเร็จ");
  } catch (error) {
    useIToast().onError("เกิดข้อผิดพลาดในการลบบทความ");
  }
};

const editBlog = (id: number) => {
  router.push(`/blogs/${id}/update`);
};

const goToCreatePage = () => {
  router.push("/blogs/create");
};

const toggleAllCheck = () => {
  if (isToggleAll.value) {
    queryParam.value.show = "all";
  } else {
    queryParam.value.show = "active";
  }
  fetchBlogs();
};
</script>
