<script setup lang="ts">
import { getActiveHead, useHead } from 'unhead'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { loadLanguageAsync } from '@/plugins/i18n'

useHead({ titleTemplate: 'Pablo Miceli | %s' })

const { t, locale } = useI18n()
const { currentRoute } = useRouter()

watch(currentRoute, async (val) => {
  if (val.query.lang) {
    localStorage.setItem('language', String(val.query.lang))
    await loadLanguageAsync(String(val.query.lang))
  } else {
    localStorage.setItem('language', 'en')
    await loadLanguageAsync('en')
  }

  getActiveHead()?.push({
    title: t('title'),
    htmlAttrs: { lang: locale.value },
    meta: [{ name: 'description', content: t('description') }]
  })
})
</script>

<template>
  <router-view />
</template>
