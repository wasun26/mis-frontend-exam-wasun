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
