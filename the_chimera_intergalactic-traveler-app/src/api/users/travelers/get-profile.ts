import type { AxiosError } from 'axios'
import { authenticatedInstance } from '~/api/instances'
import type { TravelerProfile } from '~/types'

export async function getProfile() {
  try {
    const response = await authenticatedInstance().get<TravelerProfile>('/users/travelers/get-profile')

    if (response.status === 200)
      return response.data

    return false
  }
  catch (error) {
    const axiosError = error as AxiosError
    console.log(axiosError.message)
    return false
  }
}
