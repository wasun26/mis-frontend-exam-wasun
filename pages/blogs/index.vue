<template>
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
              size="sm"
              color="blue"
              variant="solid"
              label="Button"
              :trailing="false"
            />
          </div>

          <div><UToggle /> แสดงทั้งหมด</div>
        </div>
      </template>

      <UTable v-model="selected" head :rows="people" :columns="headers">
        <template #image-data="{ row }">
          <div class="w-20 h-20" v-if="row.img.url !== ''">
            <img :src="row.img.url" alt="" />
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
            <span class="font-bold text-gray-500">{{ row.name }}</span>
            <span><Icon name="uil:calendar-alt" /> {{ row.createdAt }} </span>
          </div>
        </template>

        <template #actions-data="{ row }">
          <div class="flex flex-col gap-2">
            <div class="flex gap-2">
              <Icon name="mdi:pin" />
              <Icon name="mdi:pin-off" />
              <UToggle /> เผยแพร่
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
  <!-- <UTooltip text="รายละเอียดการตรวจสอบของผู้ดูแล" :popper="{ arrow: true }">
    <UButton
      :to="
        localPath({
          name: 'borrow-internal-asset-id',
          params: { id: row.id },
        })
      "
      icon="i-fa6-solid:file-lines"
      size="lg"
      color="blue"
      variant="outline"
    />
  </UTooltip> -->
</template>

<script setup lang="ts">
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

const people = [
  {
    id: 1,
    name: "Lindsay Waltonaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
    img: { url: "" },
  },
  {
    id: 2,
    name: "Courtney Henry",
    title: "Designer",
    email: "courtney.henry@example.com",
    role: "Admin",
    img: { url: "" },
  },
  {
    id: 3,
    name: "Tom Cook",
    title: "Director of Product",
    email: "tom.cook@example.com",
    role: "Member",
    img: { url: "" },
  },
];

const selected = ref([people[1]]);
</script>
