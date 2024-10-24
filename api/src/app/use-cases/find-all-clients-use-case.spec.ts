import { beforeEach, describe, expect, it } from 'vitest'

import fakeClients from '@/shared/core/fakes/fake-clients.json'
import { randomUUID } from 'crypto'
import { InMemoryClientsRepository } from '../repositories/implements/in-memory-clients-repository'
import { FindAllClientsUseCase } from './find-all-clients-use-case'

let repo: InMemoryClientsRepository
let sut: FindAllClientsUseCase

describe('Find All Clients Use Case Unit', () => {
  beforeEach(() => {
    repo = new InMemoryClientsRepository()
    sut = new FindAllClientsUseCase(repo)
  })

  it('should be able to find all clients', async () => {
    await repo.create({
      ...fakeClients[0],
      id: randomUUID(),
      role: 'USER',
      invoices: undefined,
    })

    await repo.create({
      ...fakeClients[1],
      id: randomUUID(),
      role: 'USER',
      invoices: undefined,
    })

    await repo.create({
      ...fakeClients[2],
      id: randomUUID(),
      role: 'USER',
      invoices: undefined,
    })

    const { clients } = await sut.execute()

    expect(clients).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          full_name: 'Maria da Silva',
          email: 'maria.silva@example.com',
          city: 'Águas Claras',
        }),
        expect.objectContaining({
          full_name: 'João Pereira',
          email: 'joao.pereira@example.com',
          city: 'Taguatinga',
        }),
        expect.objectContaining({
          full_name: 'Ana Souza',
          email: 'ana.souza@example.com',
          city: 'Ceilândia',
        }),
      ]),
    )
  })
})
