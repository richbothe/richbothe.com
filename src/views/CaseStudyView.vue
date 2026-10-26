<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import CaseSection from '@/components/CaseSection.vue'
import { caseStudies } from '@/data/caseStudies'
import { caseStudyDetails } from '@/data/caseStudyDetails'
import { site } from '@/config/site'

const props = defineProps<{ slug: string }>()
const study = computed(() => caseStudies.find((c) => c.slug === props.slug))
const detail = computed(() => caseStudyDetails[props.slug])
const next = computed(() => {
  const slug = detail.value?.next
  return caseStudies.find((c) => c.slug === slug)
})
const nextTitle = computed(() => (next.value ? caseStudyDetails[next.value.slug]?.heroTitle : ''))
</script>

<template>
  <template v-if="study && detail">
    <section class="blueprint-grid on-brand text-paper">
      <div class="mx-auto max-w-[1200px] px-6 py-20">
        <div class="flex items-center gap-3 font-mono text-[13px] tracking-[0.14em] text-sky">
          <span class="size-2.5 rounded-full bg-accent" aria-hidden="true"></span>
          <span>CASE {{ study.number }} · {{ study.kicker }}</span>
        </div>
        <h1
          class="mt-5 max-w-[900px] font-display text-[40px] leading-[1.1] font-bold tracking-[-0.02em] sm:text-[52px]"
        >
          {{ detail.heroTitle }}
        </h1>
        <p class="mt-6 max-w-[700px] text-xl text-onbrand">{{ detail.heroSub }}</p>
        <ul class="mt-7 flex list-none flex-wrap gap-2.5 p-0">
          <li
            v-for="tag in detail.heroTags"
            :key="tag"
            class="border border-sky px-3 py-1.5 font-mono text-xs tracking-[0.08em] text-onbrand"
          >
            {{ tag }}
          </li>
        </ul>
      </div>
    </section>

    <section aria-label="At a glance" class="mx-auto max-w-[1200px] px-6 pt-12">
      <dl class="m-0 flex flex-wrap gap-5">
        <div
          v-for="g in detail.glance"
          :key="g.label"
          class="min-w-0 flex-[1_1_240px] border border-rule border-t-4 border-t-accent bg-white p-5"
        >
          <dt class="font-mono text-xs tracking-[0.1em] text-accent-deep">{{ g.label }}</dt>
          <dd class="m-0 mt-1.5 text-base">{{ g.value }}</dd>
        </div>
      </dl>
    </section>

    <CaseSection
      v-for="(section, i) in detail.sections"
      :id="`case-section-${i + 1}`"
      :key="section.label"
      :section="section"
    />

    <section class="blueprint-grid on-brand mt-20 text-paper">
      <div class="mx-auto max-w-[1200px] px-6 py-20">
        <div v-if="next" class="font-mono text-[13px] tracking-[0.12em] text-sky">NEXT CASE STUDY</div>
        <RouterLink
          v-if="next"
          :to="`/work/${next.slug}`"
          class="mt-3 inline-block border-b-[3px] border-accent font-display text-[28px] leading-[1.2] font-bold text-paper no-underline sm:text-[34px]"
        >
          {{ nextTitle }} →
        </RouterLink>
        <div class="mt-8 flex flex-wrap gap-4">
          <RouterLink
            to="/#work"
            class="inline-flex min-h-12 items-center border-2 border-paper px-6 py-3 font-semibold text-paper no-underline"
            >Back to all work</RouterLink
          >
          <a
            :href="`mailto:${site.email}`"
            class="inline-flex min-h-12 items-center bg-accent px-6 py-3.5 font-semibold text-ink no-underline"
            >{{ site.email }}</a
          >
        </div>
      </div>
    </section>
  </template>
</template>
