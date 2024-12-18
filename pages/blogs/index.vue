<template>
  <div>
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
          <div class="flex justify-between gap-2 w-full">
            <div class="flex gap-2">
              <span class="h1 font-bold text-xl">บทความ</span>
              <UButton
                icon="i-heroicons-plus"
                color="blue"
                variant="solid"
                label="เพิ่มบทความใหม่"
              />
            </div>
            <div><UToggle /> แสดงทั้งหมด</div>
          </div>
        </template>

        <!-- Responsive Container -->
        <div class="overflow-x-auto w-full">
          <UTable
            v-model="selected"
            head
            :rows="blogs?.rows.length > 0 ? blogs?.rows : mockBlogs.rows"
            :columns="headers"
            class="table-auto min-w-full"
          >
            <!-- Image Column -->
            <template #image-data="{ row }">
              <div class="w-24 h-24 flex items-center justify-center">
                <img
                  v-if="row.Img.url"
                  :src="row.Img.url"
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

            <!-- Title Column -->
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

            <!-- Actions Column -->
            <template #actions-data="{ row }">
              <div class="flex flex-col gap-2">
                <div class="flex gap-2">
                  <UButton
                    :icon="row.pin ? 'mdi:pin' : 'mdi:pin-off'"
                    :color="row.pin ? 'blue' : 'gray'"
                    variant="link"
                    @click="row.pin = !row.pin"
                  />
                  <UToggle v-model="row.active" />
                  {{ row.active ? "เผยแพร่" : "ซ่อน" }}
                </div>

                <div class="flex gap-2">
                  <UTooltip text="ตรวจสอบบทความ" :popper="{ arrow: true }">
                    <UButton
                      icon="heroicons:list-bullet"
                      color="cyan"
                      square
                      variant="solid"
                    />
                  </UTooltip>
                  <UTooltip text="แก้ไขบทความ" :popper="{ arrow: true }">
                    <UButton
                      icon="i-heroicons-pencil-square"
                      color="yellow"
                      square
                      variant="solid"
                    />
                  </UTooltip>
                  <UTooltip text="ลบบทความ" :popper="{ arrow: true }">
                    <UButton
                      icon="i-heroicons-trash"
                      color="red"
                      square
                      variant="solid"
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

  <!-- <UTooltip text="" :popper="{ arrow: true }">
    <UButton
      :to="
        localPath({
          name: 'id',
          params: { id: row.id },
        })
      "
      icon="i-fa6-solid:file-lines"
      size="lg"
      color="blue"
      variant="outline"
    />
  </UTooltip> -->

  <div class="p-6">
    <!-- Header Section -->
    <div class="flex justify-between items-center mb-4">
      <div class="flex items-center gap-2">
        <h1 class="text-2xl font-bold">จัดการข้อมูลบทความ</h1>
        <UButton
          icon="i-heroicons-plus"
          color="blue"
          variant="solid"
          label="เพิ่มบทความใหม่"
          @click="goToCreatePage"
        />
      </div>
      <div class="w-1/3">
        <UInput
          v-model="searchQuery"
          placeholder="ค้นหาบทความ..."
          icon="i-heroicons-magnifying-glass"
          clearable
        />
      </div>
    </div>

    <!-- Table Section -->
    <UCard class="w-full">
      <div class="overflow-x-auto">
        <UTable
          :rows="filteredBlogs"
          :columns="headers"
          class="table-auto min-w-full"
          :loading="isLoading"
        >
          <!-- Image Column -->
          <template #image-data="{ row }">
            <div class="w-20 h-20 flex items-center justify-center bg-gray-100">
              <img
                v-if="row.Img?.url"
                :src="row.Img.url"
                alt="บทความ"
                class="object-cover w-full h-full rounded"
              />
              <span v-else class="text-gray-500 text-xs">ไม่มีภาพ</span>
            </div>
          </template>

          <!-- Title Column -->
          <template #title-data="{ row }">
            <div>
              <p class="font-bold">{{ row.title }}</p>
              <p class="text-xs text-gray-500">
                {{ formatDate(row.createdAt) }}
              </p>
            </div>
          </template>

          <!-- Actions Column -->
          <template #actions-data="{ row }">
            <div class="flex gap-2">
              <UToggle
                v-model="row.active"
                @update:modelValue="toggleStatus(row)"
              />
              <UButton
                icon="i-heroicons-pencil-square"
                color="yellow"
                square
                @click="editBlog(row.id)"
              />
              <UButton icon="i-heroicons-trash" color="red" square />
            </div>
          </template>
        </UTable>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import "dayjs/locale/th";

