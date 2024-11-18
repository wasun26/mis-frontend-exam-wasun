<template>
  <div>
    <div class="flex justify-between">
      <span class="text-xs">
        *เชื่อม api แล้วแต่ยังไม่มี data เลย mock ไว้ ถ้ามี data จริงจะแทนที่
        mock
      </span>

      <UButton
        icon="heroicons:arrow-right-start-on-rectangle-16-solid"
        color="gray"
        variant="solid"
        label="ออกจากระบบ"
        @click="logoutAuth()"
      />
    </div>
    <div class="flex flex-col items-center justify-center p-6">
      <UCard
        :ui="{
          body: {
            base: '',
            background: '',
            padding: '',
          },
        }"
      >
        <template #header>
          <div class="flex justify-between gap-2">
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

        <UTable
          v-model="selected"
          head
          :rows="blogs?.rows.length > 0 ? blogs?.rows : mockBlogs.rows"
          :columns="headers"
        >
          <template #image-data="{ row }">
            <div class="w-20 h-20" v-if="row.Img.url !== ''">
              <img :src="row.Img.url" alt="" />
            </div>
            <div
              class="flex w-full h-20 bg-slate-300 justify-center items-center p-2 gap-1"
              v-else
            >
              <Icon name="uil:image-slash" style="color: black" />
              ไม่มีภาพบทความ
            </div>
          </template>

          <template #title-data="{ row }">
            <div class="flex flex-col">
              <span class="font-bold text-gray-500">{{ row.title }}</span>
              <span><Icon name="uil:calendar-alt" /> {{ row.createdAt }} </span>
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
      </UCard>
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
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

onMounted(async () => {
  if (localStorage.getItem("accessToken")) {
    await getBlogs();
  } else {
    router.push("/login");
  }
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

const selected = ref([]);
</script>
