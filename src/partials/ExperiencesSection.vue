<script setup lang="ts">
import { computed, defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import CaseIcon from '@/assets/svg/case.svg?component'
import ExperienceItem, { type Experience } from '@/components/ExperienceItem.vue'
import TroopExp from '@/components/experiences/TroopExp.vue'
import MateraExp from '@/components/experiences/MateraExp.vue'
import Ctrl365Exp from '@/components/experiences/Ctrl365Exp.vue'
import PlottyExp from '@/components/experiences/PlottyExp.vue'

const { t } = useI18n()

const experiences = computed<Experience[]>(() => [
  {
    period: '2024',
    title: t('ExperiencesSection.plotty.title'),
    link: 'https://plotty-ai.netlify.app',
    component: PlottyExp
  },
  {
    period: '2022 - 2024',
    title: t('ExperiencesSection.troop.title'),
    link: 'https://trooptravel.com',
    component: TroopExp
  },
  {
    period: '2021',
    title: t('ExperiencesSection.airbank.title'),
    link: 'https://techcrunch.com/2021/06/22/airbank-centralizes-all-your-business-bank-accounts-and-financial-data/',
    component: defineComponent({ setup: () => () => t('ExperiencesSection.airbank.text') })
  },
  {
    period: '2020',
    title: t('ExperiencesSection.matera.title'),
    link: 'https://matera.com',
    component: MateraExp
  },
  {
    period: '2019',
    title: t('ExperiencesSection.parana.title'),
    link: 'https://paranabanco.com.br',
    component: defineComponent({ setup: () => () => t('ExperiencesSection.parana.text') })
  },
  {
    period: '2019',
    title: t('ExperiencesSection.ctrl365.title'),
    link: 'https://ctrl365.com.br',
    component: Ctrl365Exp
  }
])
</script>

<template>
  <section class="print:pb-10">
    <div class="ml-auto flex items-center text-2xl uppercase">
      <h2 class="ml-auto text-teal-700 dark:text-white">{{ $t('ExperiencesSection.title') }}</h2>
      <CaseIcon class="ml-2 w-12 text-teal-500 dark:text-green-500" />
    </div>
    <hr
      class="-mx-6 my-4 box-border border border-gray-500 bg-gray-500 opacity-75 dark:border-gray-500 dark:bg-gray-300"
    />
    <ExperienceItem
      v-for="experience in experiences"
      :experience="experience"
      :key="experience.title"
    >
      <component :is="experience.component" />
    </ExperienceItem>
  </section>
</template>
