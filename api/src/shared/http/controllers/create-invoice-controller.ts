import { createInvoiceFactory } from '@/shared/core/factories/create-invoice-factory'
import { createInvoiceSchema } from '@/shared/core/schemas/create-invoce-schema'
import { FastifyReply, FastifyRequest } from 'fastify'

export const createInvoiceController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { sub: id } = request.user

  const invoiceRequest = createInvoiceSchema.parse(request.body)

  const createInvoice = createInvoiceFactory()

  const { invoice } = await createInvoice.execute({
    client_id: id,
    invoice: invoiceRequest,
  })

  return reply.status(201).send({ invoice })
}
