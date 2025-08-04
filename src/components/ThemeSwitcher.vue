<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { onMounted, ref } from 'vue'

const props = defineProps<{
  locale: string
  label: string
}>()

const theme = useLocalStorage('theme', 'light')
const isMounted = ref(false)

function onThemeChange() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  if (theme.value === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

onMounted(() => {
  if (document.documentElement.classList.contains('dark')) theme.value = 'dark'
  else theme.value = 'light'
  isMounted.value = true
})
</script>

<template>
  <button
    @click="onThemeChange"
    :aria-label="label"
    class="focus-visible:shadow-outline w-5 transform transition-transform hover:scale-125 focus:outline-none print:hidden"
  >
    <span v-if="isMounted">
      <slot v-if="theme === 'light'" name="moon-icon" />
      <slot v-else name="sun-icon" />
    </span>
  </button>
</template>
