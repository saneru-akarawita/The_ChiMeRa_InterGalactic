import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Packages } from '~/types'

interface PackagesState {
  packages: Packages
}

export const usePackagesStore = defineStore('packages', {
  state: (): PackagesState => {
    return { packages: [] }
  },

  actions: {
    setIsPackages(Packages: Packages) {
      this.packages = Packages
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePackagesStore as any, import.meta.hot))
