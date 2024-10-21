import axios from 'axios'

const baseURL = import.meta.env.VITE_BASE_URL

export const frontApi = axios.create({
  baseURL: baseURL ? `${baseURL}/api` : 'http://localhost:3333/api',
})
