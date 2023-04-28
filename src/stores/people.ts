import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { Person } from '@/types/Person'

export const usePeopleStore = defineStore('people', () => {
  const people = ref<Array<Person>>([])
  const totalItems = ref<number>(0)
  
  const url = 'https://swapi.dev/api/people'

  async function getPeople(page: number, search?: string) {
    const endpoint = search ? `${url}/?page=${page}&search=${search}` : `${url}/?page=${page}`
    try {
      const response = await axios.get(endpoint)
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
