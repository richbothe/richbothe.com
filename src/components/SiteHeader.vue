<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { site } from '@/config/site'

const links = [
  { label: 'Work', to: { path: '/', hash: '#work' } },
  { label: 'Skills', to: { path: '/', hash: '#skills' } },
  { label: 'My journey', to: { path: '/', hash: '#journey' } },
  { label: 'How I work', to: { path: '/', hash: '#how' } },
  { label: 'Contact me', to: { path: '/', hash: '#contact' } },
]
</script>

<template>
  <header class="border-b border-rule bg-paper">
    <div class="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-6 py-4">
      <RouterLink to="/" aria-label="Rich Bothe, home" class="flex items-center gap-3 text-ink no-underline">
        <span
          class="flex size-11 items-center justify-center border-2 border-brand font-display text-lg font-bold text-brand"
          >RB</span
        >
        <span class="font-display text-lg font-semibold">Rich Bothe</span>
      </RouterLink>
      <nav aria-label="Main" class="flex flex-wrap items-center gap-x-6 gap-y-2">
        <RouterLink
          v-for="link in links"
          :key="link.label"
          :to="link.to"
          class="py-2.5 text-base text-ink no-underline hover:text-brand"
        >
          {{ link.label }}
        </RouterLink>
        <a
          :href="site.resumeUrl"
          class="inline-flex min-h-11 items-center bg-accent px-[18px] py-3 text-[15px] font-semibold text-ink no-underline hover:bg-accent/85"
        >
          Résumé (PDF)
        </a>
      </nav>
    </div>
  </header>
</template>
