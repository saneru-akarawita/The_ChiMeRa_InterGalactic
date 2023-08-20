<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePackagesStore } from '~/stores'

const route = useRoute()
const { id } = route.params
const router = useRouter()

const packagesStore = usePackagesStore()
const { packages } = storeToRefs(packagesStore)

const selectedPackage = computed(() => {
  return packages.value.find(p => p.id === id)
})
</script>

<template>
  <main
    class="selected-package-page h-[100vh] w-[100vw] flex flex-col justify-between overflow-hidden" :style="{
      backgroundImage: `url(${selectedPackage?.location.image})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
    }"
  >
    <header class="h-[80px] flex items-center justify-center">
      <h1 class="w-full flex items-center justify-center text-[24px] font-[600]">
        <button class="ml-[15px] mr-auto" @click="router.back()">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="23" viewBox="0 0 14 23" fill="none">
            <path
              fill-rule="evenodd" clip-rule="evenodd"
              d="M11.5 0.500014C11.8905 0.10949 12.5237 0.10949 12.9142 0.500014C13.3047 0.890539 13.3047 1.5237 12.9142 1.91423L4.03553 10.7929C3.64501 11.1834 3.64501 11.8166 4.03553 12.2071L12.9142 21.0858C13.3047 21.4763 13.3047 22.1095 12.9142 22.5C12.5237 22.8905 11.8905 22.8905 11.5 22.5L1.20711 12.2071C0.816582 11.8166 0.816582 11.1834 1.20711 10.7929L11.5 0.500014Z"
              fill="white"
            />
          </svg>
        </button>
        {{ selectedPackage?.name }}
        <p class="ml-auto text-[transparent]">
          ''
        </p>
      </h1>
    </header>
    <div class="h-[calc(100vh-300px)] flex flex-col gap-6 bg-[var(--color-black)] p-8" style="border-radius: 2rem 2rem 0 0">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-[14px] font-[500]">
            Duration
          </p>
          <p class="text-[24px] font-[500] text-[var(--color-purple)]">
            {{ selectedPackage?.duration }} days
          </p>
        </div>
        <div>
          <p class="text-[14px] font-[500]">
            Location
          </p>
          <p class="text-[24px] font-[500] text-[var(--color-purple)]">
            {{ selectedPackage?.location.name }}
          </p>
        </div>
      </div>
      <div>
        <p class="text-[14px] font-[500]">
          Accomdation
        </p>
        <p class="text-[24px] font-[500] text-[var(--color-purple)]">
          {{ selectedPackage?.accomodation }}
        </p>
      </div>
      <div>
        <p class="text-[14px] font-[700]">
          Includes
        </p>
        <div class="mt-4">
          <p class="font-[700] text-[var(--color-purple)]">
            {{ selectedPackage }}
          </p>
          <p class="text-[12px] font-[600]">
            Accomdation
          </p>
        </div>
      </div>
    </div>
  </main>
</template>
