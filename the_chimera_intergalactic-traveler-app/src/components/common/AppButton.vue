<script setup lang="ts">
const props = withDefaults(defineProps<{
  mode?: 'outline' | 'solid'
}>(), {
  mode: 'solid',
})

const { mode } = toRefs(props)
const btn = ref<HTMLButtonElement>()
</script>

<template>
  <button ref="btn" class="btn" :class="`btn--${mode}`">
    <span>
      <slot />
    </span>
  </button>
</template>

<style lang="scss">
.btn {

  span {
    //position: relative;
    padding: 0.75rem 1.5rem;
    background-image: var(--brand-gradient);
    color: #fff;
    //background-clip: text;
    //-webkit-text-fill-color: transparent;
    display: block;
    border-radius: 0.75rem;
    transition: all 200ms;
  }

  &--outline {
    background-color: #fff;
    border-radius: 0.75rem;
    position: relative;

    span {
      position: relative;
      padding: 0.55rem 1.5rem;
      background-image: var(--brand-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      display: block;
      border-radius: 0.4rem;
      transition: all 200ms;

      &::before {
        content: '';
        position: absolute;
        background-image: var(--brand-gradient-transparent);
        opacity: 0;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transition: all 200ms;
      }
    }

    &:hover {
      span {
        &::before {
          opacity: 1;
        }
      }
    }

    &::before {
      content: "";
      position: absolute;
      top: -2.5px;
      bottom: -2px;
      left: -2.5px;
      right: -2px;
      z-index: -1;
      background-image: var(--brand-gradient);
      border-radius: 0.6rem;
    }
  }
}
</style>
