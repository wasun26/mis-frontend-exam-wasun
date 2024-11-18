<template>
  <div class="flex items-center justify-center">
    <div>
      <UCard>
        <template #header>
          <span class="flex justify-center h1">เข้าสู่ระบบ</span>
        </template>

        <UForm
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormGroup label="ผู้ใช้งาน" name="email">
            <UInput v-model="state.email" />
          </UFormGroup>

          <UFormGroup label="รหัสผ่าน" name="password">
            <UInput v-model="state.password" type="password" />
          </UFormGroup>

          <UButton type="submit" block>เข้าสู่ระบบ</UButton>
        </UForm>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "blank",
});

async function login() {}

import { object, string, type InferType } from "yup";
import type { FormSubmitEvent } from "#ui/types";

const schema = object({
  email: string().required("Required"),
  password: string()
    .min(8, "Must be at least 8 characters")
    .required("Required"),
});

type Schema = InferType<typeof schema>;

const state = reactive({
  email: undefined,
  password: undefined,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log(event.data);
  loginAuth();
}

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
  localStorage.setItem("accessToken", data.accessToken);
};
</script>
