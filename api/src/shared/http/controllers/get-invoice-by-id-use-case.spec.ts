import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryInvoicesRepository } from '@/app/repositories/implements/in-memory-invoices-repository'
import { GetInvoiceByIdUseCase } from '@/app/use-cases/get-invoice-by-id-use-case'
import fakeInvoices from '@/shared/core/fakes/fake-invoices.json'

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
      client_number: '10011001',
      due_date: new Date(fakeInvoices[0].due_date),
    })

    const { invoice } = await sut.execute({
      id,
    })

    expect(invoice).toEqual(
      expect.objectContaining({
        file_name: 'invoice_october_2024.pdf',
        client_id: '123456',
        client_number: '10011001',
        reference_month: '2024-10',
      }),
    )
  })
})
