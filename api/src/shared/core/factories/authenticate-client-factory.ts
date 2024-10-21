import { PrismaClientsRepository } from '@/app/repositories/implements/prisma-clients-repository'
import { AuthenticateClientUseCase } from '@/app/use-cases/authenticate-client-use-case'

export const authenticateClientFactory = () => {
  const repo = new PrismaClientsRepository()
  const useCase = new AuthenticateClientUseCase(repo)
  return useCase
}
