<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  id: string
  title: string
  price: number
  startPlanet: string
  endPlanet: string
  bgImage?: string
  startDate: Date
  endDate: Date
}>()
</script>

<template>
  <RouterLink
    :to="`/packages/${id}`"
    class="package rounded-xl" :style="{
      backgroundImage: `linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }"
  >
    <div class="package-header">
      <div class="package-header-title">
        <h3>{{ title }}</h3>
      </div>
      <div class="package-header-price">
        <img src="src/assets/images/logos/logo.svg" width="18" height="18" style="color: white;">
        <h3>{{ price }}</h3>
      </div>
    </div>
    <div class="package-bottom">
      <div class="package-path">
        <div class="package-path-start">
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 4.50005C0 2.01473 2.01475 0 4.5001 0C6.32745 0 7.90045 1.08919 8.60525 2.65377L2.65375 8.60515C2.39967 8.49064 2.15679 8.35275 1.92825 8.19326L5.62155 4.50005H4.5001L1.31805 7.68207C0.5037 6.86772 0 5.74269 0 4.50005ZM9 4.5015L4.50145 9C6.98555 8.9992 8.99915 6.98562 9 4.5015Z" fill="white" />
          </svg>
          <h3>{{ startPlanet }}</h3>
        </div>
        <div class="line" />
        <div class="package-path-end">
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 4.50005C0 2.01473 2.01475 0 4.5001 0C6.32745 0 7.90045 1.08919 8.60525 2.65377L2.65375 8.60515C2.39967 8.49064 2.15679 8.35275 1.92825 8.19326L5.62155 4.50005H4.5001L1.31805 7.68207C0.5037 6.86772 0 5.74269 0 4.50005ZM9 4.5015L4.50145 9C6.98555 8.9992 8.99915 6.98562 9 4.5015Z" fill="white" />
          </svg>
          <h3>{{ endPlanet }}</h3>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<style lang="scss" scoped>
.package {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  box-sizing: border-box;
  gap: 1rem;
  .package-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .package-header-title {
      h3 {
        font-size: 1.5rem;
        font-weight: 500;
        margin: 0;
      }
    }
    .package-header-price {
      display: inline-flex;
      gap: 0.5rem;
      h3 {
        font-size: 1.5rem;
        font-weight: 500;
        margin: 0;
      }
    }
  }
  .package-bottom {
    display: flex;
    justify-content: space-between;
    align-items: end;
    .package-path {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      .package-path-start {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
        h3 {
          font-size: 1.1rem;
          font-weight: 500;
          margin: 0;
        }
      }
      .line {
        height: 12px;
        width: 1px;
        background-color: white;
      }
      .package-path-end {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        width: 100%;

        h3 {
          font-size: 1.1rem;
          font-weight: 500;
          margin: 0;
        }
      }
    }
  }
}
</style>
