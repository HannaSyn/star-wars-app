<script setup lang="ts">
import { usePeopleStore } from '@/stores/people'
import { onMounted, ref, computed, watch } from 'vue'
import TablePagination from '@/components/TablePagination.vue'
import PlanetPopup from '@/components/PlanetPopup.vue'
import { usePlanetStore } from '@/stores/planet'
import { useRoute, useRouter } from 'vue-router'
import { debounce } from 'vue-debounce'
import type { Person } from '@/types/Person'
import { getConvertedDateTime } from '@/helpers/convertDate'

const props = defineProps<{
  nameInputValue: string
}>()

const emit = defineEmits<{
  (e: 'checkLoading', boolean: boolean): void
}>()

const columns = [
  {
    id: 1,
    name: 'Name',
    sortBy: 'name',
    sortType: 'ASC'
  },
  {
    id: 2,
    name: 'Height',
    sortBy: 'height',
    sortType: 'ASC'
  },
  {
    id: 3,
    name: 'Mass',
    sortBy: 'mass',
    sortType: 'ASC'
  },
  {
    id: 4,
    name: 'Created',
    sortBy: 'created',
    sortType: 'ASC'
  },
  {
    id: 5,
    name: 'Edited',
    sortBy: 'edited',
    sortType: 'ASC'
  },
  {
    id: 6,
    name: 'Planet Name',
    sortBy: 'planetName',
    sortType: 'ASC'
  }
]

const router = useRouter()
const route = useRoute()

const cachedRelation = localStorage.getItem('cachedRelation')
  ? JSON.parse(localStorage.getItem('cachedRelation') as string)
  : {}
const currentPage = ref((route.query.page as any) || 1)
const isPopupOpened = ref(false)
const activeSort = ref('')
const sortType = ref('')

const peopleStore = usePeopleStore()
const people = computed(() => peopleStore.people)
const total = computed(() => peopleStore.totalItems)

const planetStore = usePlanetStore()
const planet = computed(() => planetStore.planet)

const sortArray = (sortBy: string, sortType: string) => {
  people.value.sort((firstEl: any, secondEl: any) => {
    if (secondEl[sortBy] === 'unknown' || !secondEl[sortBy]) return -1
    if (sortBy === 'created' || sortBy === 'edited') {
      return sortedByDate(firstEl[sortBy], secondEl[sortBy], sortType)
    }
    if (sortBy === 'name' || sortBy === 'planetName') {
      return sortedByString(firstEl[sortBy], secondEl[sortBy], sortType)
    }
    return sortedByNumber(firstEl[sortBy], secondEl[sortBy], sortType)
  })
}

const toggleSort = (column: any) => {
  column.sortType = column.sortType === 'ASC' ? 'DESC' : 'ASC'
  activeSort.value = column.sortBy
  sortType.value = column.sortType
  sortArray(column.sortBy, column.sortType)
}

const sortedByDate = (firstEl: any, secondEl: any, sortType: string) => {
  return sortType === 'DESC'
    ? +new Date(secondEl) - +new Date(firstEl)
    : +new Date(firstEl) - +new Date(secondEl)
}

const sortedByNumber = (firstEl: any, secondEl: any, sortType: string) => {
  const formattedEl = (el: any) => parseFloat(el.replace(/,/g, ''))
  return sortType === 'DESC'
    ? formattedEl(secondEl) - formattedEl(firstEl)
    : formattedEl(firstEl) - formattedEl(secondEl)
}

const sortedByString = (firstEl: any, secondEl: any, sortType: string) => {
  return sortType === 'DESC' ? (secondEl > firstEl ? -1 : 1) : secondEl < firstEl ? -1 : 1
}

const getPaginatedPeople = async (page: number) => {
  currentPage.value = page
  await loadPeople(page, props.nameInputValue)
  sortArray(activeSort.value, sortType.value)
}

const loadPeople = async (page: number, inputValue: string) => {
  emit('checkLoading', true)
  await peopleStore.getPeople(page, inputValue)
  emit('checkLoading', false)
}

const setPlanetToPopup = async (person: Person) => {
  emit('checkLoading', true)
  const url = person.homeworld
  if (cachedRelation[url]) {
    const planet = JSON.parse(localStorage.getItem(cachedRelation[url]) as string)
    planetStore.setPlanet(planet)
  } else {
    await planetStore.getPlanet(url)
    cachedRelation[url] = planet.value?.name
    localStorage.setItem('cachedRelation', JSON.stringify(cachedRelation))
    localStorage.setItem(planet.value?.name as string, JSON.stringify(planet.value))
  }
  if (!person.planetName) person.planetName = planet.value?.name
  emit('checkLoading', false)
  isPopupOpened.value = true
}

const closePopup = () => (isPopupOpened.value = false)

onMounted(async () => {
  await loadPeople(currentPage.value, props.nameInputValue)
  sortArray(activeSort.value, sortType.value)
})

watch(
  () => props.nameInputValue,
  debounce(async () => {
    currentPage.value = 1
    router.replace({ query: { page: currentPage.value } })
    await loadPeople(currentPage.value, props.nameInputValue)
  }, 500)
)
</script>

<template>
  <section>
    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th v-for="column in columns" :key="column.id" @click="toggleSort(column)">
              <p
                :class="[
                  'table-head-item',
                  { clicked: activeSort === column.sortBy },
                  { desc: column.sortType === 'DESC' }
                ]"
              >
                {{ column.name }}
                <i>
                  <svg width="20" height="20">
                    <use href="@/assets/icons/icons.svg#arrow" />
                  </svg>
                </i>
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="person in people" :key="person.name">
            <td>{{ person.name }}</td>
            <td>{{ person.height }}</td>
            <td>{{ person.mass }}</td>
            <td>{{ getConvertedDateTime(person.created) }}</td>
            <td>{{ getConvertedDateTime(person.edited) }}</td>
            <td>
              <p v-if="person.planetName" @click="setPlanetToPopup(person)" class="planet-name">
                {{ person.planetName }}
              </p>
              <button class="button" v-else @click="setPlanetToPopup(person)">Discover</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <TablePagination :currentPage="currentPage" @getPaginatedItems="getPaginatedPeople" :total="total" />
    <PlanetPopup v-if="isPopupOpened" @close="closePopup" />
  </section>
</template>
