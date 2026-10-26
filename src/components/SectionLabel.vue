<script setup lang="ts">
defineProps<{ label: string }>()
</script>

<template>
  <div class="mb-4 flex items-center gap-4">
    <span class="font-mono text-[13px] tracking-[0.12em] text-accent-deep">{{ label }}</span>
    <span class="h-px flex-1 bg-rule" aria-hidden="true"></span>
  </div>
</template>
