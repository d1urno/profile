<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { TransitionPresets, useTransition } from '@vueuse/core'

const props = defineProps<{
  name: string
  value: number
  index: number
  color: 'light' | 'dark'
  starter: boolean
}>()

const emit = defineEmits<{
  (e: 'transition-start', index: number): void
}>()

const val = ref(0)

watch(
  () => props.value,
  (newVal) => {
    val.value = newVal
  }
)

const transitionedValue = useTransition(val, {
  duration: 1000,
  transition: TransitionPresets.easeOutCubic,
  onStarted: () => {
    emit('transition-start', props.index + 1)
  }
})

onMounted(() => {
  if (props.starter) {
    emit('transition-start', props.index)
  }
})
</script>

<template>
  <svg
    viewBox="0 0 90 8"
    class="mb-2 h-6 flex-1 lg:h-5 xl:h-6"
    :class="{ 'text-teal-500': color === 'light', 'text-teal-800': color === 'dark' }"
  >
    <rect
      rx="3"
      ry="5"
      :width="transitionedValue * 10 + '%'"
      height="100%"
      style="fill: currentColor"
    />
    <text x="4" y="5.6" fill="white" font-weight="bold" font-size=".33rem">
      {{ name }}
    </text>
    Sorry, your browser does not support inline SVG.
  </svg>
</template>
