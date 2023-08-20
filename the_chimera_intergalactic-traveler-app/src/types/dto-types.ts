export interface SignupDto {
  name: string
  email: string
  password: string
  confirm_password: string
  dob: string
  galaxy: string
  planet: string
  profile_picture: File | null
  terms: boolean
}

export interface LoginDto {
  email: string
  password: string
  remember_me: boolean
}

export interface ResponseForInvalidData<DtoType> {
  errorMessages: {
    property: keyof DtoType
    messages: string[]
  } []
  error: string
  statusCode: number
}

export type SignupErrorResponseForInvalidData = ResponseForInvalidData<SignupDto>
export type LoginErrorResponseForInvalidData = ResponseForInvalidData<LoginDto>

export interface LoginSuccessfulResponse {
  accessToken: string
}
