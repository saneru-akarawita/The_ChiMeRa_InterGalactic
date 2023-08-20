import type { AxiosError } from 'axios'
import { instance } from '../instances'
import type { LoginDto, LoginErrorResponseForInvalidData, LoginSuccessfulResponse } from '~/types'

export async function signin(dto: LoginDto): Promise<boolean | LoginErrorResponseForInvalidData | undefined> {
  try {
    const response = await instance.post<LoginSuccessfulResponse>('/auth/signin', dto)

    if (response.status === 200) {
      const accessToken = response.data.accessToken
      localStorage.setItem('accessToken', accessToken)
      return true
    }
    return false
  }
  catch (error) {
    const axiosError = error as AxiosError
    if (axiosError.response && axiosError.response.status === 400)
      return axiosError.response?.data as LoginErrorResponseForInvalidData
  }
}
