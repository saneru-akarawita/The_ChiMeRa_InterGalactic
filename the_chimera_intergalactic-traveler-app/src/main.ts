import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'
import { storeToRefs } from 'pinia'
import { register } from 'swiper/element/bundle'

// import Previewer from 'virtual:vue-component-preview'
import App from './App.vue'
import type { UserModule } from './types'
import generatedRoutes from '~pages'
import { useAuthStore } from '~/stores'

import '@unocss/reset/tailwind.css'
import './styles/main.scss'
import 'uno.css'

register()

const routes = setupLayouts(generatedRoutes)

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))
    // ctx.app.use(Previewer)

    ctx.router.beforeEach((to, from, next) => {
      const authStore = useAuthStore()
      const { isLoggedIn } = storeToRefs(authStore)
      if (to.meta.requiresAuth as boolean) {
        if (!isLoggedIn.value)
          next('/auth')

        else
          next()
      }
      else { next() }
    })
  },
)
