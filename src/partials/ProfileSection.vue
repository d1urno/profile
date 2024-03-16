<script setup lang="ts">
import ProfileIcon from '@/assets/svg/profile.svg?component'
</script>

<template>
  <section>
    <div class="ml-auto flex items-center text-2xl uppercase">
      <h2 class="ml-auto text-teal-700 dark:text-white">{{ $t('ProfileSection.title') }}</h2>
      <ProfileIcon class="ml-2 w-12 text-teal-500 dark:text-green-500" />
    </div>
    <hr
      class="-mx-6 my-4 box-border border border-gray-500 bg-gray-500 opacity-75 dark:border-gray-500 dark:bg-gray-300"
    />
    <p class="mb-8 text-gray-900 dark:text-gray-400">{{ $t('ProfileSection.text') }}</p>
  </section>
</template>
