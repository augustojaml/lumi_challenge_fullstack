import { createClientFactory } from '@/shared/core/factories/create-client-factory'
import { createClientSchema } from '@/shared/core/schemas/create-client-schema'
import { FastifyReply, FastifyRequest } from 'fastify'

export const createClientController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const clientRequest = createClientSchema.parse(request.body)

  const createClient = createClientFactory()

  const { client } = await createClient.execute({
    ...clientRequest,
    invoices: undefined,
  })

  return reply.status(201).send({ client })
}