definePageMeta({
  middleware: ["auth"],
});
const router = useRouter();

dayjs.locale("th");

const { startAutoRefresh } = useAuth();
const isLoading = ref(false);
const searchQuery = ref("");

onMounted(async () => {
  startAutoRefresh();
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

const mockBlogs = ref({
  totalItems: 1,
  rows: [
    {
      id: 1,
      title: "lorem",
      content: "Fusce fermentum odio nec arcu",
      hit: 0,
      img_id: 5,
      user_id: 3,
      pin: false,
      active: true,
      createdAt: "2024-11-10T16:27:21.000Z",
      updatedAt: "2024-11-10T16:27:21.000Z",
      Img: {
        url: "",
      },
    },
  ],
  totalPages: 1,
  currentPage: 1,
});

const getBlogs = async () => {
  if (isTokenExpired()) {
    refreshToken();
  }

  const response = await fetch("https://exam-api.dev.mis.cmu.ac.th/api/blogs", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  });
  // body: JSON.stringify({ username, password }),
  const data = await response.json();
  blogs.value = data;

  if (response.status !== 200) {
    useIToast().onError("ดึงข้อมูลไม่ได้");
  }
};

const logoutAuth = async () => {
  const response = await fetch(
    "https://exam-api.dev.mis.cmu.ac.th/api/auth/logout",
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",

        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    }
  );
  localStorage.removeItem("accessToken");

  useIToast().onSuccess("Logout success");
  router.push("/login");
};

const refreshToken = async () => {
  const response = await fetch("/api/auth/refresh", {
    method: "POST",
    body: JSON.stringify({
      refreshToken: localStorage.getItem("refreshToken"),
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const data = await response.json();
    const newToken = data.accessToken;
    const expiration = new Date().getTime() + 5 * 60 * 1000; // 5 นาที

    localStorage.setItem("accessToken", newToken);
    localStorage.setItem("tokenExpiration", expiration.toString());
  } else {
    console.error("Failed to refresh token");
    // ลบ token และนำผู้ใช้ไปหน้า Login
    localStorage.removeItem("accessToken");
    localStorage.removeItem("tokenExpiration");
    navigateTo("/login");
  }
};

const isTokenExpired = () => {
  const expiration = localStorage.getItem("tokenExpiration");
  if (!expiration) return true;

  const now = new Date().getTime();
  return now > parseInt(expiration, 10);
};

const selected = ref([]);

// ----------------- บทความ -----------------
// ดึงข้อมูลบทความจาก API
const fetchBlogs = async () => {
  isLoading.value = true;
  try {
    const response = await fetch(
      "https://exam-api.dev.mis.cmu.ac.th/api/blogs",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      blogs.value = data.rows;
    } else {
      console.error("Failed to fetch blogs");
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
  } finally {
    isLoading.value = false;
  }
};

// แปลงวันที่
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("th-TH", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
};

// เปลี่ยนสถานะเผยแพร่บทความ
const toggleStatus = async (blog: any) => {
  try {
    await fetch(`https://exam-api.dev.mis.cmu.ac.th/api/blogs/${blog.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ active: blog.active }),
    });
  } catch (error) {
    console.error("Error updating status:", error);
  }
};

// ฟังก์ชันสำหรับแก้ไขบทความ
const editBlog = (id: number) => {
  router.push(`/blogs/${id}/update`);
};

// ไปหน้าสร้างบทความใหม่
const goToCreatePage = () => {
  router.push("/blogs/create");
};

// โหลดข้อมูลบทความเมื่อเข้า Component
onMounted(fetchBlogs);
</script>
