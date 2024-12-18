<template>
  <div class="flex justify-between">
    <span class="text-xs">
      *เชื่อม api แล้วแต่ยังไม่มี data เลย mock ไว้ ถ้ามี data จริงจะแทนที่ mock
    </span>

    <UButton
      icon="heroicons:arrow-right-start-on-rectangle-16-solid"
      color="gray"
      variant="solid"
      label="ออกจากระบบ"
      @click="logoutAuth()"
    />
  </div>

  <div
    class="flex items-center justify-between bg-white shadow-md p-4 rounded-lg"
  >
    <!-- ส่วนข้อความ -->
    <div class="flex items-center gap-2">
      <Icon name="heroicons:exclamation-circle" class="text-blue-500 h-5 w-5" />
      <span class="text-sm text-gray-600 italic">
        เชื่อม API แล้วแต่ยังไม่มีข้อมูลจริง ระบบกำลังแสดง Mock Data
      </span>
    </div>

    <!-- ปุ่มออกจากระบบ -->
    <UButton
      icon="heroicons:arrow-left-start-on-rectangle-20-solid"
      color="red"
      variant="soft"
      label="ออกจากระบบ"
      @click="logoutAuth()"
      class="hover:shadow-lg transition duration-300"
    />
  </div>
</template>

<script setup lang="ts">
const auth = useAuth();

const logoutAuth = async () => {
  //   const response = await fetch(
  //     "https://exam-api.dev.mis.cmu.ac.th/api/auth/logout",
  //     {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",

  //         Authorization: "Bearer " + useCookie("accessToken"),
  //       },
  //     }
  //   );
  //   localStorage.removeItem("accessToken");
  await auth.logout();
};
</script>
