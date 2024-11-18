<!-- <template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template> -->

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <ClientOnly>
    <UNotifications />
    <BackToTop />
    <Loading />
  </ClientOnly>
</template>

<script setup lang="ts"></script>
