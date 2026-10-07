<script setup lang="ts">
import { onMounted, ref } from 'vue'
defineProps<{ label: string }>()
const dark = ref(false)
onMounted(() => {
  dark.value = document.documentElement.classList.contains('dark')
})
function toggleTheme() {
  dark.value = !dark.value
  document.documentElement.classList.toggle('dark', dark.value)
  try {
    localStorage.setItem('theme', dark.value ? 'dark' : 'light')
  } catch {
    /* Theme remains usable without storage. */
  }
}
</script>
<template>
  <button
    type="button"
    :aria-label="label"
    :aria-pressed="dark"
    class="flex h-11 w-11 items-center justify-center rounded border border-current text-teal-800 dark:text-teal-300"
    @click="toggleTheme"
  >
    <slot v-if="dark" name="sun-icon" />
    <slot v-else name="moon-icon" />
  </button>
</template>
