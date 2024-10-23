import { beforeEach, describe, expect, it } from 'vitest'

import { randomUUID } from 'crypto'
import { InMemoryClientsRepository } from '../repositories/implements/in-memory-clients-repository'
import { InMemoryInvoicesRepository } from '../repositories/implements/in-memory-invoices-repository'

import fakeClients from '@/shared/core/fakes/fake-clients.json'
import fakeInvoices from '@/shared/core/fakes/fake-uploads-invoices.json'
import { UploadPdfInvoicesUseCase } from './upload-pdf-invoice-use-case'

let repo: InMemoryInvoicesRepository
let clientRepo: InMemoryClientsRepository
let sut: UploadPdfInvoicesUseCase

describe('Upload invoices Use Case Unit', () => {
  beforeEach(() => {
    repo = new InMemoryInvoicesRepository()
    clientRepo = new InMemoryClientsRepository()
    sut = new UploadPdfInvoicesUseCase(clientRepo, repo)
  })

  it('should be able show crate invoice', async () => {
    await clientRepo.create({
      ...fakeClients[0],
      id: randomUUID(),
      role: 'USER',
      invoices: undefined,
    })

    const uploadedInvoices = [
      {
        ...fakeInvoices[0],
        due_date: new Date(fakeInvoices[0].due_date),
      },
      {
        ...fakeInvoices[1],
        due_date: new Date(fakeInvoices[0].due_date),
      },
    ]

    const { createdInvoices, invoicesWithoutClient } = await sut.execute({
      invoices: uploadedInvoices,
    })
    expect(createdInvoices).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          file_name: 'invoice_001.pdf',
          client_number: '10011001',
          reference_month: '2024-09',
          installation_number: 'INST-1001',
          amount_due: 350.75,
        }),
      ]),
    )

    expect(invoicesWithoutClient).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          file_name: 'invoice_002.pdf',
          client_number: 'CL789012',
          reference_month: '2024-09',
          amount_due: 420.9,
        }),
      ]),
    )
  })

  it('should not be able upload invoice without client', async () => {
    const uploadedInvoices = [
      {
        ...fakeInvoices[0],
        due_date: new Date(fakeInvoices[0].due_date),
      },
      {
        ...fakeInvoices[1],
        due_date: new Date(fakeInvoices[0].due_date),
      },
    ]

    const { invoicesWithoutClient } = await sut.execute({
      invoices: uploadedInvoices,
    })

    expect(invoicesWithoutClient).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          file_name: 'invoice_001.pdf',
          client_number: '10011001',
          reference_month: '2024-09',
          installation_number: 'INST-1001',
          amount_due: 350.75,
        }),
        expect.objectContaining({
          file_name: 'invoice_002.pdf',
          client_number: 'CL789012',
          reference_month: '2024-09',
          amount_due: 420.9,
        }),
      ]),
    )
  })
})
