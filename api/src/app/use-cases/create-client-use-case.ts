import { ClientAlreadyExistsError } from '@/shared/core/errors/client-already-exists-error'
import { passwordHelper } from '@/shared/core/helpers/password-helper'
import { Client, Prisma } from '@prisma/client'
import { IClientRepository } from '../repositories/interfaces/i-clients-repository'

interface IClientUserCaseResponse {
  client: Client
}

export class CreateClientUseCase {
  constructor(private readonly clientsRepository: IClientRepository) {
    // do nothing
  }

  async execute(
    data: Prisma.ClientCreateInput,
  ): Promise<IClientUserCaseResponse> {
    const findClient = await this.clientsRepository.findByEmail(data.email)

    if (findClient) {
      throw new ClientAlreadyExistsError()
    }

    const hashPassword = await passwordHelper.hash(data.hash_password)

    const client = await this.clientsRepository.create({
      ...data,
      hash_password: hashPassword,
    })

    return { client }
  }
}
