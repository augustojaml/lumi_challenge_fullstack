import { beforeEach, describe, expect, it } from 'vitest'

import { randomUUID } from 'crypto'
import { InMemoryClientsRepository } from '../repositories/implements/in-memory-clients-repository'
import { InMemoryInvoicesRepository } from '../repositories/implements/in-memory-invoices-repository'
import { CreateInvoicesUseCase } from './create-invoices-use-case'

import { ResourceNotFoundError } from '@/shared/core/errors/resource-not-found-error'
import fakeClients from '@/shared/core/fakes/fake-clients.json'
import fakeInvoices from '@/shared/core/fakes/fake-invoices.json'

let repo: InMemoryInvoicesRepository
let clientRepo: InMemoryClientsRepository
let sut: CreateInvoicesUseCase

describe('Create invoices Use Case Unit', () => {
  beforeEach(() => {
    repo = new InMemoryInvoicesRepository()
    clientRepo = new InMemoryClientsRepository()
    sut = new CreateInvoicesUseCase(clientRepo, repo)
  })

  it('should be able show crate invoice', async () => {
    const client = await clientRepo.create({
      ...fakeClients[0],
      id: randomUUID(),
      role: 'USER',
      invoices: undefined,
    })

    const { invoice } = await sut.execute({
      invoice: {
        ...fakeInvoices[0],
        due_date: new Date(fakeInvoices[0].due_date),
      },
      client_id: client.id,
    })

    expect(invoice).toEqual(
      expect.objectContaining({
        file_name: 'invoice_october_2024.pdf',
        client_id: client.id,
        client_number: '10011001',
        reference_month: '2024-10',
        installation_number: '123456789',
        amount_due: 1500.75,
      }),
    )
  })

  it('should not be able show create invoice with invalid client', async () => {
    expect(async () => {
      await sut.execute({
        invoice: {
          ...fakeInvoices[0],
          due_date: new Date(fakeInvoices[0].due_date),
        },
        client_id: 'invalid-id',
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
