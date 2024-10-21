import { prisma } from '@/shared/core/libs/prisma'
import { Invoice } from '@prisma/client'
import {
  ICreateInvoiceData,
  IInvoiceRepository,
} from '../interfaces/i-invoice-repository'

export class PrismaInvoicesRepository implements IInvoiceRepository {
  async create(data: ICreateInvoiceData) {
    const invoice = await prisma.invoice.create({
      data: {
        file_name: data.file_name,
        client: {
          connect: {
            id: data.client_id,
          },
        },
        client_number: data.client_number,
        reference_month: data.reference_month,
        due_date: new Date(data.due_date),
        installation_number: data.installation_number,
        amount_due: data.amount_due,
        billed_items: {
          create: data.billed_items,
        },
        consumption_history: {
          create: data.consumption_history,
        },
      },
    })
    return invoice
  }

  async findById(id: string): Promise<Invoice | null> {
    const invoice = await prisma.invoice.findUnique({
      where: { id },
      include: {
        billed_items: true,
        consumption_history: true,
      },
    })

    return invoice || null
  }

  async findAll(): Promise<Invoice[]> {
    const invoices = await prisma.invoice.findMany({
      include: {
        billed_items: true,
        consumption_history: true,
      },
    })
    return invoices
  }
}
