import { findAllInvoiceFactory } from '@/shared/core/factories/find-all-invoice-factory'

import { FastifyReply, FastifyRequest } from 'fastify'

export const FindAllInvoiceController = async (
  _: FastifyRequest,
  reply: FastifyReply,
) => {
  const findAllInvoice = findAllInvoiceFactory()

  const { invoices } = await findAllInvoice.execute()

  return reply.status(201).send({ invoices })
}
