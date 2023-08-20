import axios from 'axios'

export const instance = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

export function authenticatedInstance() {
  const accessToken = localStorage.getItem('accessToken')
  return axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  })
}
