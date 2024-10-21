import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface createTestInvoiceData {
  file_name: string
  client_id: string
  client_number: number
  reference_month: string
  due_date: Date
  installation_number: string
  amount_due: number
  billed_items: Prisma.BilledItemCreateInput[]
  consumption_history: Prisma.ConsumptionHistoryCreateInput[]
}

export const createTestInvoice = async (data: createTestInvoiceData) => {
  return await prisma.invoice.create({
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
}
