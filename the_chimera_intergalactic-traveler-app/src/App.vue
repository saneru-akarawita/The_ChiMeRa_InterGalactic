<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({
  title: 'Intergalactic',
  meta: [
    { name: 'description', content: 'Intergalactic Travel Companion App' },
    {
      name: 'theme-color',
      content: '#121212',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/favicon.svg',
    },
  ],
})
</script>

<template>
  <RouterView />
</template>
