import { PrismaClientsRepository } from '@/app/repositories/implements/prisma-clients-repository'
import { CreateClientUseCase } from '@/app/use-cases/create-client-use-case'

export const createClientFactory = () => {
  const repo = new PrismaClientsRepository()
  const useCase = new CreateClientUseCase(repo)
  return useCase
}
