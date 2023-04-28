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

  <div @click.self="emit('close')" class="popup-wrapper">
    <div class="popup">
      <h1 class="popup-title">Planet info</h1>
      <p class="popup-text">Name: {{ planet?.name }}</p>
      <p class="popup-text">Diameter: {{ planet?.diameter }}</p>
      <p class="popup-text">Climate: {{ planet?.climate }}</p>
      <p class="popup-text">Population: {{ planet?.population }}</p>
    </div>
  </div>
</template>

<style lang="scss">
.popup {
  width: 490px;
  height: 500px;
  color: #202124;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background: center / cover no-repeat url('../assets/images/planet.png');
  background-blend-mode: hard-light;
  font-weight: 700;

  &-title {
    margin: -40px 0 5px 20px;
    font-weight: 900;
  }

  &-text {
    font-weight: 700;

    &:nth-child(2),
    &:nth-child(5) {
      margin-left: 15px;
    }

    &:nth-child(3) {
      margin-left: 12px;
    }

    &:nth-child(4) {
      margin-left: 10px;
    }
  }

  &-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3;
    background: #130c0eb0;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #130c0eb0 center / cover no-repeat url('../assets/images/stars.jpg');
      opacity: .3;
      z-index: 0;
    }
  }
}
</style>
