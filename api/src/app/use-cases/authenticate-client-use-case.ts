import { InvalidCredentialsError } from '@/shared/core/errors/invalid-credentials-error'
import { passwordHelper } from '@/shared/core/helpers/password-helper'
import { Client } from '@prisma/client'
import { IClientRepository } from '../repositories/interfaces/i-clients-repository'

interface IAuthenticateClientUseCaseRequest {
  email: string
  hash_password: string
}

interface IAuthenticateClientUseCaseResponse {
  client: Client
}

export class AuthenticateClientUseCase {
  constructor(private readonly clientsRepository: IClientRepository) {
    // do nothing
  }

  async execute(
    data: IAuthenticateClientUseCaseRequest,
  ): Promise<IAuthenticateClientUseCaseResponse> {
    const client = await this.clientsRepository.findByEmail(data.email)

    if (!client) {
      throw new InvalidCredentialsError()
    }

    const comparePassword = await passwordHelper.compare(
      data.hash_password,
      client.hash_password,
    )

    if (!comparePassword) {
      throw new InvalidCredentialsError()
    }

    return { client }
  }
}
