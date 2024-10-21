import { Invoice } from '@prisma/client'
import { IInvoiceRepository } from '../repositories/interfaces/i-invoice-repository'

interface IFindAllInvoiceCaseResponse {
  invoices: Invoice[]
}

export class FindAllInvoiceUseCase {
  constructor(private readonly invoicesRepository: IInvoiceRepository) {
    // do nothing
  }

  async execute(): Promise<IFindAllInvoiceCaseResponse> {
    const invoices = await this.invoicesRepository.findAll()

    return { invoices }
  }
}
