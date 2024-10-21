import { PrismaInvoicesRepository } from '@/app/repositories/implements/prisma-invoices-repository'
import { FindAllInvoiceUseCase } from '@/app/use-cases/find-all-invoice-use-case'

export const findAllInvoiceFactory = () => {
  const repo = new PrismaInvoicesRepository()
  const useCase = new FindAllInvoiceUseCase(repo)
  return useCase
}
