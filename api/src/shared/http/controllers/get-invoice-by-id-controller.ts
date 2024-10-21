import { PrismaInvoicesRepository } from '@/app/repositories/implements/prisma-invoices-repository'
import { GetInvoiceByIdUseCase } from '@/app/use-cases/get-invoice-by-id-use-case'
import { invoiceIdSchema } from '@/shared/core/schemas/invoice-id-schema'
import { FastifyReply, FastifyRequest } from 'fastify'

export const getInvoiceByIdController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const getInvoiceParams = invoiceIdSchema.parse(request.params)

  const repo = new PrismaInvoicesRepository()
  const useCase = new GetInvoiceByIdUseCase(repo)

  const { invoice } = await useCase.execute({
    id: getInvoiceParams.id,
  })

  return reply.status(201).send({ invoice })
}
