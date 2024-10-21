import { PrismaClientsRepository } from '@/app/repositories/implements/prisma-clients-repository'
import { GetUserProfileUseCase } from '@/app/use-cases/get-user-profile-use-case'

export const getUserProfileFactory = () => {
  const repo = new PrismaClientsRepository()
  const useCase = new GetUserProfileUseCase(repo)
  return useCase
}
