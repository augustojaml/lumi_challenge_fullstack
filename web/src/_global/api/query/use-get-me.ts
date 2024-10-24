import { useAuthStore } from "@global/useStores/useAuth";
import { IClient } from "@pages/clients/props";
import { useQuery } from "@tanstack/react-query";

import { frontApi } from "..";

interface IClientsResponse {
  client: IClient;
}

export const useGetMe = () => {
  const { sessions } = useAuthStore();

  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const response = await frontApi.get<IClientsResponse>("/me", {
        headers: {
          Authorization: `Bearer ${sessions}`,
        },
      });

      return response.data.client;
    },
  });
};
