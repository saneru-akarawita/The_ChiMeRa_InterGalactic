<script setup lang="ts">
import { ref, toRefs } from 'vue'

// Props
const props = withDefaults(defineProps<{
  modelValue: string | number | undefined
  label: string
  labelFor: string
  fixedLabel?: boolean
  type: 'text' | 'password' | 'email' | 'number' | 'date'
  errors?: string[]
  required?: boolean
}>(), {
  errors: () => [] as string[],
  required: false,
})

//  Emits
const emit = defineEmits<{
  (event: 'update:modelValue', payload: string | number): void
}>()

const { label, labelFor, modelValue, fixedLabel, errors, type } = toRefs(props)
const input = ref<HTMLInputElement>()

function onClickLabel() {
  input.value?.focus()
}
</script>

<template>
  <div class="app-input">
    <input
      v-bind="$attrs" ref="input" :type="type" :value="modelValue" autocomplete="off" @change="
        emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    >
    <label :for="labelFor" :class="modelValue !== '' || fixedLabel ? 'focused' : ''" @click="onClickLabel">
      {{ label }}  <span v-if="required" class="text-red">*</span>
    </label>
    <div class="icon">
      <slot name="icon" />
    </div>
  </div>
  <ul v-if="errors.length > 0" class="ml-4 self-start text-[0.8rem] text-red">
    <li v-for="e in errors" :key="e">
      {{ e }}
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.app-input {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;

  label {
    position: absolute;
    top: 50%;
    left: 2.25rem;
    transform: translateY(-50%);
    background-color: var(--color-black);
    transition: all 0.2s ease-in-out;

    &.focused {
      top: 0;
      left: 1rem;
      padding-inline: 0.2rem;
      font-size: 0.8rem;
      color: #7059FF;
    }
  }

  .icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0.75rem;
    background-color: var(--color-black);
    z-index: 2;
  }

  &:nth-child(3) {
    svg {
      cursor: pointer;
    }
  }

  input {
    padding: 0.75rem 1rem;
    padding-left: 2.25rem;
    border-radius: 0.75rem;
    border: 1px solid #777;
    width: 100%;
    background-color: var(--color-black);
    color: var(--clr-text-primary);

    &:focus {
      outline: 2px solid #7059FF;
      border: 1px solid transparent;

      &+label {
        top: 0;
        left: 1rem;
        padding-inline: 0.2rem;
        font-size: 0.8rem;
        color: #7059FF;
      }
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      transition: background-color 5000s ease-in-out 0s;
      -webkit-box-shadow: 0 0 0px 1000px var(--color-black) inset;
      box-shadow: 0 0 0px 1000px var(--color-black) inset;
      outline: 2px solid #7059FF;
      border: 1px solid transparent;
      font-size: 1.2rem;
      -webkit-text-fill-color: var(--color-white) !important;

      &+label {
        top: 0;
        left: 1rem;
        padding-inline: 0.2rem;
        font-size: 0.8rem;
        color: #7059FF;
      }
    }
  }

  &-checkbox {
    margin-bottom: 1rem;
    width: 100%;
    display: flex;
    align-items: center;

    input {
      margin-right: 1rem;
    }
  }
}
</style>
