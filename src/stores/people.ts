import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Person } from '@/types/Person'
import { getPaginatedPeople } from '@/api'

export const usePeopleStore = defineStore('people', () => {
  const people = ref<Array<Person>>([])
  const totalItems = ref<number>(0)

  async function getPeople(page: number, search?: string) {
    try {
      const response = await getPaginatedPeople(page, search)
      setPeople(response.data.results)
      totalItems.value = response.data.count
    } catch (error) {
      console.error(error)
      alert(error)
    }
  }

  function setPeople(array: Person[]) {
    people.value = array
  }

  return { people, totalItems, getPeople, setPeople }
})
