import { acceptHMRUpdate, defineStore } from 'pinia'
import type { TravelerProfile } from '~/types'

interface AuthState {
  isLoggedIn: boolean
  profile: TravelerProfile | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => {
    return { isLoggedIn: false, profile: null }
  },

  actions: {
    setIsLoggedIn(status: boolean) {
      this.isLoggedIn = status
    },

    setProfile(profile: TravelerProfile | null) {
      this.profile = profile
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore as any, import.meta.hot))
