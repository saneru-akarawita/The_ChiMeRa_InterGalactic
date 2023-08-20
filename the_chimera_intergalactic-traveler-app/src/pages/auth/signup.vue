<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { ref } from 'vue'
import { api } from '~/api'
import AppInput from '~/components/common/AppInput.vue'
import AppButton from '~/components/common/AppButton.vue'

defineOptions({
  name: 'AuthSignupPage',
})

const profilePicturePath = ref<HTMLInputElement>()

const signupFormData = ref({
  name: '',
  email: '',
  password: '',
  confirm_password: '',
  dob: '',
  galaxy: '',
  planet: '',
  profile_picture: null as File | null,
  terms: false,
})

const singupFormValidationErrors = ref({
  name: [] as string[],
  email: [] as string[],
  password: [] as string[],
  confirm_password: [] as string[],
  dob: [] as string[],
  galaxy: [] as string[],
  planet: [] as string[],
  profile_picture: [] as string[],
  terms: [] as string[],
})

const systemError = ref('')

const imageUrl = ref('')

function loadProfilePicture() {
  if (profilePicturePath.value?.files?.length) {
    // if file is not a png or jpg, remove it
    if (!['image/png', 'image/jpeg'].includes(profilePicturePath.value.files[0].type)) {
      profilePicturePath.value.value = ''
      return
    }

    // read as data url
    const reader = new FileReader()
    reader.readAsDataURL(profilePicturePath.value.files[0])
    reader.onload = () => {
      imageUrl.value = reader.result as string
    }

    signupFormData.value.profile_picture = profilePicturePath.value.files[0]
  }
  else {
    imageUrl.value = ''
    signupFormData.value.profile_picture = null
  }
}

const router = useRouter()
const isLoading = ref(false);
async function onSignupFormSubmit() {
  isLoading.value = true;
  for (const key in signupFormData.value) {
    if (!signupFormData.value[key as keyof typeof signupFormData.value]) {
      console.log(key)
      return
    }
  }
  const result = await api.auth.signup(signupFormData.value)
  if (result === true) {
    await router.replace('/auth/login')
  }
  else if (result) {
    const errors = result.errorMessages
    errors.forEach((e) => {
      singupFormValidationErrors.value[e.property] = e.messages
    })
  }
  else {
    systemError.value = 'Something went wrong'
  }
  isLoading.value = false;
}
</script>

