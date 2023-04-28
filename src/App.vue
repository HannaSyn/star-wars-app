<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainHeader from '@/components/MainHeader.vue'
</script>

<template>
  <MainHeader />
  <RouterView />
  <footer class="footer">May the Force be with you.</footer>
</template>
