import { acceptHMRUpdate, defineStore } from 'pinia'

interface AuthState {
  isLoggedIn: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => {
    return { isLoggedIn: false }
  },

  actions: {
    setIsLoggedIn(status: boolean) {
      this.isLoggedIn = status
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore as any, import.meta.hot))
