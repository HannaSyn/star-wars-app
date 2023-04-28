import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { Planet } from '@/types/Planet'

export const usePlanetStore = defineStore('planet', () => {
  const planet = ref<Planet | null>()

  async function getPlanet(url: string) {
    try {
      const response = await axios.get(url)
      setPlanet(response.data)
    } catch (error) {
      console.error(error)
      alert(error)
    }
  }

  function setPlanet(response: Planet) {
    planet.value = response
  }

  return { planet, getPlanet, setPlanet }
})
