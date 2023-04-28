<script setup lang="ts">
import JediIcon from './icons/JediIcon.vue'
</script>
<template>
  <div class="loader">
    <i class="rotating">
      <JediIcon />
    </i>
  </div>
</template>

<style lang="scss">
.loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #130c0eb0;
  z-index: 9;

  & i {
    width: 100px;
    height: 100px;
    color: #2b8ccf;
  }
}

.rotating {
  animation: rotating 4s cubic-bezier(0, 0.4, 0.8, 1) infinite;
}

@keyframes rotating {
  0%,
  100% {
    animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
  }
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(1800deg);
    animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
  }
  100% {
    transform: rotateY(3600deg);
  }
}
</style>
