import { beforeEach, describe, expect, it } from 'vitest'

import { ResourceNotFoundError } from '@/shared/core/errors/resource-not-found-error'
import fakeClients from '@/shared/core/fakes/fake-clients.json'
import { randomUUID } from 'crypto'
import { InMemoryClientsRepository } from '../repositories/implements/in-memory-clients-repository'
import { GetUserProfileUseCase } from './get-user-profile-use-case'

let repo: InMemoryClientsRepository
let sut: GetUserProfileUseCase

describe('Get user profile Use Case Unit', () => {
  beforeEach(() => {
    repo = new InMemoryClientsRepository()
    sut = new GetUserProfileUseCase(repo)
  })

  it('should be able to get user profile', async () => {
    const fakeClientId = randomUUID()

    await repo.create({
      ...fakeClients[0],
      id: fakeClientId,
      role: 'USER',
      invoices: undefined,
    })

    const { client } = await sut.execute({
      id: fakeClientId,
    })

    expect(client).toEqual(
      expect.objectContaining({
        id: fakeClientId,
        full_name: 'Maria da Silva',
        email: 'maria.silva@example.com',
        role: 'USER',
        street: 'Quadra 203',
        number: '10',
      }),
    )
  })

  it('should not be able to get user profile with invalid id', async () => {
    await expect(() =>
      sut.execute({
        id: 'invalid-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
