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

export interface SignupErrorResponseForInvalidData {
  errorMessages: {
    property: keyof SignupDto
    messages: string[]
  } []
  error: string
  statusCode: number
}
