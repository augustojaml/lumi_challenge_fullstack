import { ResourceNotFoundError } from '@/shared/core/errors/resource-not-found-error'
import { Invoice } from '@prisma/client'
import { IInvoiceRepository } from '../repositories/interfaces/i-invoice-repository'

interface IGetInvoiceByIdUseCaseRequest {
  id: string
}
interface IGetInvoiceByIdCaseResponse {
  invoice: Invoice
}

export class GetInvoiceByIdUseCase {
  constructor(private readonly invoicesRepository: IInvoiceRepository) {
    // do nothing
  }

  async execute(
    data: IGetInvoiceByIdUseCaseRequest,
  ): Promise<IGetInvoiceByIdCaseResponse> {
    const invoice = await this.invoicesRepository.findById(data.id)

    if (!invoice) {
      throw new ResourceNotFoundError()
    }

    return { invoice }
  }
}
