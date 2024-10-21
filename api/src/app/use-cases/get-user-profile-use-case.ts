import { ResourceNotFoundError } from '@/shared/core/errors/resource-not-found-error'
import { Client } from '@prisma/client'
import { IClientRepository } from '../repositories/interfaces/i-clients-repository'

interface IGetUserProfileUseCaseRequest {
  id: string
}
interface IGetUserProfileCaseResponse {
  client: Client
}

export class GetUserProfileUseCase {
  constructor(private readonly clientsRepository: IClientRepository) {
    // do nothing
  }

  async execute(
    data: IGetUserProfileUseCaseRequest,
  ): Promise<IGetUserProfileCaseResponse> {
    const client = await this.clientsRepository.findById(data.id)

    if (!client) {
      throw new ResourceNotFoundError()
    }

    return { client }
  }
}
