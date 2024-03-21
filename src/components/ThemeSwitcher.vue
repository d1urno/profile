<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import useTranslations from '@/functions/useTranslations.ts'

const props = defineProps<{
  locale: string
}>()

const theme = useLocalStorage('theme', 'light')
const { t } = useTranslations(props.locale)
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
    :aria-label="t('ThemeSwitcher.label')"
    class="focus-visible:shadow-outline w-5 transform transition-transform hover:scale-125 focus:outline-none print:hidden"
  >
    <span v-if="isMounted">
      <slot v-if="theme === 'light'" name="moon-icon" />
      <slot v-else name="sun-icon" />
    </span>
  </button>
</template>
