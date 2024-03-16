<script setup lang="ts">
import CodeIcon from '@/assets/svg/code.svg?component'
import BarList from '@/components/BarList.vue'

const LANGUAGES = {
  TypeScript: 9,
  GraphQL: 10,
  Go: 4,
  FQL: 9,
  Java: 8,
  HTML5: 10,
  CSS3: 9,
  PHP: 7,
  SCSS: 7,
  SQL: 5
}

const LIBS = {
  'Vue 3': 10,
  TailwindCSS: 10,
  'Apollo Client and Server': 9,
  FaunaDB: 9,
  Pinia: 10,
  NuxtJS: 10,
  ExpressJS: 8,
  Laravel: 7,
  'Android SDK': 5,
  React: 3
}

const OPS = {
  Netlify: 9,
  Vercel: 8,
  Cloudflare: 6,
  'CI/CD': 5,
  GCP: 7,
  AWS: 3,
  'Digital Ocean': 7,
  Heroku: 8
}

const OTHER = {
  'GPT-Api': 8,
  Mapbox: 9,
  Monorepo: 8,
  'Drupal (Headless)': 10,
  Rollup: 7,
  Docker: 7,
  Parcel: 5,
  Gulp: 8
}
</script>

<template>
  <section>
    <div class="ml-auto flex items-center text-2xl uppercase">
      <h2 class="ml-auto text-teal-700 dark:text-white">{{ $t('SkillsSection.title') }}</h2>
      <CodeIcon class="-mb-1 ml-2 w-12 text-teal-500 dark:text-green-500" />
    </div>
    <hr
      class="-mx-6 my-4 box-border border border-gray-500 bg-gray-500 opacity-75 dark:border-gray-500 dark:bg-gray-300"
    />
    <p class="mb-8 text-gray-900 dark:text-gray-400">{{ $t('SkillsSection.text') }}</p>
    <div class="mb-10 grid gap-6 sm:grid-cols-2">
      <BarList
        class="col-span-1"
        :title="$t('SkillsSection.subtitle1')"
        color="light"
        :values="LANGUAGES"
      />
      <BarList
        class="col-span-1 print:pb-5"
        :title="$t('SkillsSection.subtitle2')"
        color="light"
        :values="LIBS"
      />
      <BarList
        class="col-span-1"
        :title="$t('SkillsSection.subtitle3')"
        color="dark"
        :values="OTHER"
      />
      <BarList
        class="col-span-1"
        :title="$t('SkillsSection.subtitle4')"
        color="dark"
        :values="OPS"
      />
    </div>
  </section>
</template>
