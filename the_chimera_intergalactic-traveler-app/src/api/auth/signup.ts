import type { AxiosError } from 'axios'
import { instance } from '../instances'
import type { SignupDto, SignupErrorResponseForInvalidData } from '~/types'

export async function signup(dto: SignupDto): Promise<boolean | SignupErrorResponseForInvalidData | undefined> {
  try {
    const formData = new FormData()
    for (const key in dto) {
      const typedKey = key as keyof SignupDto
      let typedValue = dto[typedKey]
      // if typedValue is a boolean, convert it to a string
      if (typeof typedValue === 'boolean')
        typedValue = typedValue.toString()

      // if typedValue is null, throw an error
      if (typedValue === null)
        throw new Error(`Value for ${typedKey} cannot be null`)

      formData.append(key, typedValue)
    }
    const response = await instance.post('/auth/signup', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    if (response.status === 201)
      return true

    return false
  }
  catch (error) {
    const axiosError = error as AxiosError
    if (axiosError.response && axiosError.response.status === 400)
      return axiosError.response?.data as SignupErrorResponseForInvalidData
  }
}
