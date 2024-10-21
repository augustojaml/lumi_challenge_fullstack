import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryClientsRepository } from '../repositories/implements/in-memory-clients-repository'
import { InMemoryInvoicesRepository } from '../repositories/implements/in-memory-invoices-repository'
import { CreateInvoicesUseCase } from './create-invoices-use-case'

import fakeClients from '@/shared/core/fakes/fake-clients.json'

import { ResourceNotFoundError } from '@/shared/core/errors/resource-not-found-error'
import fakeInvoices from '@/shared/core/fakes/fake-invoices.json'

let invoiceRepo: InMemoryInvoicesRepository
let clientRepo: InMemoryClientsRepository
let sut: CreateInvoicesUseCase

describe('Create invoice use case unit', () => {
  beforeEach(() => {
    invoiceRepo = new InMemoryInvoicesRepository()
    clientRepo = new InMemoryClientsRepository()
    sut = new CreateInvoicesUseCase(clientRepo, invoiceRepo)
  })

  it('should be able create invoice', async () => {
    const client = await clientRepo.create({
      ...fakeClients[0],
      invoices: undefined,
      role: 'USER',
    })
    const { invoice } = await sut.execute({
      client_id: client.id,
      invoice: {
        ...fakeInvoices[0],
        due_date: new Date(fakeInvoices[0].due_date),
      },
    })

    expect(invoice).toEqual(
      expect.objectContaining({
        file_name: 'invoice_october_2024.pdf',
        client_id: invoice.client_id,
        client_number: 1001,
        reference_month: '2024-10',
        installation_number: '123456789',
        amount_due: 1500.75,
      }),
    )
  })

  it('should not be able create invoice with invalid client id', async () => {
    await expect(() =>
      sut.execute({
        client_id: 'invalid-client-id',
        invoice: {
          ...fakeInvoices[0],
          due_date: new Date(fakeInvoices[0].due_date),
        },
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
