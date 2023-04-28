<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  currentPage: number
  total: number
}>()

const emit = defineEmits<{
  (e: 'getPaginatedItems', page: number): void
}>()

const page = ref(+props.currentPage)
const router = useRouter()

const paginate = (page: number) => {
  router.replace({ query: { page } })
  emit('getPaginatedItems', page)
}
</script>
<template>
  <div class="pagination">
    <span class="pagination-pages">{{ props.currentPage }} of {{ Math.ceil(props.total / 10) }}</span>
    <button
      class="pagination-button button"
      :disabled="props.currentPage <= 1"
      @click="paginate((page -= 1))"
    >
      <i>
        <svg class="arrow" width="20" height="20">
          <use href="@/assets/icons/icons.svg#arrow-left" />
        </svg>
      </i>
    </button>
    <button
      class="pagination-button button"
      :disabled="total / 10 < currentPage"
      @click="paginate((page += 1))"
    >
      <i>
        <svg class="arrow left" width="20" height="20">
          <use href="@/assets/icons/icons.svg#arrow-right" />
        </svg>
      </i>
    </button>
  </div>
</template>
