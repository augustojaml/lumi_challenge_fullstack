import { ResourceNotFoundError } from '@/shared/core/errors/resource-not-found-error'
import { IClientRepository } from '../repositories/interfaces/i-clients-repository'
import { IInvoiceRepository } from '../repositories/interfaces/i-invoice-repository'

export interface ICreateInvoiceRequest {
  file_name: string
  reference_month: string
  due_date: Date
  installation_number: string
  amount_due: number
  billed_items: {
    item_name: string
    unit: string
    quantity: number
    unit_price: number
    amount: number
    unit_rate: number
  }[]
  consumption_history: {
    month_year: string
    consumption_kwh: number
    average_kwh_per_day: number
    days: number
  }[]
}

interface CreateInvoiceRequest {
  client_id: string
  invoice: ICreateInvoiceRequest
}

export class CreateInvoicesUseCase {
  constructor(
    private readonly clientsRepository: IClientRepository,
    private readonly invoicesRepository: IInvoiceRepository,
  ) {
    // do nothing
  }

  async execute(data: CreateInvoiceRequest) {
    const client = await this.clientsRepository.findById(data.client_id)

    if (!client) {
      throw new ResourceNotFoundError()
    }

    const createdInvoice = {
      ...data.invoice,
      client_id: data.client_id,
      client_number: client.client_number!,
    }

    const invoice = await this.invoicesRepository.create(createdInvoice)

    return { invoice }
  }
}
