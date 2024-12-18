<template>
  <div>
    <Header v-if="!hideHeader" />
    <main></main>
    <slot />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const hideHeader = route.meta.hideHeader;
</script>
