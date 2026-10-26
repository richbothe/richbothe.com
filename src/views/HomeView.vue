<script setup lang="ts">
import { RouterLink } from 'vue-router'
import SectionLabel from '@/components/SectionLabel.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import portrait from '@/assets/rb.jpg'
import { site } from '@/config/site'
import { caseStudies } from '@/data/caseStudies'
import { cares, skills, journey, howIWork } from '@/data/home'
</script>

<template>
  <!-- Hero -->
  <section id="top" class="blueprint-grid on-brand text-paper">
    <div class="mx-auto flex max-w-[1200px] flex-wrap items-center gap-10 px-6 pt-20 pb-[120px]">
      <div class="min-w-0 flex-[999_1_520px]">
        <div class="flex items-center gap-3 font-mono text-[13px] tracking-[0.14em] text-sky">
          <span class="size-2.5 rounded-full bg-accent" aria-hidden="true"></span>
          <span>FRONT-END DEVELOPER · REMOTE U.S.</span>
        </div>
        <h1
          class="mt-6 font-display text-[44px] leading-[1.05] font-bold tracking-[-0.02em] sm:text-[64px]"
        >
          Front-end developer. Built carefully, for real people.
        </h1>
        <p class="mt-7 max-w-[620px] text-xl text-onbrand">
          I'm Rich. I build accessible, well-made web tools, and I care how they feel to use. 9+
          years on public-facing tools with Vue.js and ArcGIS, after a career of working closely
          with clients and teams.
        </p>
        <div class="mt-9 flex flex-wrap gap-4">
          <RouterLink
            :to="{ path: '/', hash: '#work' }"
            class="inline-flex min-h-12 items-center bg-accent px-6 py-3.5 font-semibold text-ink no-underline hover:bg-accent/85"
          >
            View my work
          </RouterLink>
          <a
            :href="site.resumeUrl"
            class="inline-flex min-h-12 items-center border-2 border-paper px-6 py-3 font-semibold text-paper no-underline hover:bg-paper/10"
          >
            Download résumé
          </a>
        </div>
      </div>
      <div class="relative min-w-0 max-w-[360px] flex-[1_1_280px]">
        <img
          :src="portrait"
          width="576"
          height="720"
          alt="Portrait of Rich Bothe, smiling, wearing glasses and a dark patterned sweater"
          class="block aspect-[4/5] h-auto w-full border-2 border-accent object-cover"
        />
        <div class="mt-3 -rotate-3 font-hand text-[28px] text-accent" aria-hidden="true">
          hi, that's me ↑
        </div>
      </div>
    </div>
  </section>

  <!-- 01 What I care about -->
  <section aria-labelledby="care-h" class="mx-auto max-w-[1200px] px-6 pt-22 pb-10">
    <SectionLabel label="01 — WHAT I CARE ABOUT" />
    <SectionHeading id="care-h">Four things I try to bring to every project.</SectionHeading>
    <div class="flex flex-wrap gap-6">
      <div
        v-for="care in cares"
        :key="care.title"
        class="min-w-0 flex-[1_1_250px] border border-t-4 border-rule border-t-accent bg-white p-7"
      >
        <h3 class="mb-2.5 font-display text-[22px]">{{ care.title }}</h3>
        <p class="text-base text-muted">{{ care.text }}</p>
      </div>
    </div>
  </section>

  <!-- 02 Selected work -->
  <section id="work" aria-labelledby="work-h" class="mx-auto max-w-[1200px] px-6 pt-18 pb-10">
    <SectionLabel label="02 — SELECTED WORK" />
    <SectionHeading id="work-h">Case studies: the problem, my role, and what changed.</SectionHeading>
    <div class="flex flex-wrap gap-6">
      <article
        v-for="study in caseStudies"
        :key="study.slug"
        class="flex min-w-0 flex-[1_1_320px] flex-col border border-rule bg-white"
      >
        <div class="bg-brand px-7 py-5 font-mono text-xs tracking-[0.1em] text-sky">
          CASE {{ study.number }} · {{ study.kicker }}
        </div>
        <div class="flex flex-1 flex-col gap-3.5 p-7">
          <h3 class="font-display text-2xl leading-[1.2]">{{ study.title }}</h3>
          <p class="text-base text-muted">{{ study.summary }}</p>
          <p class="text-[15px] text-quiet">{{ study.result }}</p>
          <div class="font-mono text-xs tracking-[0.06em] text-muted">{{ study.tags }}</div>
          <RouterLink
            :to="`/work/${study.slug}`"
            class="mt-auto inline-flex min-h-11 items-center self-start border-b-2 border-accent py-2 font-semibold text-ink no-underline hover:text-brand"
          >
            Read the story →
          </RouterLink>
        </div>
      </article>
    </div>
  </section>

  <!-- 03 Skills -->
  <section id="skills" aria-labelledby="skills-h" class="mx-auto max-w-[1200px] px-6 pt-18 pb-10">
    <SectionLabel label="03 — SKILLS, WITH PROOF" />
    <SectionHeading id="skills-h">Every skill links to where I used it.</SectionHeading>
    <div class="flex flex-wrap gap-6">
      <div
        v-for="group in skills"
        :key="group.title"
        class="min-w-0 flex-[1_1_260px] border-l-[3px] border-accent py-1 pl-5"
      >
        <h3 class="mb-3 font-display text-xl">{{ group.title }}</h3>
        <p class="mb-3 font-mono text-[13px] leading-[1.9] tracking-[0.04em] text-muted">
          {{ group.items }}
        </p>
        <RouterLink
          :to="`/work/${group.slug}`"
          class="text-[15px] font-semibold text-accent-deep hover:text-brand-deep"
        >
          {{ group.proof }}
        </RouterLink>
      </div>
    </div>
  </section>

  <!-- 04 My journey -->
  <section id="journey" aria-labelledby="journey-h" class="mx-auto max-w-[1200px] px-6 pt-18 pb-10">
    <SectionLabel label="04 — MY JOURNEY" />
    <SectionHeading id="journey-h">
      From client support to front-end lead, and what each step taught me.
    </SectionHeading>
    <ol class="m-0 list-none border-l-2 border-rule p-0">
      <li v-for="step in journey" :key="step.title" class="relative pr-0 pb-8 pl-8">
        <span
          class="absolute top-2 -left-[9px] size-4 rounded-full border-[3px] border-paper"
          :class="step.current ? 'bg-accent' : 'bg-brand'"
          aria-hidden="true"
        ></span>
        <div class="font-mono text-[13px] tracking-[0.1em] text-accent-deep">{{ step.when }}</div>
        <h3 class="my-1 font-display text-[22px]">{{ step.title }}</h3>
        <p class="max-w-[720px] text-base text-muted">{{ step.text }}</p>
      </li>
    </ol>
  </section>

  <!-- 05 How I work -->
  <section id="how" aria-labelledby="how-h" class="mx-auto max-w-[1200px] px-6 pt-18 pb-10">
    <SectionLabel label="05 — HOW I WORK" />
    <SectionHeading id="how-h">What it's like to have me on your team.</SectionHeading>
    <div class="flex flex-wrap gap-x-12 gap-y-6">
      <div v-for="item in howIWork" :key="item.title" class="min-w-0 max-w-[560px] flex-[1_1_400px]">
        <h3 class="mb-1.5 font-display text-xl">{{ item.title }}</h3>
        <p class="text-base text-muted">{{ item.text }}</p>
      </div>
    </div>
  </section>

  <!-- 06 Contact -->
  <section
    id="contact"
    aria-labelledby="contact-h"
    class="blueprint-grid on-brand mt-18 text-paper"
  >
    <div class="mx-auto max-w-[1200px] px-6 py-20">
      <div class="font-mono text-[13px] tracking-[0.12em] text-sky">06 — CONTACT ME</div>
      <h2
        id="contact-h"
        class="mt-4 max-w-[760px] font-display text-[36px] leading-[1.1] font-bold sm:text-5xl"
      >
        Let's build something people enjoy using.
      </h2>
      <p class="mt-5 max-w-[620px] text-[19px] text-onbrand">
        I'd love to hear what you're building. The quickest way to reach me is email.
      </p>
      <div class="mt-8 flex flex-wrap gap-4">
        <a
          :href="`mailto:${site.email}`"
          class="inline-flex min-h-12 items-center bg-accent px-6 py-3.5 font-semibold text-ink no-underline hover:bg-accent/85"
        >
          {{ site.email }}
        </a>
        <a
          :href="site.linkedin"
          class="inline-flex min-h-12 items-center border-2 border-paper px-6 py-3 font-semibold text-paper no-underline hover:bg-paper/10"
        >
          LinkedIn
        </a>
      </div>
    </div>
  </section>
</template>
