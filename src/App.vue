<script setup lang="ts">
import { RouterView } from 'vue-router'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
</script>

<template>
  <a
    href="#main"
    class="absolute top-2 -left-[9999px] z-50 bg-brand-deep px-4 py-2.5 text-paper focus:left-4"
  >
    Skip to content
  </a>
  <SiteHeader />
  <main id="main">
    <RouterView />
  </main>
  <SiteFooter />
</template>
