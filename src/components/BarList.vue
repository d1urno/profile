<script setup lang="ts">
import { computed, ref } from 'vue'
import ValueBar from '@/components/ValueBar.vue'

const props = defineProps<{
  values: Record<string, number>
  color: 'light' | 'dark'
}>()

const started = ref([] as boolean[])

const delayedValues = computed(() =>
  Object.entries(props.values).map(([k, v], index) => {
    return { name: k, value: started.value[index] ? v : 0 }
  })
)

function onTransitionStart(index: number) {
  setTimeout(() => {
    started.value[index] = true
  }, 75)
}
</script>

<template>
  <div class="flex flex-col gap-x-2">
    <ValueBar
      v-for="(v, i) in delayedValues"
      :key="v.name"
      :name="v.name"
      :index="i"
      :value="v.value"
      :starter="i === 0"
      :color="color"
      @transition-start="onTransitionStart"
    />
  </div>
</template>
