<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { caseStudies } from '@/data/caseStudies'

const props = defineProps<{ slug: string }>()
const study = computed(() => caseStudies.find((c) => c.slug === props.slug))
</script>

<template>
  <section v-if="study" class="blueprint-grid on-brand text-paper">
    <div class="mx-auto max-w-[1200px] px-6 py-20">
      <div class="flex items-center gap-3 font-mono text-[13px] tracking-[0.14em] text-sky">
        <span class="size-2.5 rounded-full bg-accent" aria-hidden="true"></span>
        <span>CASE {{ study.number }} · {{ study.kicker }}</span>
      </div>
      <h1
        class="mt-5 max-w-[900px] font-display text-[44px] leading-[1.1] font-bold tracking-[-0.02em] sm:text-[52px]"
      >
        {{ study.title }}
      </h1>
      <p class="mt-6 max-w-[700px] text-xl text-onbrand">{{ study.summary }}</p>
      <p class="mt-5 max-w-[700px] text-onbrand">{{ study.result }}</p>
      <p class="mt-8 font-mono text-xs tracking-[0.08em] text-sky">{{ study.tags }}</p>
    </div>
  </section>
  <section class="mx-auto max-w-[1200px] px-6 py-16">
    <!-- TODO: port the full write-up from the design canvas. -->
    <p class="max-w-[700px] text-muted">The full write-up for this case study is on its way.</p>
    <RouterLink
      to="/"
      class="mt-6 inline-block border-b-2 border-accent py-2 font-semibold text-ink no-underline"
    >
      ← Back to all work
    </RouterLink>
  </section>
</template>
