import { beforeEach, describe, expect, it } from 'vitest'

import fakeInvoices from '@/shared/core/fakes/fake-invoices.json'
import { InMemoryInvoicesRepository } from '../repositories/implements/in-memory-invoices-repository'
import { FindAllInvoiceUseCase } from './find-all-invoice-use-case'

let repo: InMemoryInvoicesRepository
let sut: FindAllInvoiceUseCase

describe('Find all invoices Use Case Unit', () => {
  beforeEach(() => {
    repo = new InMemoryInvoicesRepository()
    sut = new FindAllInvoiceUseCase(repo)
  })

  it('should be able get invoice by id', async () => {
    await repo.create({
      ...fakeInvoices[0],
      client_id: '123456',
      client_number: '1001001',
      due_date: new Date(fakeInvoices[0].due_date),
    })

    await repo.create({
      ...fakeInvoices[1],
      client_id: '123456',
      client_number: '1001002',
      due_date: new Date(fakeInvoices[0].due_date),
    })

    await repo.create({
      ...fakeInvoices[2],
      client_id: '123456',
      client_number: '1001003',
      due_date: new Date(fakeInvoices[0].due_date),
    })

    const { invoices } = await sut.execute()

    expect(invoices).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          file_name: 'invoice_october_2024.pdf',
          client_id: '123456',
          client_number: '1001001',
          reference_month: '2024-10',
        }),
        expect.objectContaining({
          file_name: 'invoice_november_2024.pdf',
          client_id: '123456',
          client_number: '1001002',
          reference_month: '2024-11',
        }),
        expect.objectContaining({
          file_name: 'invoice_december_2024.pdf',
          client_id: '123456',
          client_number: '1001003',
          reference_month: '2024-12',
        }),
      ]),
    )
  })
})
