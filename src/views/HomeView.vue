<script setup lang="ts">
import { ref } from 'vue'
import MainLoader from '@/components/MainLoader.vue'
import PeopleTable from '@/components/PeopleTable.vue'

const nameInputValue = ref('')
const isLoading = ref(false)

const checkLoading = (boolean: boolean) => {
  isLoading.value = boolean
}
</script>

<template>
  <main class="main">
    <MainLoader v-if="isLoading" />
    <div class="search">
      <i class="icon">
        <svg width="20" height="20">
          <use href="@/assets/icons/icons.svg#search" />
        </svg>
      </i>
      <input
        class="search-input"
        v-model="nameInputValue"
        placeholder="Search by name"
        type="text"
      />
    </div>
    <PeopleTable :nameInputValue="nameInputValue" @checkLoading="checkLoading" />
  </main>
</template>
