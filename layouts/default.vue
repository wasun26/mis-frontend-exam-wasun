<template>
  <div>
    <Header v-if="!hideHeader" />
    <main></main>
    <slot />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const hideHeader = ref(route.meta.hideHeader || false);

watch(
  () => route.meta.hideHeader,
  (newValue) => {
    hideHeader.value = newValue || false;
  }
);
</script>
