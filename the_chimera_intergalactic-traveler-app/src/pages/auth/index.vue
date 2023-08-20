<script setup lang="ts">
import { RouterLink } from 'vue-router'
import logo from '~/assets/images/logos/logo.svg'
import stars from '~/assets/images/icons/star.svg'

defineOptions({
  name: 'AuthIndexPage',
})
</script>

<template>
  <main class="auth-page default-container">
    <header class="h-[60px] flex items-center justify-center">
      <img :src="logo" alt="Intergalactic Logo" width="38px" height="38px" class="h-[38px] w-[38px]">
    </header>
    <div class="mx-auto h-[calc(100vh-60px)] max-w-[300px] w-4/5 flex flex-col items-center justify-center">
      <p>We didn't find any intergalactic account stored on this device</p>
      <div class="mt-4 w-full flex flex-col gap-4">
        <RouterLink to="/auth/login" class="block w-full">
          <AppButton class="w-full">
            <div class="flex items-center justify-center gap-8">
              <img :src="stars" alt="Stars icon">
              Continue to Login
            </div>
          </AppButton>
        </RouterLink>
        <RouterLink to="/auth/signup" class="block w-full">
          <button class="w-full border-2 border-white rounded-[0.4rem] px-6 py-4">
            Become a member !
          </button>
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
.auth-page {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-image: url(~/assets/images/backgrounds/home-screen-bg.jpg);
  background-size: cover;
  background-position: center;
}
</style>
