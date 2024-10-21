import { PrismaClientsRepository } from '@/app/repositories/implements/prisma-clients-repository'
import { PrismaInvoicesRepository } from '@/app/repositories/implements/prisma-invoices-repository'
import { CreateInvoicesUseCase } from '@/app/use-cases/create-invoices-use-case'

export const createInvoiceFactory = () => {
  const clientRepo = new PrismaClientsRepository()
  const invoiceRepo = new PrismaInvoicesRepository()
  const useCase = new CreateInvoicesUseCase(clientRepo, invoiceRepo)
  return useCase
}
