<script setup lang="ts">
import { usePlanetStore } from '@/stores/planet'
import { computed } from 'vue'

const emit = defineEmits<{
  (e: 'close'): void
}>()

const planetStore = usePlanetStore()
const planet = computed(() => planetStore.planet)
</script>

<template>
  <div @click.self="emit('close')" class="planet-popup-wrapper">
    <div class="planet-popup">
      <h1 class="planet-popup-title">Planet info</h1>
      <p class="planet-popup-text">Name: {{ planet?.name }}</p>
      <p class="planet-popup-text">Diameter: {{ planet?.diameter }}</p>
      <p class="planet-popup-text">Climate: {{ planet?.climate }}</p>
      <p class="planet-popup-text">Population: {{ planet?.population }}</p>
    </div>
  </div>
</template>
