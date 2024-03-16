<script setup lang="ts">
import CodeIcon from '@/assets/svg/code.svg?component'
import BarList from '@/components/BarList.vue'

const LANGUAGES = {
  TypeScript: 9,
  JavaScript: 10,
  Go: 5,
  FQL: 9,
  Kotlin: 3,
  Java: 8,
  HTML5: 10,
  CSS3: 9,
  PHP: 8,
  SCSS: 7,
  SQL: 6
}

const LIBS = {
  'Vue 3 (composition API)': 10,
  TailwindCSS: 10,
  FaunaDB: 9,
  GraphQL: 10,
  Apollo: 8,
  NuxtJS: 10,
  ExpressJS: 8,
  Laravel: 7,
  'Android SDK': 5,
  React: 4,
  Bootstrap: 8
}

const OPS = {
  Netlify: 9,
  Vercel: 8,
  GitFlow: 10,
  'CI/CD': 6,
  GCP: 7,
  AWS: 3,
  'Digital Ocean': 7,
  Heroku: 8
}

const OTHER = {
  'GPT-API': 9,
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
