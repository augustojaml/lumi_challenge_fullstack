import { useAuthStore } from '@global/useStores/useAuth'
import { IClient } from '@pages/clients/props'
import { useQuery } from '@tanstack/react-query'

import { frontApi } from '..'

interface IClientsResponse {
  clients: IClient[]
}

export const useGetClients = () => {
  const { sessions } = useAuthStore()

  return useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const response = await frontApi.get<IClientsResponse>('/clients', {
        headers: {
          Authorization: `Bearer ${sessions}`,
        },
      })

      return response.data.clients
    },
  })
}
