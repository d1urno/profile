<script setup lang="ts">
import { ref } from 'vue'
import SideSection from '@/partials/SideSection.vue'
import ScoreSection from '@/partials/ScoreSection.vue'
import TestsSection from '@/partials/TestsSection.vue'
import ExperiencesSection from '@/partials/ExperiencesSection.vue'
import SkillsSection from '@/partials/SkillsSection.vue'
import ProfileSection from '@/partials/ProfileSection.vue'

const isDark = ref(false)
</script>

<template>
  <div class="mx-auto md:container lg:grid lg:grid-cols-8">
    <SideSection v-model:is-dark="isDark" />

    <div class="px-16 py-8 lg:col-span-5">
      <ProfileSection />
      <SkillsSection />
      <ExperiencesSection />
      <TestsSection />
      <ScoreSection />
    </div>
  </div>
</template>
