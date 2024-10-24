import { Invoice } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import {
  ICreateInvoiceData,
  IFindInvoiceByReferenceMonth,
  IInvoiceRepository,
} from '../interfaces/i-invoice-repository'

export class InMemoryInvoicesRepository implements IInvoiceRepository {
  private invoices: Invoice[] = []

  async create(data: ICreateInvoiceData): Promise<Invoice> {
    // Cria um novo invoice
    const newInvoice: Invoice = {
      id: uuidv4(),
      file_name: data.file_name,
      client_id: data.client_id,
      client_number: data.client_number,
      reference_month: data.reference_month,
      due_date: new Date(data.due_date),
      installation_number: data.installation_number,
      amount_due: data.amount_due,
    }

    // Adiciona o invoice no array de invoices
    this.invoices.push(newInvoice)

    return newInvoice
  }

  async findById(id: string): Promise<Invoice | null> {
    const invoice = this.invoices.find((invoice) => invoice.id === id)
    return invoice || null
  }

  async findAll(): Promise<Invoice[]> {
    return this.invoices
  }

  async findInvoiceByReferenceMonth({
    reference_month,
    client_number,
  }: IFindInvoiceByReferenceMonth): Promise<Invoice | null> {
    const invoice = this.invoices.find((invoice) => {
      return (
        invoice.reference_month === reference_month &&
        invoice.client_number === client_number
      )
    })

    return invoice || null
  }
}
