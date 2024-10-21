import { PrismaClientsRepository } from '@/app/repositories/implements/prisma-clients-repository'
import { FindAllClientsUseCase } from '@/app/use-cases/find-all-clients-use-case'

export const findAllClientsFactory = () => {
  const repo = new PrismaClientsRepository()
  const useCase = new FindAllClientsUseCase(repo)
  return useCase
}
