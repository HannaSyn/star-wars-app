import axios from "axios"

const url = 'https://swapi.dev/api/people'

export const getPaginatedPeople = async (page: number, search?: string) => {
  const endpoint =  search ? `${url}/?page=${page}&search=${search}` : `${url}/?page=${page}`

  return await axios.get(endpoint)
}
