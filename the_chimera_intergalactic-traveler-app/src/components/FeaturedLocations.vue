<script setup lang="ts">
import type { Locations } from '~/types'

defineProps<{
  locations: Locations
}>()
</script>

<template>
  <div class="mt-4">
    <swiper-container slides-per-view="1.5" speed="500" loop="true" space-between="16">
      <swiper-slide v-for="location in locations" :key="location.id">
        <div
          :style="{ width: '100%', aspectRatio: '1', backgroundImage: `linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${location.image})`, backgroundPosition: 'top', backgroundSize: 'cover' }"
          class="relative rounded-xl"
        >
          <div class="absolute right-4 top-4">
            <span class="text-[10px]">Included in</span>
            <p class="text-[14px] font-[600]">
              {{ location.Package.length }} packages
            </p>
          </div>
          <div class="absolute bottom-4 left-4">
            <p>{{ location.name }}</p>
          </div>
        </div>
      </swiper-slide>
    </swiper-container>
  </div>
</template>
