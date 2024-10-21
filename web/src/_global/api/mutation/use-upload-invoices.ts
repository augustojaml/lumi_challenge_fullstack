import { useAuthStore } from '@global/useStores/useAuth'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { frontApi } from '..'

interface UploadInvoiceProps {
  files: File[]
}

export const useUploadInvoices = () => {
  const { sessions } = useAuthStore()

  return useMutation({
    mutationFn: async ({ files }: UploadInvoiceProps) => {
      const formData = new FormData()

      files.forEach((file, index) => {
        formData.append(`file${index + 1}`, file)
      })

      const response = await frontApi.post('/invoices/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${sessions}`,
        },
      })

      return response.data
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        console.error('Upload failed', error?.response?.data?.message)
      } else {
        console.error('Upload failed', error)
      }
    },
  })
}
