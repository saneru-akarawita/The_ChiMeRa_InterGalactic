<script setup lang="ts">
import locationPlaceholder from '~/assets/images/placeholders/location.jpg'
</script>

<template>
  <div class="mt-4">
    <swiper-container slides-per-view="1.5" speed="500" loop="true" space-between="16">
      <swiper-slide v-for="i in 30" :key="i">
        <div
          :style="{ width: '100%', aspectRatio: '1', backgroundImage: `url(${locationPlaceholder})`, backgroundPosition: 'top', backgroundSize: 'cover' }"
          class="relative rounded-xl"
        >
          <div class="absolute right-4 top-4">
            <span class="text-[10px]">Included in</span>
            <p class="text-[14px] font-[600]">
              14 packages
            </p>
          </div>
          <div class="absolute bottom-4 left-4">
            <p>Lava Lagoon</p>
            <span class="text-[12px]">Nebula Inferno</span>
          </div>
        </div>
      </swiper-slide>
    </swiper-container>
  </div>
</template>
