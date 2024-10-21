import { findAllClientsFactory } from '@/shared/core/factories/find-all-clients-factory'
import { FastifyReply, FastifyRequest } from 'fastify'

export const findAllClientsController = async (
  _: FastifyRequest,
  reply: FastifyReply,
) => {
  const findAllClients = findAllClientsFactory()

  const { clients } = await findAllClients.execute()

  return reply.status(201).send({ clients })
}
