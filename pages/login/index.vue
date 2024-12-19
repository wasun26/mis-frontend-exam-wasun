<template>
  <div>
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
      <div
        class="rounded-lg divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-900 min-w-80 shadow-xl"
      >
        <div class="px-4 py-5 sm:px-6">
          <p class="font-bold text-center text-xl">เข้าสู่ระบบ</p>
        </div>
        <div class="px-4 py-5 sm:p-6">
          <UForm
            :schema="schema"
            :state="state"
            class="space-y-4"
            @submit="onSubmit()"
          >
            <UFormGroup label="ผู้ใช้งาน" name="email">
              <UInput v-model="state.email" />
            </UFormGroup>

            <UFormGroup label="รหัสผ่าน" name="password">
              <UInput v-model="state.password" type="password" />
            </UFormGroup>

            <UButton type="submit" block>เข้าสู่ระบบ</UButton>
          </UForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { object, string, type InferType } from "yup";

definePageMeta({
  hideHeader: true,
  middleware: ["auth"],
});

const router = useRouter();
const { login, logout } = useAuth();

onMounted(async () => {});

const schema = object({
  email: string().required("Required"),
  password: string()
    .min(8, "Must be at least 8 characters")
    .required("Required"),
});

type Schema = InferType<typeof schema>;

const state = reactive({
  email: "",
  password: "",
});

const onSubmit = () => {
  login(state.email, state.password);
};

const loginAuth = async () => {
  const username = state.email;
  const password = state.password;

  const response = await fetch(
    "https://exam-api.dev.mis.cmu.ac.th/api/auth/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    }
  );
  const data = await response.json();
  localStorage.setItem("accessToken", data.access_token);

  const expiration = new Date().getTime() + 5 * 60 * 1000;
  localStorage.setItem("tokenExpiration", expiration.toString());

  if (response.status === 200) {
    useIToast().onSuccess("Login success");
    navigateTo("/blogs");
  } else {
    useIToast().onWarning("Login failed");
  }
};
</script>
