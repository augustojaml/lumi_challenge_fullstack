import { Client } from '@prisma/client'
import { IClientRepository } from '../repositories/interfaces/i-clients-repository'

interface IFindAllClientsCaseResponse {
  clients: Client[]
}

export class FindAllClientsUseCase {
  constructor(private readonly clientsRepository: IClientRepository) {
    // do nothing
  }

  async execute(): Promise<IFindAllClientsCaseResponse> {
    const clients = await this.clientsRepository.findAll()

    return { clients }
  }
}
