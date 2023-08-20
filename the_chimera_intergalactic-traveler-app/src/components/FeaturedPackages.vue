<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Package from '~/components/Package.vue'
import type { Packages } from '~/types'

defineProps<{
  packages: Packages
}>()
</script>

<template>
  <div class="mt-4">
    <h2 class="my-4 flex items-center justify-between font-[600]">
      Full Packages
      <RouterLink to="/packages" class="text-[12px] text-[var(--color-purple)]">
        View All
      </RouterLink>
    </h2>
    <div class="flex flex-col gap-4">
      <Package
        v-for="p in packages" :id="p.id"
        :key="p.id" :start-planet="p.location.destinations[0]" :end-planet="p.location.destinations.at(-1) as string" :price="p.price"
        :title="p.name" :start-date="new Date('2011-11-11')"
        :end-date="new Date('2012-12-12')"
        :bg-image="p.location.image"
      />
    </div>
  </div>
</template>
