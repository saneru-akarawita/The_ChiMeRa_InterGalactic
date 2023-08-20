import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Locations } from '~/types'

interface LocationsState {
  locations: Locations
}

export const useLocationsStore = defineStore('locations', {
  state: (): LocationsState => {
    return { locations: [] }
  },

  actions: {
    setIsLocations(locations: Locations) {
      this.locations = locations
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useLocationsStore as any, import.meta.hot))
