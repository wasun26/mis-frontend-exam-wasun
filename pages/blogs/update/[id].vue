<template></template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

const { startAutoRefresh } = useAuth();
startAutoRefresh();
</script>
