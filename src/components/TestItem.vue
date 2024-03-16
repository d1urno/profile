<script setup lang="ts">
export interface Test {
  period: string
  title: string
  deployLink: string
  repositoryLink: string
  text: string
}

defineProps<{
  test: Test
}>()
</script>

<template>
  <article>
    <span class="text-sm dark:text-gray-400">{{ test.period }}</span>
    <h3 class="text-2xl font-bold opacity-75 dark:text-white dark:opacity-100">
      {{ test.title }}
    </h3>
    <p class="mb-8 text-gray-900 text-opacity-75 dark:text-gray-400">
      <a
        class="dark:hover:text-teal-400 font-semibold hover:text-teal-400 dark:text-green-500"
        rel="noopener nofollow"
        :href="test.deployLink"
        target="_blank"
      >
        Live deploy
      </a>
      -
      <a
        class="dark:hover:text-teal-400 inline-flex font-semibold hover:text-teal-400 dark:text-green-500"
        rel="noopener nofollow"
        :href="test.repositoryLink"
        target="_blank"
      >
        Repository
      </a>
      <br />
      {{ test.text }}
    </p>
  </article>
</template>
