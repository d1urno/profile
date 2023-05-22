<script setup lang="ts">
import { getActiveHead, useHead } from 'unhead'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

useHead({ titleTemplate: 'Pablo Miceli | %s' })

const { t, locale } = useI18n()
const { currentRoute } = useRouter()

watch(
  currentRoute,
  (val) => {
    if (val.query.lang) locale.value = val.query.lang as string
    else locale.value = 'en'
    getActiveHead()?.push({
      title: t('title'),
      htmlAttrs: { lang: locale.value },
      meta: [{ name: 'description', content: t('description') }]
    })
  },
  { immediate: true }
)
</script>

<template>
  <router-view />
</template>