<template>
  <main class="auth-signup-page default-container">
    <form
      autocomplete="off" class="w-9/10 flex flex-col items-center justify-center gap-4"
      @submit.prevent="onSignupFormSubmit"
    >
      <img
        src="../../assets/images/logos/logo.svg" alt="Intergalactic Logo" width="38px" height="38px"
        class="h-[60px] w-[60px]"
      >
      <h1 class="heading-1 mb-4">
        Join with us!
      </h1>
      <div
        class="h-[200px] w-[200px] flex items-center justify-center border-1 border-[#777777] rounded-full" :style="{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }" @click="profilePicturePath?.click()"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
          <path
            fill="#7059FF"
            d="M12 18q2.075 0 3.538-1.462Q17 15.075 17 13q0-2.075-1.462-3.538Q14.075 8 12 8Q9.925 8 8.463 9.462Q7 10.925 7 13q0 2.075 1.463 3.538Q9.925 18 12 18Zm0-2q-1.25 0-2.125-.875T9 13q0-1.25.875-2.125T12 10q1.25 0 2.125.875T15 13q0 1.25-.875 2.125T12 16Zm6-6q.425 0 .712-.288Q19 9.425 19 9t-.288-.713Q18.425 8 18 8t-.712.287Q17 8.575 17 9t.288.712Q17.575 10 18 10ZM4 21q-.825 0-1.412-.587Q2 19.825 2 19V7q0-.825.588-1.412Q3.175 5 4 5h3.15L8.7 3.325q.15-.15.337-.238Q9.225 3 9.425 3h5.15q.2 0 .388.087q.187.088.337.238L16.85 5H20q.825 0 1.413.588Q22 6.175 22 7v12q0 .825-.587 1.413Q20.825 21 20 21Zm16-2V7h-4.05l-1.825-2h-4.25L8.05 7H4v12Zm-8-6Z"
          />
        </svg>
        <input
          id="profile_picture" ref="profilePicturePath" type="file" class="hidden" name="profile_picture"
          accept=".png, .jpg" @change="loadProfilePicture"
        >
      </div>
      <AppInput id="name" v-model="signupFormData.name" required label="Name" name="name" label-for="name" type="text" :errors="singupFormValidationErrors.name">
        <template #icon>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 21 20" fill="none">
            <path
              d="M10.9788 8.33334C12.8198 8.33334 14.3122 6.84095 14.3122 5.00001C14.3122 3.15906 12.8198 1.66667 10.9788 1.66667C9.13789 1.66667 7.64551 3.15906 7.64551 5.00001C7.64551 6.84095 9.13789 8.33334 10.9788 8.33334Z"
              stroke="#7059FF" stroke-width="1.25"
            />
            <path
              d="M17.6453 14.5833C17.6453 16.6542 17.6453 18.3333 10.9787 18.3333C4.31201 18.3333 4.31201 16.6542 4.31201 14.5833C4.31201 12.5125 7.29701 10.8333 10.9787 10.8333C14.6603 10.8333 17.6453 12.5125 17.6453 14.5833Z"
              stroke="#7059FF" stroke-width="1.25"
            />
          </svg>
        </template>
      </AppInput>
      <AppInput
        id="email" v-model="signupFormData.email" required label="Email" name="email" label-for="email"
        type="email"
        :errors="singupFormValidationErrors.email"
      >
        <template #icon>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
            <path
              fill="#7059FF"
              d="M12 22q-2.05 0-3.875-.788t-3.188-2.15q-1.362-1.362-2.15-3.187T2 12q0-2.075.788-3.888t2.15-3.174Q6.3 3.575 8.124 2.788T12 2q2.075 0 3.888.788t3.174 2.15q1.363 1.362 2.15 3.175T22 12v1.45q0 1.475-1.012 2.513T18.5 17q-.9 0-1.675-.4t-1.275-1.05q-.675.675-1.588 1.063T12 17q-2.075 0-3.538-1.463T7 12q0-2.075 1.463-3.538T12 7q2.075 0 3.538 1.463T17 12v1.45q0 .725.45 1.137T18.5 15q.6 0 1.05-.413T20 13.45V12q0-3.275-2.363-5.638T12 4Q8.725 4 6.362 6.363T4 12q0 3.275 2.363 5.638T12 20h5v2h-5Zm0-7q1.25 0 2.125-.875T15 12q0-1.25-.875-2.125T12 9q-1.25 0-2.125.875T9 12q0 1.25.875 2.125T12 15Z"
            />
          </svg>
        </template>
      </AppInput>
      <AppInput
        id="dob" v-model="signupFormData.dob" required label="Date Of Birth" name="dob" label-for="dob"
        type="date" :fixed-label="true"
        :errors="singupFormValidationErrors.dob"
      >
        <template #icon>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 21 20" fill="none">
            <path
              d="M15.1452 11.6667C15.3662 11.6667 15.5782 11.5789 15.7344 11.4226C15.8907 11.2663 15.9785 11.0543 15.9785 10.8333C15.9785 10.6123 15.8907 10.4004 15.7344 10.2441C15.5782 10.0878 15.3662 10 15.1452 10C14.9242 10 14.7122 10.0878 14.5559 10.2441C14.3996 10.4004 14.3118 10.6123 14.3118 10.8333C14.3118 11.0543 14.3996 11.2663 14.5559 11.4226C14.7122 11.5789 14.9242 11.6667 15.1452 11.6667ZM15.1452 15C15.3662 15 15.5782 14.9122 15.7344 14.7559C15.8907 14.5996 15.9785 14.3877 15.9785 14.1667C15.9785 13.9457 15.8907 13.7337 15.7344 13.5774C15.5782 13.4211 15.3662 13.3333 15.1452 13.3333C14.9242 13.3333 14.7122 13.4211 14.5559 13.5774C14.3996 13.7337 14.3118 13.9457 14.3118 14.1667C14.3118 14.3877 14.3996 14.5996 14.5559 14.7559C14.7122 14.9122 14.9242 15 15.1452 15ZM11.8118 10.8333C11.8118 11.0543 11.7241 11.2663 11.5678 11.4226C11.4115 11.5789 11.1995 11.6667 10.9785 11.6667C10.7575 11.6667 10.5455 11.5789 10.3893 11.4226C10.233 11.2663 10.1452 11.0543 10.1452 10.8333C10.1452 10.6123 10.233 10.4004 10.3893 10.2441C10.5455 10.0878 10.7575 10 10.9785 10C11.1995 10 11.4115 10.0878 11.5678 10.2441C11.7241 10.4004 11.8118 10.6123 11.8118 10.8333ZM11.8118 14.1667C11.8118 14.3877 11.7241 14.5996 11.5678 14.7559C11.4115 14.9122 11.1995 15 10.9785 15C10.7575 15 10.5455 14.9122 10.3893 14.7559C10.233 14.5996 10.1452 14.3877 10.1452 14.1667C10.1452 13.9457 10.233 13.7337 10.3893 13.5774C10.5455 13.4211 10.7575 13.3333 10.9785 13.3333C11.1995 13.3333 11.4115 13.4211 11.5678 13.5774C11.7241 13.7337 11.8118 13.9457 11.8118 14.1667ZM6.81185 11.6667C7.03286 11.6667 7.24482 11.5789 7.4011 11.4226C7.55738 11.2663 7.64518 11.0543 7.64518 10.8333C7.64518 10.6123 7.55738 10.4004 7.4011 10.2441C7.24482 10.0878 7.03286 10 6.81185 10C6.59084 10 6.37887 10.0878 6.22259 10.2441C6.06631 10.4004 5.97852 10.6123 5.97852 10.8333C5.97852 11.0543 6.06631 11.2663 6.22259 11.4226C6.37887 11.5789 6.59084 11.6667 6.81185 11.6667ZM6.81185 15C7.03286 15 7.24482 14.9122 7.4011 14.7559C7.55738 14.5996 7.64518 14.3877 7.64518 14.1667C7.64518 13.9457 7.55738 13.7337 7.4011 13.5774C7.24482 13.4211 7.03286 13.3333 6.81185 13.3333C6.59084 13.3333 6.37887 13.4211 6.22259 13.5774C6.06631 13.7337 5.97852 13.9457 5.97852 14.1667C5.97852 14.3877 6.06631 14.5996 6.22259 14.7559C6.37887 14.9122 6.59084 15 6.81185 15Z"
              fill="#7059FF"
            />
            <path
              fill-rule="evenodd" clip-rule="evenodd"
              d="M6.81169 1.45834C6.97745 1.45834 7.13642 1.52418 7.25363 1.64139C7.37084 1.7586 7.43669 1.91758 7.43669 2.08334V2.71917C7.98835 2.70834 8.59585 2.70834 9.26419 2.70834H12.6917C13.3609 2.70834 13.9684 2.70834 14.52 2.71917V2.08334C14.52 1.91758 14.5859 1.7586 14.7031 1.64139C14.8203 1.52418 14.9793 1.45834 15.145 1.45834C15.3108 1.45834 15.4698 1.52418 15.587 1.64139C15.7042 1.7586 15.77 1.91758 15.77 2.08334V2.7725C15.9867 2.78917 16.1917 2.81 16.3859 2.83584C17.3625 2.9675 18.1534 3.24417 18.7775 3.8675C19.4009 4.49167 19.6775 5.2825 19.8092 6.25917C19.9367 7.20917 19.9367 8.42167 19.9367 9.95334V11.7133C19.9367 13.245 19.9367 14.4583 19.8092 15.4075C19.6775 16.3842 19.4009 17.175 18.7775 17.7992C18.1534 18.4225 17.3625 18.6992 16.3859 18.8308C15.4359 18.9583 14.2234 18.9583 12.6917 18.9583H9.26502C7.73335 18.9583 6.52002 18.9583 5.57085 18.8308C4.59419 18.6992 3.80335 18.4225 3.17919 17.7992C2.55585 17.175 2.27919 16.3842 2.14752 15.4075C2.02002 14.4575 2.02002 13.245 2.02002 11.7133V9.95334C2.02002 8.42167 2.02002 7.20834 2.14752 6.25917C2.27919 5.2825 2.55585 4.49167 3.17919 3.8675C3.80335 3.24417 4.59419 2.9675 5.57085 2.83584C5.76502 2.81 5.97085 2.78917 6.18669 2.7725V2.08334C6.18669 1.91758 6.25253 1.7586 6.36974 1.64139C6.48695 1.52418 6.64593 1.45834 6.81169 1.45834ZM5.73669 4.075C4.89919 4.1875 4.41585 4.39917 4.06335 4.75167C3.71085 5.10417 3.49919 5.5875 3.38669 6.42584C3.36752 6.5675 3.35169 6.7175 3.33835 6.875H18.6184C18.605 6.71667 18.5892 6.5675 18.57 6.425C18.4575 5.5875 18.2459 5.10417 17.8934 4.75167C17.5409 4.39917 17.0575 4.1875 16.2192 4.075C15.3634 3.96 14.2342 3.95834 12.645 3.95834H9.31169C7.72252 3.95834 6.59419 3.96 5.73669 4.075ZM3.27002 10C3.27002 9.28834 3.27002 8.66917 3.28085 8.125H18.6759C18.6867 8.66917 18.6867 9.28834 18.6867 10V11.6667C18.6867 13.2558 18.685 14.385 18.57 15.2417C18.4575 16.0792 18.2459 16.5625 17.8934 16.915C17.5409 17.2675 17.0575 17.4792 16.2192 17.5917C15.3634 17.7067 14.2342 17.7083 12.645 17.7083H9.31169C7.72252 17.7083 6.59419 17.7067 5.73669 17.5917C4.89919 17.4792 4.41585 17.2675 4.06335 16.915C3.71085 16.5625 3.49919 16.0792 3.38669 15.2408C3.27169 14.385 3.27002 13.2558 3.27002 11.6667V10Z"
              fill="#7059FF"
            />
          </svg>
        </template>
      </AppInput>
      <AppInput
        id="galaxy" v-model="signupFormData.galaxy" required label="Galaxy" name="galaxy" label-for="galaxy"
        type="text"
        :errors="singupFormValidationErrors.galaxy"
      >
        <template #icon>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 512 512">
            <path
              fill="#7059ff"
              d="M342.5 17.9c-3.1 11.63-2.2 21.56-23.8 25.11c20.3-2.7 22.3 9.58 24.8 21.49c-2.8 1.94-5.5 4.11-8.1 6.49c-21.9 20.84-33 41.11-49 61.61c-6.3 1.2 5.3-53.52 31.1-79.87C225.1 40.92 207.6 268.4 236.4 275c-51.7 18.4-72.6-98.3-59.4-157.3c-37.1 3.9-62 39.8-67.9 60c2.8 27.1 6.1 55.1 38.7 80.9c-32.1 3.6-42-27.8-55.31-54C13.9 309.5 198.4 311.4 228.5 299.1c-93 70.5-149.62 52.3-196.77 39c-40.48 85.1 61.46 56 107.57 35.7c-18.4 30.7-72.25 37.6-88.92 41c61.62 51.3 174.42-67 200.02-106.5c2.5 65.7-74.3 134.4-122.8 171.7c43.6 2.2 83.2-17.9 102.4-55.5c0 10.1-4.1 22.6-9.6 35.8c15-2.1 39.6-6.2 48.8-24.2c25-54.1 37.8-93.1 15.3-138.2c29.9 33.5 63.6 65.3 58.4 114.5c26.9-15.6 48.8-33.6 24.7-60.1c14.1 1.4 23.6 7.7 32.8 13.7c13.9-2.8 34.4-19.9 33.7-33c-31.6-29.8-83.4-43.7-133.8-55.9c72.1-19.8 136.9-10.1 175.6 5.6c5-11.7 9.4-29.6 5.9-41.9c-16.4-9.7-62.7-7.8-83.3-5.6c17.7-15.7 56.8-21.1 81.3-21.2c-2-67.7-162.6 27.8-182.2 42.8c32.7-59.1 123.2-112.7 178.7-121.1c-13.2-31.1-37.2-34-64.3-22.4c2.4-9.5 6.7-17.49 23.4-15.29c-21.6-3.51-20.7-13.44-23.8-25.07c-2.4 13.55-4.1 17.11-19.4 26.67c14.3-2.17 16.4 6.69 17.4 14.69c-53.5 24.4-117.8 102.8-135.1 132.5c-22.1-24 51-121.5 107.7-187.46c-3.1-9.48-21.8-6.31-38.2 4.81c1.1-8.63.7-22.16 17.9-19.54c-15.3-9.6-17-13.16-19.4-26.71zm-166.3.3c5.4 10.73 12.7 17.53-1 34.56c13.8-16.07 23.7-7.13 33.9.22c-4.6-7.19-16.3-17.67-.7-27.86c-17.8 3.09-21.4 1.57-32.2-6.92zM47.71 26.61c-3.08 11.63-2.13 21.56-23.76 25.05c21.02-2.74 22.39 10.55 25.06 22.81c1.43-8.43-.28-23.97 18.14-21.16c-15.27-9.59-16.98-13.15-19.44-26.7zm419.39 5.5c1.6 10.83 1.3 13.93-7.8 25.07c13.1-6.8 15.9 5.39 19.1 11.38c-1.2-9.97-3.4-20.36 13.1-23.64c-17.2 2.87-19.1-4.85-24.4-12.81zM125.3 84.28c-.6 18.02-12 17.32-22.7 17.92c7 2.4 20.3 3 15.3 18.2c10.2-11.6 13.3-12.5 25.2-12.6c-9.4-4.3-17.8-4.9-17.8-23.52zM71.21 153.9c-8.61 8.5-12.85 17.5-33.24 9.6c19.47 8.3 13.98 20.4 10.08 32.4c5.46-6.6 11.9-20.9 26.35-9.1c-8.38-16-8.02-19.9-3.19-32.9zM453.9 282.7c-2.4 8.9-1.7 16.5-18.2 19.2c16-2.1 17.1 8.1 19.2 17.5c1.1-6.5-.2-18.4 13.8-16.3c-11.7-7.3-13-10-14.8-20.4zM69.25 293.8c-12.82 12.7-16.72 13.5-30.41 12.7c10.55 5.7 20.39 7.1 18.72 29c2.3-21.1 15.46-19.4 28.05-19.1c-7.83-3.3-23.4-5.3-16.36-22.6zm394.55 50.7c3.1 11.6 8.9 19.7-8 33.6c16.8-12.9 24.6-2.2 33.2 7.1c-3.1-8-12.4-20.6 4.9-27.4c-18-.5-21.3-2.8-30.1-13.3zm-139.2 72.1c-2.7 12.3-4.1 25.5-25.1 22.8c21.6 3.5 20.7 13.4 23.8 25c2.4-13.5 4.1-17.1 19.4-26.6c-18.4 2.8-16.7-12.8-18.1-21.2zM83.9 438.2c-2.83 16-4.84 20.2-22.86 31.5c21.68-3.3 19.67 15.1 21.33 25c3.19-14.5 4.84-30.1 29.63-26.9c-25.5-4.2-24.43-15.9-28.1-29.6zm366.2 11.4c-7.3 9.6-10.2 19.1-31.5 14.2c20.4 5.4 16.8 18.1 14.6 30.6c4.5-7.3 8.8-22.4 24.8-12.8c-10.6-14.6-10.8-18.6-7.9-32z"
            />
          </svg>
        </template>
      </AppInput>
      <AppInput
        id="planet" v-model="signupFormData.planet" required label="Planet" name="planet" label-for="planet"
        type="text"
        :errors="singupFormValidationErrors.planet"
      >
        <template #icon>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 21 20" fill="none">
            <path
              d="M3.47852 6.67333C3.47852 6.67333 5.92602 9.16667 9.67602 9.16667M18.4785 6.67333C18.4785 6.67333 16.881 6.55833 14.7285 7.29667C14.0643 7.52417 13.6427 7.87583 12.6452 8.33333M3.47852 11.6733C3.47852 11.6733 4.11852 11.6317 5.14518 11.7625M7.56435 12.2958C8.81268 12.69 10.2885 14.1667 13.0702 14.1667C15.5802 14.1667 17.5543 13.2258 18.7043 12.5"
              stroke="#7059FF" stroke-width="1.25" stroke-linecap="round"
            />
            <path
              d="M6.81169 2.78167C8.07795 2.04908 9.51544 1.66441 10.9784 1.66667C15.5809 1.66667 19.3117 5.3975 19.3117 10C19.3117 14.6025 15.5809 18.3333 10.9784 18.3333C6.37585 18.3333 2.64502 14.6025 2.64502 10C2.64502 8.4825 3.05085 7.05833 3.76002 5.83333"
              stroke="#7059FF" stroke-width="1.25" stroke-linecap="round"
            />
          </svg>
        </template>
      </AppInput>
      <AppInput
        id="password" v-model="signupFormData.password" required label="Password" name="password"
        label-for="password" type="password"
        :errors="singupFormValidationErrors.password"
      >
        <template #icon>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
            <path
              fill="#7059FF"
              d="M12 13a1.49 1.49 0 0 0-1 2.61V17a1 1 0 0 0 2 0v-1.39A1.49 1.49 0 0 0 12 13Zm5-4V7A5 5 0 0 0 7 7v2a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3ZM9 7a3 3 0 0 1 6 0v2H9Zm9 12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1Z"
            />
          </svg>
        </template>
      </AppInput>
      <AppInput
        id="confirm_password" v-model="signupFormData.confirm_password" required label="Confirm password"
        type="password" name="confirm_password" label-for="confirm_password"
        :errors="singupFormValidationErrors.confirm_password"
      >
        <template #icon>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
            <path
              fill="#7059FF"
              d="M12 13a1.49 1.49 0 0 0-1 2.61V17a1 1 0 0 0 2 0v-1.39A1.49 1.49 0 0 0 12 13Zm5-4V7A5 5 0 0 0 7 7v2a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3ZM9 7a3 3 0 0 1 6 0v2H9Zm9 12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1Z"
            />
          </svg>
        </template>
      </AppInput>

      <div class="flex items-center gap-4">
        <input id="terms" v-model="signupFormData.terms" type="checkbox" name="terms" class="h-4 w-4" required>
        <label for="terms">I agree to the <RouterLink to="/terms" class="text-[var(--color-blue-purple)]">terms and
          conditions</RouterLink></label>
      </div>
      <p v-if="systemError !== ''">
        Something went wrong
      </p>
      <AppButton class="mt-6 w-full" type="submit">
        {{isLoading ? "Submitting" : "Let's begin the journey !" }}
      </AppButton>
      <RouterLink to="/auth/login">
        Already have an account ? <span class="text-[var(--color-blue-purple)]">Sign in</span>
      </RouterLink>
    </form>
  </main>
</template>

<style lang="scss">
.auth-signup-page {
  height: 100vh;
  width: 100vw;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-block: 3rem;
}
</style>
