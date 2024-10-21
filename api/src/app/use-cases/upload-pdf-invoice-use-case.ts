import { IClientRepository } from '../repositories/interfaces/i-clients-repository'
import { IInvoiceRepository } from '../repositories/interfaces/i-invoice-repository'

export interface IUploadPdfInvoiceRequest {
  file_name: string
  client_number: string
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

interface UploadPdfInvoiceRequest {
  invoices: IUploadPdfInvoiceRequest[]
}

export class UploadPdfInvoicesUseCase {
  constructor(
    private readonly clientsRepository: IClientRepository,
    private readonly invoicesRepository: IInvoiceRepository,
  ) {
    // do nothing
  }

  async execute({ invoices }: UploadPdfInvoiceRequest) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const createdInvoices: any[] = []
    const invoicesWithoutClient: IUploadPdfInvoiceRequest[] = []

    for (const invoice of invoices) {
      const client = await this.clientsRepository.findByClient(
        invoice.client_number,
      )

      if (client) {
        const createdInvoice = await this.invoicesRepository.create({
          ...invoice,
          client_number: client.client_number ?? '',
          client_id: client.id,
        })

        createdInvoices.push(createdInvoice)
      } else {
        invoicesWithoutClient.push(invoice)
      }
    }

    // Retorna os arrays preenchidos
    return { createdInvoices, invoicesWithoutClient }
  }
}
