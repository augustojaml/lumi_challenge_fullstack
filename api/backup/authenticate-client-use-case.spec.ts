import { beforeEach, describe, expect, it } from 'vitest'

import { InvalidCredentialsError } from '@/shared/core/errors/invalid-credentials-error'
import fakeClients from '@/shared/core/fakes/fake-clients.json'
import { passwordHelper } from '@/shared/core/helpers/password-helper'
import { InMemoryClientsRepository } from '../repositories/implements/in-memory-clients-repository'
import { AuthenticateClientUseCase } from './authenticate-client-use-case'

let repo: InMemoryClientsRepository
let sut: AuthenticateClientUseCase

describe('Authenticate Client Use Case Unit', () => {
  beforeEach(() => {
    repo = new InMemoryClientsRepository()
    sut = new AuthenticateClientUseCase(repo)
  })

  it('should be able to authenticate a client', async () => {
    await repo.create({
      ...fakeClients[0],
      hash_password: await passwordHelper.hash(fakeClients[0].hash_password),
      role: 'USER',
      invoices: undefined,
    })

    const { client } = await sut.execute({
      email: 'maria.silva@example.com',
      hash_password: '123456',
    })

    expect(client).toEqual(
      expect.objectContaining({
        full_name: 'Maria da Silva',
        email: 'maria.silva@example.com',
        role: 'USER',
        street: 'Quadra 203',
        number: '10',
      }),
    )
  })

  it('should not be able not to authenticate a client with invalid email', async () => {
    await expect(() =>
      sut.execute({
        email: 'no-existent-email',
        hash_password: 'hashedpassword1',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate a client with invalid password', async () => {
    await repo.create({
      ...fakeClients[0],
      hash_password: await passwordHelper.hash(fakeClients[0].hash_password),
      role: 'USER',
      invoices: undefined,
    })

    await expect(() =>
      sut.execute({
        email: 'maria.silva@example.com',
        hash_password: 'invalid-password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
