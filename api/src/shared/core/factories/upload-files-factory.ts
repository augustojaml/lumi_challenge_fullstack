import { PrismaClientsRepository } from '@/app/repositories/implements/prisma-clients-repository'
import { PrismaInvoicesRepository } from '@/app/repositories/implements/prisma-invoices-repository'
import { UploadPdfInvoicesUseCase } from '@/app/use-cases/upload-pdf-invoice-use-case'

export const uploadFilesFactory = () => {
  const clientRepo = new PrismaClientsRepository()
  const invoiceRepo = new PrismaInvoicesRepository()
  const useCase = new UploadPdfInvoicesUseCase(clientRepo, invoiceRepo)
  return useCase
}
