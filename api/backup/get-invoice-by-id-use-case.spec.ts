import { beforeEach, describe, expect, it } from 'vitest'

import fakeInvoices from '@/shared/core/fakes/fake-invoices.json'
import { InMemoryInvoicesRepository } from '../repositories/implements/in-memory-invoices-repository'
import { GetInvoiceByIdUseCase } from './get-invoice-by-id-use-case'

let repo: InMemoryInvoicesRepository
let sut: GetInvoiceByIdUseCase

describe('Create Client Use Case Unit', () => {
  beforeEach(() => {
    repo = new InMemoryInvoicesRepository()
    sut = new GetInvoiceByIdUseCase(repo)
  })

  it('should be able get invoice by id', async () => {
    const { id } = await repo.create({
      ...fakeInvoices[0],
      client_id: '123456',
      client_number: 1001,
      due_date: new Date(fakeInvoices[0].due_date),
    })

    const { invoice } = await sut.execute({
      id,
    })

    expect(invoice).toEqual(
      expect.objectContaining({
        file_name: 'invoice_october_2024.pdf',
        client_id: '123456',
        client_number: 1001,
        reference_month: '2024-10',
      }),
    )
  })
})
