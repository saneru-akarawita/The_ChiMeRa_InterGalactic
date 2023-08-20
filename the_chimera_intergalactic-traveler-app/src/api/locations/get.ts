import type { AxiosError } from 'axios'
import { authenticatedInstance } from '../instances'
import type { Locations } from '../../types'

export async function get() {
  try {
    const response = await authenticatedInstance().get<Locations>('/locations')

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
