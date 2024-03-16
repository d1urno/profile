<script setup lang="ts">
import TestItem, { type Test } from '@/components/TestItem.vue'
import ComputerIcon from '@/assets/svg/computer.svg?component'
import { computed } from 'vue'

const tests = computed<Test[]>(() => [
  {
    period: '2020',
    title: 'Drivy frontend test',
    deployLink: 'https://dryve-frontend-test.netlify.app',
    repositoryLink: 'https://github.com/d1urno/dryve-frontend-test',
    text: 'Stack: Vue 3 - Vite - TypeScript - TailwindCSS - Jest'
  },
  {
    period: '2020',
    title: 'Dog & Pony Studios frontend test',
    deployLink: 'https://dps-senior-frontend-test.netlify.app',
    repositoryLink: 'https://github.com/d1urno/senior-frontend-test',
    text: 'Stack: Nuxt - TailwindCSS - Jest'
  },
  {
    period: '2020',
    title: 'Doc88 frontend challenge',
    deployLink: 'https://doc88-frontend-challenge.netlify.app',
    repositoryLink: 'https://github.com/d1urno/doc88-frontend-challenge',
    text: 'Stack: Vue 2.6 - TypeScript - TailwindCSS - Jest'
  }
])
</script>

<template>
  <section class="print:pb-10">
    <div class="ml-auto flex items-center text-2xl uppercase">
      <h2 class="ml-auto text-teal-700 dark:text-white">Tests</h2>
      <ComputerIcon class="ml-2 w-12 text-teal-500 dark:text-green-500" />
    </div>
    <hr
      class="-mx-6 my-4 box-border border border-gray-500 bg-gray-500 opacity-75 dark:border-gray-500 dark:bg-gray-300"
    />
    <TestItem v-for="test in tests" :test="test" :key="test.title" />
  </section>
</template>
