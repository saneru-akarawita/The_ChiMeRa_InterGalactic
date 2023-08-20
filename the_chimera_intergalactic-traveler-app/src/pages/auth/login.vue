<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { api } from '~/api'
import { useAuthStore } from '~/stores'
import AppButton from '~/components/common/AppButton.vue'
import AppInput from '~/components/common/AppInput.vue'

defineOptions({
  name: 'AuthLoginPage',
})

const loginFormData = ref({
  email: '',
  password: '',
  remember_me: false,
})

const loginFormValidationErrors = ref({
  email: [] as string[],
  password: [] as string[],
  remember_me: [] as string[],
})

const systemError = ref('')

const router = useRouter()
const authStore = useAuthStore()

async function onLoginFormSubmit() {
  for (const key in loginFormData.value) {
    const typedValue = loginFormData.value[key as keyof typeof loginFormData.value]
    if (typedValue === null || typedValue === '') {
      console.log(key)
      return
    }
  }
  const result = await api.auth.signin(loginFormData.value)
  if (result === true) {
    authStore.setIsLoggedIn(true)
    const result = await api.users.travelers.getProfile()
    if (result) {
      authStore.setProfile(result)
      await router.replace('/')
    }
  }
  else if (result) {
    const errors = result.errorMessages
    errors.forEach((e) => {
      loginFormValidationErrors.value[e.property] = e.messages
    })
  }
  else {
    systemError.value = 'Something went wrong'
  }
}
</script>

<template>
  <main class="auth-login-page default-container">
    <form autocomplete="off" class="flex flex-col items-center justify-center gap-4" @submit.prevent="onLoginFormSubmit">
      <img
        src="../../assets/images/logos/logo.svg" alt="Intergalactic Logo" width="38px" height="38px"
        class="h-[60px] w-[60px]"
      >
      <h1 class="heading-1 mb-4">
        Welcome Back !
      </h1>
      <AppInput
        id="email" v-model="loginFormData.email" label="Email" name="email" label-for="email" type="email"
        :errors="loginFormValidationErrors.email" required
      >
        <template #icon>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
            <path
              fill="#7059FF"
              d="M12 22q-2.05 0-3.875-.788t-3.188-2.15q-1.362-1.362-2.15-3.187T2 12q0-2.075.788-3.888t2.15-3.174Q6.3 3.575 8.124 2.788T12 2q2.075 0 3.888.788t3.174 2.15q1.363 1.362 2.15 3.175T22 12v1.45q0 1.475-1.012 2.513T18.5 17q-.9 0-1.675-.4t-1.275-1.05q-.675.675-1.588 1.063T12 17q-2.075 0-3.538-1.463T7 12q0-2.075 1.463-3.538T12 7q2.075 0 3.538 1.463T17 12v1.45q0 .725.45 1.137T18.5 15q.6 0 1.05-.413T20 13.45V12q0-3.275-2.363-5.638T12 4Q8.725 4 6.362 6.363T4 12q0 3.275 2.363 5.638T12 20h5v2h-5Zm0-7q1.25 0 2.125-.875T15 12q0-1.25-.875-2.125T12 9q-1.25 0-2.125.875T9 12q0 1.25.875 2.125T12 15Z"
            />
          </svg>
        </template>
      </AppInput>
      <AppInput
        id="password" v-model="loginFormData.password" label="Password" name="password" label-for="password"
        :errors="loginFormValidationErrors.email" type="password" required
      >
        <template #icon>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
            <path
              fill="#7059FF"
              d="M12 13a1.49 1.49 0 0 0-1 2.61V17a1 1 0 0 0 2 0v-1.39A1.49 1.49 0 0 0 12 13Zm5-4V7A5 5 0 0 0 7 7v2a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3ZM9 7a3 3 0 0 1 6 0v2H9Zm9 12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1Z"
            />
          </svg>
        </template>
      </AppInput>
      <div class="flex items-center self-start gap-4">
        <input id="remember_me" v-model="loginFormData.remember_me" type="checkbox" name="remember_me" class="h-4 w-4">
        <label for="remember_me">Remember me</label>
      </div>
      <AppButton class="w-full">
        Continue to Login
      </AppButton>
      <RouterLink to="/auth/signup">
        Haven't registered yet? <span class="text-[var(--color-blue-purple)]">Join with us</span>
      </RouterLink>
    </form>
  </main>
</template>

<style lang="scss">
.auth-login-page {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
