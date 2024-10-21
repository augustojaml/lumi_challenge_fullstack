import axios from 'axios'

export const frontApi = axios.create({
  baseURL: 'http://localhost:3333/api',
})
