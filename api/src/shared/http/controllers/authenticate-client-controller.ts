import { authenticateClientFactory } from '@/shared/core/factories/authenticate-client-factory'
import { sessionsSchema } from '@/shared/core/schemas/sessions-schema'
import { FastifyReply, FastifyRequest } from 'fastify'

export const authenticateClientController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const sessionsRequest = sessionsSchema.parse(request.body)

  const authenticateClient = authenticateClientFactory()

  const { client } = await authenticateClient.execute(sessionsRequest)

  const token = await reply.jwtSign(
    {
      role: client.role,
    },
    {
      sign: {
        sub: client.id,
      },
    },
  )

  return reply.status(201).send({ client, token })
}
