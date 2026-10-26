<script setup lang="ts">
defineProps<{ id: string }>()
</script>

<template>
  <h2 :id="id" class="mb-9 max-w-[720px] font-display text-[38px] leading-[1.15] font-semibold">
    <slot />
  </h2>
</template>
