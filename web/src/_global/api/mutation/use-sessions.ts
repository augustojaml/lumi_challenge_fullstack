import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { frontApi } from '..'

interface sessionProps {
  email: string
  password: string
}

export const useSessions = () => {
  return useMutation({
    mutationFn: async ({ email, password }: sessionProps) => {
      const response = await frontApi.post('/sessions', {
        email,
        hash_password: password,
      })
      return response.data
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      if (error instanceof AxiosError) {
        console.error('Sessions failed', error?.response?.data.message)
      }
      console.error('Sessions failed', error?.message)
    },
  })
}
