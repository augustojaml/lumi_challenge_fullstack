import { getUserProfileFactory } from '@/shared/core/factories/get-user-profile-factory'
import { FastifyReply, FastifyRequest } from 'fastify'

export const getUserProfileController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { sub: id } = request.user

  const getUserProfile = getUserProfileFactory()

  const { client } = await getUserProfile.execute({
    id,
  })

  return reply.status(201).send({ client })
}
