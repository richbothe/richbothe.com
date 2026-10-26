<script setup lang="ts">
import { RouterLink } from 'vue-router'
import SectionLabel from '@/components/SectionLabel.vue'
import type { Section } from '@/data/caseStudyDetails'

defineProps<{ section: Section; id: string }>()
</script>

<template>
  <section :aria-labelledby="id" class="mx-auto max-w-[1200px] px-6 pt-16">
    <div class="flex flex-wrap gap-x-12 gap-y-6">
      <div class="min-w-0 flex-[999_1_560px]">
        <SectionLabel :label="section.label" />
        <h2 :id="id" class="mb-5 font-display text-[34px] leading-[1.15] font-semibold">
          {{ section.title }}
        </h2>

        <template v-for="(block, i) in section.blocks" :key="i">
          <p v-if="block.type === 'p'" class="mb-3.5 max-w-[700px] last:mb-0">
            {{ block.text }}
            <RouterLink
              v-if="block.link"
              :to="block.link.to"
              class="text-accent-deep underline hover:text-brand-deep"
              >{{ block.link.label }}</RouterLink
            >{{ block.after }}
          </p>

          <ol v-else-if="block.type === 'steps'" class="m-0 flex max-w-[700px] list-none flex-col gap-5 p-0">
            <li v-for="(step, n) in block.items" :key="step.title" class="flex gap-[18px]">
              <span
                class="flex size-9 shrink-0 items-center justify-center bg-accent font-display font-bold text-ink"
                aria-hidden="true"
                >{{ n + 1 }}</span
              >
              <div>
                <h3 class="mb-1 font-display text-xl leading-snug font-semibold">{{ step.title }}</h3>
                <p class="m-0 text-base text-muted">{{ step.text }}</p>
              </div>
            </li>
          </ol>

          <ul v-else-if="block.type === 'bullets'" class="m-0 flex max-w-[700px] list-none flex-col gap-3 p-0">
            <li v-for="(item, n) in block.items" :key="n" class="flex items-baseline gap-3.5">
              <span class="size-2.5 shrink-0 bg-accent" aria-hidden="true"></span>
              <span
                ><strong v-if="item.lead" class="font-display">{{ item.lead }}</strong
                ><template v-if="item.lead && item.text">&nbsp;</template>{{ item.text }}</span
              >
            </li>
          </ul>

          <div v-else-if="block.type === 'pattern'" class="mt-12">
            <div class="font-mono text-[13px] tracking-[0.12em] text-accent-deep">{{ block.kicker }}</div>
            <h3 class="mt-2 mb-5 max-w-[700px] font-display text-2xl leading-snug font-semibold">
              {{ block.title }}
            </h3>
            <ol class="m-0 flex list-none flex-wrap gap-4 p-0">
              <li
                v-for="step in block.steps"
                :key="step.label"
                class="min-w-0 flex-[1_1_220px] border border-rule border-t-4 border-t-accent bg-white p-5"
              >
                <div class="font-mono text-xs tracking-[0.1em] text-accent-deep">{{ step.label }}</div>
                <div class="mt-1.5 font-display text-lg font-semibold">{{ step.title }}</div>
                <div v-if="step.tabs" class="mt-3 flex gap-2" aria-hidden="true">
                  <span
                    v-for="tab in step.tabs"
                    :key="tab"
                    class="border border-brand px-3 py-0.5 font-mono text-xs text-brand"
                    >{{ tab }}</span
                  >
                </div>
                <p class="mt-2 mb-0 text-base text-muted">{{ step.text }}</p>
              </li>
            </ol>
          </div>

          <div
            v-else-if="block.type === 'detail'"
            class="mt-10 max-w-[800px] border border-rule border-l-4 border-l-brand bg-white p-6"
          >
            <div v-if="block.kicker" class="font-mono text-xs tracking-[0.12em] text-accent-deep">
              {{ block.kicker }}
            </div>
            <h3 class="mt-1 mb-2 font-display text-[22px] font-semibold">{{ block.title }}</h3>
            <p v-if="block.intro" class="mb-4 text-base text-muted">{{ block.intro }}</p>
            <ul class="m-0 flex list-none flex-col gap-2.5 p-0 text-base">
              <li v-for="(item, n) in block.items" :key="n" class="flex items-baseline gap-3">
                <span class="size-2 shrink-0 bg-accent" aria-hidden="true"></span>
                <span
                  ><strong v-if="item.lead" class="font-display">{{ item.lead }}</strong
                  ><template v-if="item.lead && item.text">&nbsp;</template>{{ item.text }}</span
                >
              </li>
            </ul>
          </div>

          <div v-else-if="block.type === 'chips'" class="mt-10">
            <ul class="m-0 flex list-none flex-wrap gap-2.5 p-0">
              <li
                v-for="chip in block.items"
                :key="chip"
                class="border border-brand px-3.5 py-1.5 font-mono text-[13px] text-brand-deep"
              >
                {{ chip }}
              </li>
            </ul>
            <p v-if="block.note" class="mt-3 mb-0 text-sm text-quiet">{{ block.note }}</p>
          </div>

          <div v-else-if="block.type === 'courses'">
            <p class="mb-4 max-w-[700px] text-muted">{{ block.note }}</p>
            <ul class="m-0 grid max-w-[800px] list-none gap-3 p-0 sm:grid-cols-2">
              <li
                v-for="course in block.items"
                :key="course.title"
                class="border border-rule bg-white p-4"
              >
                <div class="font-display text-base font-semibold">{{ course.title }}</div>
                <div class="mt-1 font-mono text-xs tracking-[0.06em] text-quiet">{{ course.meta }}</div>
              </li>
            </ul>
          </div>
        </template>
      </div>

      <aside v-if="section.aside" class="max-w-[280px] min-w-0 flex-[1_1_220px] pt-11">
        <div class="-rotate-2 font-hand text-[28px] leading-[1.15] text-accent-deep">
          {{ section.aside.text }}
          <RouterLink
            v-if="section.aside.link"
            :to="section.aside.link.to"
            class="text-accent-deep underline hover:text-brand-deep"
            >{{ section.aside.link.label }}</RouterLink
          >
        </div>
        <div v-if="section.aside.note" class="mt-2.5 text-sm leading-snug text-quiet">
          {{ section.aside.note }}
        </div>
      </aside>
    </div>
  </section>
</template>
