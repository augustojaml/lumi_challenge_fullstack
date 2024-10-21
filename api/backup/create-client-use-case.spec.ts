import { beforeEach, describe, expect, it } from 'vitest'

import { ClientAlreadyExistsError } from '@/shared/core/errors/client-already-exists-error'
import fakeClients from '@/shared/core/fakes/fake-clients.json'
import { InMemoryClientsRepository } from '../repositories/implements/in-memory-clients-repository'
import { CreateClientUseCase } from './create-client-use-case'

let repo: InMemoryClientsRepository
let sut: CreateClientUseCase

describe('Create Client Use Case Unit', () => {
  beforeEach(() => {
    repo = new InMemoryClientsRepository()
    sut = new CreateClientUseCase(repo)
  })

  it('should be able to create a new client', async () => {
    const { client } = await sut.execute({
      ...fakeClients[0],
      invoices: undefined,
      role: 'USER',
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

  it('should note be able to create a new client with same email', async () => {
    await sut.execute({
      ...fakeClients[0],
      invoices: undefined,
      role: 'USER',
    })

    await expect(() =>
      sut.execute({
        ...fakeClients[0],
        invoices: undefined,
        role: 'USER',
      }),
    ).rejects.toBeInstanceOf(ClientAlreadyExistsError)
  })
})
