<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import Package from '~/components/Package.vue'
import locationPlaceholderImg from '~/assets/images/placeholders/location.jpg'

const dummy = ref(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'])
</script>

<template>
  <main class="default-container">
    <header class="title h-[80px] flex items-center">
      <h1 class="w-full flex items-center justify-center text-[24px] font-[600]">
        <RouterLink to="//" class="mr-auto">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="23" viewBox="0 0 14 23" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5 0.500014C11.8905 0.10949 12.5237 0.10949 12.9142 0.500014C13.3047 0.890539 13.3047 1.5237 12.9142 1.91423L4.03553 10.7929C3.64501 11.1834 3.64501 11.8166 4.03553 12.2071L12.9142 21.0858C13.3047 21.4763 13.3047 22.1095 12.9142 22.5C12.5237 22.8905 11.8905 22.8905 11.5 22.5L1.20711 12.2071C0.816582 11.8166 0.816582 11.1834 1.20711 10.7929L11.5 0.500014Z" fill="white" />
          </svg>
        </RouterLink>
        Packages
        <p class="ml-auto text-[transparent]">
          ''
        </p>
      </h1>
    </header>
    <div class="filters-fixed" />
    <div class="flex flex-col gap-4">
      <Package
        v-for="(_val, index) in dummy" :key="index"
        start-planet="Earth" end-planet="Mars" :price="100" title="Trip to mars"
        :start-date="new Date('2011-11-11')" :end-date="new Date('2012-12-12')" :bg-image="locationPlaceholderImg"
      />
    </div>
  </main>
</template>
