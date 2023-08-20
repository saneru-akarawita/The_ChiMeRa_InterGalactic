<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import Package from '~/components/Package.vue'
import locationPlaceholderImg from '~/assets/images/placeholders/location.jpg'

const dummy = ref(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'])
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
        v-for="d in dummy" :key="d"
        start-planet="Earth" end-planet="Mars" :price="100" title="Trip to mars"
        :start-date="new Date('2011-11-11')" :end-date="new Date('2012-12-12')"
        :bg-image="locationPlaceholderImg"
      />
    </div>
  </div>
</template>
