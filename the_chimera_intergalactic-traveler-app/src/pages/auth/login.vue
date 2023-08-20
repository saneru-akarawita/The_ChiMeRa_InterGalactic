<script setup lang="ts">

defineOptions({
  name: 'AuthLoginPage',
})

const loginFormData = ref({
  email: '',
  password: '',
  rememberMe: false,
})
</script>

<template>
  <main class="auth-login-page default-container">
    <form autocomplete="off" class="flex flex-col items-center justify-center gap-4">
      <img src="../../assets/images/logos/logo.svg" alt="Intergalactic Logo" width="38px" height="38px" class="h-[60px] w-[60px]">
      <h1 class="heading-1 mb-4">
        Welcome Back !
      </h1>
      <AppInput id="email" v-model="loginFormData.email" label="Email" name="email" label-for="email" type="email">
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
        type="email"
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
      <AppButton class="mt-6 w-full">
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
